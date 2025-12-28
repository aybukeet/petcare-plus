const db = require("./db");
const slugify = require("slugify");

exports.getAll = (callback) => {
    db.query("SELECT * FROM announcements ORDER BY created_at DESC", (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getById = (id, callback) => {
    db.query(
        "SELECT * FROM announcements WHERE id = ?",
        [id],
        (err, results) => {
            if (callback) callback(err, results[0]);
        }
    );
};

exports.insert = (data, callback) => {
    const tempSlug = slugify(data.title, { lower: true, strict: true });
    const sql = `
        INSERT INTO announcements (title, slug, description, date)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [data.title, tempSlug, data.description, data.date], (err, results) => {
        if (err) return callback(err);
        const finalSlug = tempSlug + "-" + results.insertId;
        db.query("UPDATE announcements SET slug = ? WHERE id = ?", [finalSlug, results.insertId], (err2) => {
            callback(err2, results);
        });
    });
};

exports.getBySlug = (slug, callback) => {
    db.query("SELECT * FROM announcements WHERE slug = ?", [slug], (err, results) => {
        if (callback) callback(err, results[0]);
    });
};

exports.delete = (id, callback) => {
    db.query("DELETE FROM announcements WHERE id = ?", [id], callback);
};

exports.count = (callback) => {
    db.query("SELECT COUNT(*) AS total FROM announcements", (err, results) => {
        if (callback) callback(err, results ? results[0].total : 0);
    });
};
