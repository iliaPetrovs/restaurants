const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./food.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) return console.error(err);
	console.log("Connected to the database");
});

describe("db test", () => {
	test("dfsd", () => {
		try {
			db.serialize(() => {
				db.run(`SELECT * FROM Menu`);
			});
		} catch (error) {
			if (error) return console.error(error);
		} finally {
			db.close();
		}
	});
});
