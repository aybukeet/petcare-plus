require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "petcare_plus",
    port: process.env.DB_PORT || 3306,
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error("DB Connection Failed:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL.");

    const queries = [
        "ALTER TABLE pets ADD COLUMN is_active BOOLEAN DEFAULT 1",
        "ALTER TABLE lost_pets ADD COLUMN is_active BOOLEAN DEFAULT 1",
        `CREATE TABLE IF NOT EXISTS notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            message TEXT NOT NULL,
            type ENUM('info', 'success', 'error') DEFAULT 'info',
            is_read BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`
    ];

    let completed = 0;

    queries.forEach(query => {
        connection.query(query, (error) => {
            if (error) {
                // Ignore "Duplicate column name" error if run multiple times
                if (error.code === 'ER_DUP_FIELDNAME') {
                    console.log("Column already exists, skipping...");
                } else {
                    console.error("Error executing query:", error.message);
                }
            } else {
                console.log("Query executed successfully.");
            }
            completed++;
            if (completed === queries.length) {
                console.log("All migration steps completed.");
                connection.end();
                process.exit(0);
            }
        });
    });
});
