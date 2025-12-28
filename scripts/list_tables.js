const db = require("../model/db");

db.query("SHOW TABLES", (err, results) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Tables:", results);
    }
    process.exit();
});
