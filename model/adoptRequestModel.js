const db = require("./db");

exports.createRequest = (data, callback) => {
    const sql = `
        INSERT INTO adoption_requests (pet_id, user_id, name, email, phone, reason, has_other_pets)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        data.pet_id, data.user_id, data.name, data.email, data.phone, data.reason, data.has_other_pets
    ], (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getAllRequests = (callback) => {
    const sql = `
        SELECT r.*, p.name as pet_name, u.email as user_email 
        FROM adoption_requests r
        JOIN pets p ON r.pet_id = p.id
        JOIN users u ON r.user_id = u.id
        ORDER BY r.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getRequestById = (id, callback) => {
    const sql = `
        SELECT r.*, p.name as pet_name, u.email as user_email 
        FROM adoption_requests r
        JOIN pets p ON r.pet_id = p.id
        JOIN users u ON r.user_id = u.id
        WHERE r.id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (callback) callback(err, results[0]);
    });
};

exports.updateStatus = (id, status, callback) => {
    const sql = "UPDATE adoption_requests SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, results) => {
        if (callback) callback(err, results);
    });
};
