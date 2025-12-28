require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "petcare_plus",
    port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
    if (err) {
        console.error("DB Connection Failed:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL.");

    const sql = `
    CREATE TABLE IF NOT EXISTS lost_sightings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lost_pet_id INT NOT NULL,
        user_id INT NOT NULL,
        finder_name VARCHAR(255) NOT NULL,
        finder_contact VARCHAR(255) NOT NULL,
        location_found TEXT NOT NULL,
        time_found DATETIME NOT NULL,
        message TEXT,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lost_pet_id) REFERENCES lost_pets(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `;

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error creating table:", error);
        } else {
            console.log("Table 'lost_sightings' ready.");
        }
        connection.end();
        process.exit(0);
    });
});
