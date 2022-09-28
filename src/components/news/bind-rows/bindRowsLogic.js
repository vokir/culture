const bindRowsLogic = (news) =>{
	const rows = [];
	const arrHouses = [];
	const arrApproaches = [];
	const arrFloors = [];
	const arrHousesSelected = news.houses.map(el => el.ID);
	const arrApproachesSelected = news.approaches.map(el => el.ID);
	const arrFloorsSelected = news.floors.map(el => el.ID);

	const checkForSelected = () => {
		rows.forEach((row) => {
			row.forEach((cell, i) => {
				if (i === 0) {
					cell.forEach((value) => value.isSelected = arrHousesSelected.includes(value.id));
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
		let approach;
		if (el.__typename === "House") {
			arrHouses.push(el.approach?.house.ID);
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
			arrHouses.push(el.approach?.house.ID);
			arrApproaches.push(el.approach?.ID);
			arrFloors.push(el.ID);
			floor = el.UF_NAME;
			approach = el.approach.UF_NAME;
			rows.push([
				[
					{
						id: el.approach.house.ID,
						name: el.approach.house.UF_NAME,
						type: "house"
					},
				],
				[
					{
						id: el.approach.ID,
						name: approach,
						type: "approach",
						house: el.approach.house.UF_NAME
					},
				],
				[
					{
						id: el.ID,
						name: floor,
						type: "floor",
						approach: el.approach.UF_NAME,
						house: el.approach.house.UF_NAME
					},
				],
			]);
		} else if (el.__typename === "Approach") {
			arrHouses.push(el.house.ID);
			arrApproaches.push(el.ID);
			approach = el.UF_NAME;
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
						name: approach,
						type: "approach",
						house: el.house.UF_NAME
					},
				],
			]);
		} else if (el.__typename === "Premise") {
			arrHouses.push(el.floor?.approach?.house.ID);
			arrApproaches.push(el.floor?.approach?.ID);
			arrFloors.push(el.floor?.ID);
			floor = el.floor?.UF_NAME;
			approach = el.floor?.approach?.UF_NAME;
			let name = el.UF_NUMBER
			if(el.UF_NAME){
				name = el.UF_NAME
			}
			rows.push([
				[
					{
						id: el.floor?.approach?.house?.ID,
						name: el.floor?.approach?.house?.UF_NAME,
						type: "house"
					},
				],
				[
					{
						id: el.floor?.approach?.ID,
						name: approach,
						type: "approach",
						house: el.floor.approach.house.UF_NAME
					},
				],
				[
					{
						id: el.floor?.ID,
						name: floor,
						type: "floor",
						approach: el.floor.approach.UF_NAME,
						house: el.floor.approach.house.UF_NAME
					},
				],
				[
					{
						id: el.ID,
						name: name,
						isSelected: true,
						type: "premise",
						floor: el.floor.UF_NAME,
						approach: el.floor.approach.UF_NAME,
						house: el.floor.approach.house.UF_NAME
					},
				],
			]);
		}
	};

	////Проверка выбранных помещений
	if (news.premises.length > 0) {
		const premises = news.premises;

		premises.forEach((el) => {

			if (!arrHouses.includes(el.floor.approach.house.ID)) {
				rowsPush(el);
				return;
			}

			if (!arrApproaches.includes(el.floor.approach.ID)) {
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
				approach: el.floor.approach.UF_NAME,
				house: el.floor.approach.house.UF_NAME
			});
		});
	}

	////Проверка выбранных этажей
	if (news.floors.length > 0) {
		const floors = news.floors;
		floors.forEach((el,i) => {
			if (!arrHouses.includes(el.approach.house.ID)) {
				rowsPush(el);
				return;
			}
			if (!arrApproaches.includes(el.approach.ID)) {
				rowsPush(el);
				return;
			}
			if (arrFloors.includes(el.ID)) {
				return;
			}
			if(rows[rows.length-1][1][0].id === el.approach.ID && rows[rows.length - 1][3] === undefined){
				rows[rows.length - 1][2].push({
				id: el.ID,
				name: el.UF_NAME,
				type: "floor",
				approach: el.approach.UF_NAME,
				house: el.approach.house.UF_NAME
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
				type: "approach",
				house: el.house.UF_NAME
				});
				arrApproaches.push(el.ID);

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
			if (!arrHouses.includes(el.ID)) {
				rowsPush(el)
			}
		});
	}

	checkForSelected();
	return rows

}

export default bindRowsLogic
