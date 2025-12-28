require("dotenv").config();
const db = require("../model/db");

const createTableSQL = `
CREATE TABLE IF NOT EXISTS visitor_stats (
    id INT PRIMARY KEY,
    total_visitors INT DEFAULT 0
)
`;

const initRowSQL = `
INSERT IGNORE INTO visitor_stats (id, total_visitors) VALUES (1, 0)
`;

db.query(createTableSQL, (err) => {
    if (err) {
        console.error("Tablo oluşturma hatası:", err);
        process.exit(1);
    }
    console.log("visitor_stats tablosu hazır.");

    db.query(initRowSQL, (err) => {
        if (err) {
            console.error("Satır ekleme hatası:", err);
            process.exit(1);
        }
        console.log("Başlangıç verisi hazır.");
        process.exit(0);
    });
});
