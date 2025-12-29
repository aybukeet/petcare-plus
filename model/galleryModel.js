const db = require("./db");

exports.getAll = (callback) => {
    db.query(
        "SELECT * FROM gallery ORDER BY created_at DESC",
        callback
    );
};

exports.create = (data, callback) => {
    const sql = `
        INSERT INTO gallery (title, image)
        VALUES (?, ?)
    `;
    db.query(sql, [data.title, data.image], callback);
};

exports.deleteById = (id, callback) => {
    db.query(
        "DELETE FROM gallery WHERE id = ?",
        [id],
        callback
    );
};
