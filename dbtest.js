const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const db = new sqlite3.Database("./food.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) return console.error(err);
	console.log("Connected to the database");
});

fs.readFile("./restaurants.json", (err, data) => {
	if (err) return console.error(err);
	try {
		db.serialize(() => {
			let result = JSON.parse(data);
			for (let i = 0; i < result.length; i++) {
				const restaurant = result[i];
				db.run(
					`INSERT INTO Restaurant (Name, Imaginelink) VALUES ('${restaurant.name}', '${restaurant.image}')`
				);
				for (let j = 0; j < restaurant.menus.length; j++) {
					const menu = restaurant.menus[j];
					db.run(
						`INSERT INTO Menu (RestaurantId, Title) VALUES ('${i + 1}', '${
							menu.title
						}')`
					);
					for (let k = 0; k < menu.items.length; k++) {
						const menuItem = menu.items[k];
						db.run(
							`INSERT INTO MenuItem (MenuId, Name, Price) VALUES ('${i + 1}','${
								menuItem.name
							}', '${menuItem.price}')`
						);
					}
				}
			}
		});
	} catch (error) {
		console.error(error);
	} finally {
		db.close((err) => {
			if (err) return console.error(err);
			console.log("Succesfully closed the database");
		});
	}
});
