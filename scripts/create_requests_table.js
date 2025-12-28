require('dotenv').config(); // Load from current directory
const mysql = require("mysql2");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "****" : "(empty)");
console.log("DB_NAME:", process.env.DB_NAME);

// Manual DB connection since we are outside the app flow
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
    CREATE TABLE IF NOT EXISTS adoption_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pet_id INT NOT NULL,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        reason TEXT,
        has_other_pets ENUM('yes', 'no') DEFAULT 'no',
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `;

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error creating table:", error);
        } else {
            console.log("Table 'adoption_requests' ready.");
        }
        connection.end();
        process.exit(0);
    });
});
