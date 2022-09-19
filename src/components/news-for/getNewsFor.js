const getNewsFor = (news) =>{
	const rows = [];
	const arrHouses = [];
	const arrApproaches = [];
	const arrFloors = [];
	const arrHousesSelected = news.houses.map(el => el.ID);
	const arrApproachesSelected = [];
	const arrFloorsSelected = [];
	

	news.houses.map((key) => arrHousesSelected.push(key.ID))
	news.approaches.map((key) => arrApproachesSelected.push(key.ID))
	news.floors.map((key) => arrFloorsSelected.push(key.ID))


	const checkForSelected = () => {
		console.log(rows.flat(2));
		rows.forEach((row) => {
			row.forEach((cell, i) => {
				if (i === 0) {
					cell.forEach((value) => {
						value.isSelected = false
						if (arrHousesSelected.includes(value.id)) {
							value.isSelected = true;
						}
					});
				} else if (i === 1) {
					cell.forEach((value) => {
						if (arrApproachesSelected.includes(value.id)) {
							value.isSelected = true;
						}
					});
				} else if (i === 2) {
					cell.forEach((value) => {
						if (arrFloorsSelected.includes(value.id)) {
							value.isSelected = true;
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
			arrHouses.push(el.approache?.house.ID);
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
			arrHouses.push(el.approache?.house.ID);
			arrApproaches.push(el.approache?.ID);
			arrFloors.push(el.ID);
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
			arrHouses.push(el.house.ID);
			arrApproaches.push(el.ID);
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
			arrHouses.push(el.floor?.approache?.house.ID);
			arrApproaches.push(el.floor?.approache?.ID);
			arrFloors.push(el.floor?.ID);
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
						isSelected: true,
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

			if (!arrHouses.includes(el.floor.approache.house.ID)) {
				rowsPush(el);
				return;
			}

			if (!arrApproaches.includes(el.floor.approache.ID)) {
				rowsPush(el);
				return;
			}
			if (!arrFloors.includes(el.floor.ID)) {
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
				isSelected: true,
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
			if (!arrHouses.includes(el.approache.house.ID)) {
				rowsPush(el);
				return;
			}
			if (!arrApproaches.includes(el.approache.ID)) {
				rowsPush(el);
				return;
			}
			if (arrFloors.includes(el.ID)) {
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
				return
			}
		});
	}

	//Проверка выбранных подъездов
	if (news.approaches.length > 0) {
		const approaches = news.approaches;
		approaches.forEach((el) => {
			if (!arrHouses.includes(el.house.ID)) {
				rowsPush(el);
				return;
			}
			if (arrApproaches.includes(el.ID)) {
				return;
			}

			if(rows[rows.length-1][0][0].id === el.house.ID && rows[rows.length - 1][2]?.length === undefined){
				rows[rows.length - 1][1].push({
				id: el.ID,
				name: el.UF_NAME,
				type: "approache",
				house: el.house.UF_NAME
			});
			arrApproaches.push(el.ID);
			}
			else{
				rowsPush(el)
				return
			}
		});
	}

	//Проверка выбранных домов
	if (news.houses.length > 0) {
		const houses = news.houses;
		houses.forEach((el) => {
			if (!arrHouses.includes(el.ID)) {
				rowsPush(el)
			}
		});
	}

	checkForSelected();

	return rows

}

export default getNewsFor