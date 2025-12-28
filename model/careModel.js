const db = require("./db");

exports.getByUser = (userId, type, callback) => {
    let sql = "SELECT * FROM care_diary WHERE user_id = ?";
    let params = [userId];

    if (type) {
        sql += " AND care_type = ?";
        params.push(type);
    }

    sql += " ORDER BY created_at DESC";

    db.query(sql, params, callback);
};

exports.insert = (data, callback) => {
    db.query(
        `INSERT INTO care_diary (user_id, pet_name, care_type, note)
         VALUES (?, ?, ?, ?)`,
        [data.user_id, data.pet_name, data.care_type, data.note],
        callback
    );
};

exports.delete = (id, userId, callback) => {
    db.query(
        "DELETE FROM care_diary WHERE id = ? AND user_id = ?",
        [id, userId],
        callback
    );
};

exports.getById = (id, userId, callback) => {
    db.query(
        "SELECT * FROM care_diary WHERE id = ? AND user_id = ?",
        [id, userId],
        (err, results) => callback(err, results[0])
    );
};

exports.update = (id, userId, data, callback) => {
    db.query(
        `UPDATE care_diary 
         SET pet_name = ?, care_type = ?, note = ?
         WHERE id = ? AND user_id = ?`,
        [data.pet_name, data.care_type, data.note, id, userId],
        callback
    );
};

