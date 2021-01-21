const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const db = new sqlite3.Database("./food.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) return console.error(err);
	console.log("Connected to the database");
});

/**
 * Fresh restart for the restaurant db
 */
try {
	db.serialize(() => {
		/**
		 * Delete all tables
		 */
		db.run(`DROP TABLE IF EXISTS Restaurant`);
		db.run(`DROP TABLE IF EXISTS Menu`);
		db.run(`DROP TABLE IF EXISTS MenuItem`);

		/**
		 * Create tables from scratch
		 */
		db.run(
			`CREATE TABLE IF NOT EXISTS Restaurant(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Imaginelink TEXT)`
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS Menu(Id INTEGER PRIMARY KEY AUTOINCREMENT, RestaurantId INTEGER NOT NULL, Title TEXT, FOREIGN KEY(RestaurantId) REFERENCES Restaurant(Id))`
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS MenuItem(Id INTEGER PRIMARY KEY AUTOINCREMENT, MenuId INTEGER NOT NULL, Name TEXT, Price INTEGER, FOREIGN KEY(MenuId) REFERENCES Menu(Id))`
		);
	});
} catch (error) {
	if (error) return console.error(error);
} finally {
	db.close();
	console.log("Close the database.");
}
