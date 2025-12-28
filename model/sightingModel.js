const db = require("./db");

// BİLDİRİM OLUŞTUR
exports.createSighting = (data, callback) => {
    const sql = `
        INSERT INTO lost_sightings (lost_pet_id, user_id, finder_name, finder_contact, location_found, time_found, message)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        data.lost_pet_id, data.user_id, data.finder_name, data.finder_contact, data.location_found, data.time_found, data.message
    ], (err, results) => {
        if (callback) callback(err, results);
    });
};

// YÖNETİCİ İÇİN TÜM BİLDİRİMLER
exports.getAllSightings = (callback) => {
    const sql = `
        SELECT s.*, p.name as pet_name, u.email as user_email
        FROM lost_sightings s
        JOIN lost_pets p ON s.lost_pet_id = p.id
        JOIN users u ON s.user_id = u.id
        ORDER BY s.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getSightingById = (id, callback) => {
    const sql = `
        SELECT s.*, p.name as pet_name, u.email as user_email
        FROM lost_sightings s
        JOIN lost_pets p ON s.lost_pet_id = p.id
        JOIN users u ON s.user_id = u.id
        WHERE s.id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (callback) callback(err, results[0]);
    });
};

// DURUM GÜNCELLE
exports.updateStatus = (id, status, callback) => {
    const sql = "UPDATE lost_sightings SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, results) => {
        if (callback) callback(err, results);
    });
};
