const bindRowsLogic = (news) =>{
	const rows = [];
	const arrHouses = [];
	const arrApproaches = [];
	const arrFloors = [];
	const arrHousesSelected = news.houses.map(el => el.ID);
<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
	const arrApproachesSelected = [];
	const arrFloorsSelected = [];
	

	news.houses.map((key) => arrHousesSelected.push(key.ID))
	news.approaches.map((key) => arrApproachesSelected.push(key.ID))
	news.floors.map((key) => arrFloorsSelected.push(key.ID))

========
	const arrApproachesSelected = news.approaches.map(el => el.ID);
	const arrFloorsSelected = news.floors.map(el => el.ID);
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js

	const checkForSelected = () => {
		rows.forEach((row) => {
			row.forEach((cell, i) => {
				if (i === 0) {
<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
					cell.forEach((value) => {
						value.isSelected = false
						if (arrHousesSelected.includes(value.id)) {
							value.isSelected = true;
						}
					});
========
					cell.forEach((value) => value.isSelected = arrHousesSelected.includes(value.id));
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js
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
<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
			arrHouses.push(el.approache?.house.ID);
========
			arrHouses.push(el.approach?.house.ID);
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js
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
<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
			arrHouses.push(el.approache?.house.ID);
			arrApproaches.push(el.approache?.ID);
========
			arrHouses.push(el.approach?.house.ID);
			arrApproaches.push(el.approach?.ID);
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js
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
		} else if (el.__typename === "Approache") {
			arrHouses.push(el.house.ID);
			arrApproaches.push(el.ID);
<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
			approache = el.UF_NAME;
========
			approach = el.UF_NAME;
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js
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
<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
			arrHouses.push(el.floor?.approache?.house.ID);
			arrApproaches.push(el.floor?.approache?.ID);
========
			arrHouses.push(el.floor?.approach?.house.ID);
			arrApproaches.push(el.floor?.approach?.ID);
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js
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

<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
			if (!arrHouses.includes(el.floor.approache.house.ID)) {
========
			if (!arrHouses.includes(el.floor.approach.house.ID)) {
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js
				rowsPush(el);
				return;
			}

<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
			if (!arrApproaches.includes(el.floor.approache.ID)) {
========
			if (!arrApproaches.includes(el.floor.approach.ID)) {
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js
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
<<<<<<<< HEAD:src/components/news/bind-rows/getNewsFor.js
			if (!arrHouses.includes(el.approache.house.ID)) {
				rowsPush(el);
				return;
			}
			if (!arrApproaches.includes(el.approache.ID)) {
========
			if (!arrHouses.includes(el.approach.house.ID)) {
				rowsPush(el);
				return;
			}
			if (!arrApproaches.includes(el.approach.ID)) {
>>>>>>>> 29f3cda86fdf3ca2df4fba215cd35b4237c5bd24:src/components/news/bind-rows/bindRowsLogic.js
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
