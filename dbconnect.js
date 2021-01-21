const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./restaurant.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) return console.error(err);
	console.log("Connected to the database");
});

try {
	db.serialize(() => {
		let sql = `SELECT Restaurant.Name, Menu.Title FROM Restaurant
        JOIN Menu ON Restaurant.Id = Menu.RestaurantId WHERE Restaurant.Id = ?`;

		db.all(sql, [2], (err, rows) => {
			if (err) return console.error(err);
			// console.log(`Item number ${row.Id} is ${row.Name} at the cost of ${row.Price}`);
			rows.forEach((row) => {
				console.log(`${row.Name} is serving a ${row.Title}.`);
			});
		});

		db.get(sql, [2], (err, row) => {
			if (err) return console.error(err);
			return row
				? console.log(`The restaurant under that ID is ${row.Name}.`)
				: console.log("Nope - doesn't exist.");
		});
	});
} catch (error) {
	console.error(error);
} finally {
	db.close((err) => {
		if (err) return console.error(err);
		console.log("Succesfully closed the database");
	});
}
