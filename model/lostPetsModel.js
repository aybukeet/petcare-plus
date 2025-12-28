const db = require("./db");
const slugify = require("slugify");

exports.getAllLostPets = (filters, callback) => {
    let sql = "SELECT * FROM lost_pets WHERE is_active = 1";
    let values = [];

    if (filters.type) {
        sql += " AND type = ?";
        values.push(filters.type);
    }

    if (filters.city) {
        sql += " AND city LIKE ?";
        values.push("%" + filters.city + "%");
    }

    db.query(sql, values, (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getLostById = (id, callback) => {
    db.query("SELECT * FROM lost_pets WHERE id = ?", [id], (err, results) => {
        if (callback) callback(err, results[0]);
    });
};

exports.count = (callback) => {
    db.query("SELECT COUNT(*) AS total FROM lost_pets", (err, results) => {
        if (callback) callback(err, results ? results[0].total : 0);
    });
};

exports.deleteLostPet = (id, callback) => {
    db.query("DELETE FROM lost_pets WHERE id = ?", [id], (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getByUserId = (userId, callback) => {
    db.query(
        "SELECT * FROM lost_pets WHERE user_id = ?",
        [userId],
        callback
    );
};

exports.getLostByUserId = (userId, callback) => {
    db.query(
        "SELECT * FROM lost_pets WHERE user_id = ? ORDER BY id DESC",
        [userId],
        callback
    );
};

exports.insertLostPet = (data, callback) => {
    const tempSlug = slugify(data.name, { lower: true, strict: true });
    const sql = `
      INSERT INTO lost_pets (name, slug, type, city, image, description, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [data.name, tempSlug, data.type, data.city, data.image, data.description, data.user_id],
        (err, results) => {
            if (err) return callback(err);
            const finalSlug = tempSlug + "-" + results.insertId;
            db.query("UPDATE lost_pets SET slug = ? WHERE id = ?", [finalSlug, results.insertId], (err2) => {
                callback(err2, results);
            });
        }
    );
};

exports.getLostBySlug = (slug, callback) => {
    db.query("SELECT * FROM lost_pets WHERE slug = ?", [slug], (err, results) => {
        if (callback) callback(err, results[0]);
    });
};
exports.getLostByIdAndUser = (id, userId, callback) => {
    db.query(
        "SELECT * FROM lost_pets WHERE id = ? AND user_id = ?",
        [id, userId],
        (err, results) => {
            if (callback) callback(err, results[0]);
        }
    );
};

exports.updateLostByUser = (id, userId, data, callback) => {
    const sql = `
      UPDATE lost_pets
      SET name=?, type=?, city=?, image=?, description=?
      WHERE id=? AND user_id=?
    `;
    db.query(
        sql,
        [
            data.name,
            data.type,
            data.city,
            data.image,
            data.description,
            id,
            userId
        ],
        callback
    );
};

exports.deleteLostByUser = (id, userId, callback) => {
    db.query(
        "DELETE FROM lost_pets WHERE id=? AND user_id=?",
        [id, userId],
        callback
    );
};

// PASİFE AL
exports.deactivate = (id, callback) => {
    db.query("UPDATE lost_pets SET is_active = 0 WHERE id = ?", [id], (err, results) => {
        if (callback) callback(err, results);
    });
};
