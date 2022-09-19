const bindRowsLogic = (news) =>{
	const rows = [];
	const setHouses = new Set();
	const setApproaches = new Set();
	const setFloors = new Set();
	const setHousesSelected = new Set(
		news.houses.map((key) => key.ID)
	);
	const setApproachesSelected = new Set(
		news.approaches.map((key) => key.ID)
	);
	const setFloorsSelected = new Set(
		news.floors.map((key) => key.ID)
	);

	const checkForSelected = () => {
		rows.forEach((row) => {
			row.forEach((cell, i) => {
				if (i === 0) {
					cell.forEach((value) => {
						if (setHousesSelected.has(value.id)) {
							value.isSelected = "value-selected";
						}
					});
				} else if (i === 1) {
					cell.forEach((value) => {
						if (setApproachesSelected.has(value.id)) {
							value.isSelected = "value-selected";
						}
					});
				} else if (i === 2) {
					cell.forEach((value) => {
						if (setFloorsSelected.has(value.id)) {
							value.isSelected = "value-selected";
						}
					});
				}
			});
		});
	};

	const rowsPush = (el) => {
		let floor;
		let approache;
		if (el.__typename === "House") {
			setHouses.add(el.approache?.house.ID);
			rows.push([
				[
					{
						id: el.ID,
						name: el.UF_NAME,
						type: "house"
					},
				],
			]);
		} else if (el.__typename === "Floor") {
			setHouses.add(el.approache?.house.ID);
			setApproaches.add(el.approache?.ID);
			setFloors.add(el.ID);
			floor = el.UF_NAME;
			approache = el.approache.UF_NAME;
			rows.push([
				[
					{
						id: el.approache.house.ID,
						name: el.approache.house.UF_NAME,
						type: "house"
					},
				],
				[
					{
						id: el.approache.ID,
						name: approache,
						type: "approache",
						house: el.approache.house.UF_NAME
					},
				],
				[
					{
						id: el.ID,
						name: floor,
						type: "floor",
						approache: el.approache.UF_NAME,
						house: el.approache.house.UF_NAME
					},
				],
			]);
		} else if (el.__typename === "Approache") {
			setHouses.add(el.house.ID);
			setApproaches.add(el.ID);
			approache = el.UF_NAME;
			rows.push([
				[
					{
						id: el.house.ID,
						name: el.house?.UF_NAME,
						type: "house",
					},
				],
				[
					{
						id: el.ID,
						name: approache,
						type: "approache",
						house: el.house.UF_NAME
					},
				],
			]);
		} else if (el.__typename === "Premise") {
			setHouses.add(el.floor?.approache?.house.ID);
			setApproaches.add(el.floor?.approache?.ID);
			setFloors.add(el.floor?.ID);
			floor = el.floor?.UF_NAME;
			approache = el.floor?.approache?.UF_NAME;
			let name = el.UF_NUMBER
			if(el.UF_NAME){
				name = el.UF_NAME
			}
			rows.push([
				[
					{
						id: el.floor?.approache?.house?.ID,
						name: el.floor?.approache?.house?.UF_NAME,
						type: "house"
					},
				],
				[
					{
						id: el.floor?.approache?.ID,
						name: approache,
						type: "approache",
						house: el.floor.approache.house.UF_NAME
					},
				],
				[
					{
						id: el.floor?.ID,
						name: floor,
						type: "floor",
						approache: el.floor.approache.UF_NAME,
						house: el.floor.approache.house.UF_NAME
					},
				],
				[
					{
						id: el.ID,
						name: name,
						isSelected: "value-selected",
						type: "premise",
						floor: el.floor.UF_NAME,
						approache: el.floor.approache.UF_NAME,
						house: el.floor.approache.house.UF_NAME
					},
				],
			]);
		}
	};

	////Проверка выбранных помещений
	if (news.premises.length > 0) {
		const premises = news.premises;

		premises.forEach((el) => {

			if (!setHouses.has(el.floor.approache.house.ID)) {
				rowsPush(el);
				return;
			}

			if (!setApproaches.has(el.floor.approache.ID)) {
				rowsPush(el);
				return;
			}
			if (!setFloors.has(el.floor.ID)) {
				rowsPush(el);
				return;
			}
			let name = el.UF_NUMBER
			if(el.UF_NAME){
				name = el.UF_NAME
			}
			rows[rows.length - 1][3].push({
				id: el.ID,
				name: name,
				isSelected: "value-selected",
				type: "premise",
				floor: el.floor.UF_NAME,
				approache: el.floor.approache.UF_NAME,
				house: el.floor.approache.house.UF_NAME
			});
		});
	}

	////Проверка выбранных этажей
	if (news.floors.length > 0) {
		const floors = news.floors;
		floors.forEach((el,i) => {
			if (!setHouses.has(el.approache.house.ID)) {
				rowsPush(el);
				return;
			}
			if (!setApproaches.has(el.approache.ID)) {
				rowsPush(el);
				return;
			}
			if (setFloors.has(el.ID)) {
				return;
			}
			if(rows[rows.length-1][1][0].id === el.approache.ID && rows[rows.length - 1][3] === undefined){
				rows[rows.length - 1][2].push({
				id: el.ID,
				name: el.UF_NAME,
				type: "floor",
				approache: el.approache.UF_NAME,
				house: el.approache.house.UF_NAME
			});
			}
			else{
				rowsPush(el)
			}
		});
	}

	//Проверка выбранных подъездов
	if (news.approaches.length > 0) {
		const approaches = news.approaches;
		approaches.forEach((el) => {
			if (!setHouses.has(el.house.ID)) {
				rowsPush(el);
				return;
			}
			if (setApproaches.has(el.ID)) {
				return;
			}

			if(rows[rows.length-1][0][0].id === el.house.ID && rows[rows.length - 1][2]?.length === undefined){
				rows[rows.length - 1][1].push({
				id: el.ID,
				name: el.UF_NAME,
				type: "approache",
				house: el.house.UF_NAME
			});
			setApproaches.add(el.ID);
			}
			else{
				rowsPush(el)
			}
		});
	}

	//Проверка выбранных домов
	if (news.houses.length > 0) {
		const houses = news.houses;
		houses.forEach((el) => {
			if (!setHouses.has(el.ID)) {
				rowsPush(el)
			}
		});
	}
	checkForSelected();

	// console.log(rows);
	return rows

}

export default bindRowsLogic
