const db = require("./db");
const slugify = require("slugify");

exports.getAllPets = (callback) => {
    db.query("SELECT * FROM pets WHERE is_active = 1", (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.filterPets = (type, age, city, callback) => {
    let sql = "SELECT * FROM pets WHERE is_active = 1";
    let params = [];

    if (type) {
        sql += " AND type = ?";
        params.push(type);
    }

    if (age) {
        if (age === "+3") {
            sql += " AND age > 3";
        } else {
            sql += " AND age = ?";
            params.push(age);
        }
    }

    if (city) {
        sql += " AND city LIKE ?";
        params.push(`%${city}%`);
    }

    db.query(sql, params, (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getPetById = (id, callback) => {
    db.query("SELECT * FROM pets WHERE id = ?", [id], (err, results) => {
        if (callback) callback(err, results[0]);
    });
};

exports.getPetBySlug = (slug, callback) => {
    db.query("SELECT * FROM pets WHERE slug = ?", [slug], (err, results) => {
        if (callback) callback(err, results[0]);
    });
};

exports.insertPet = (pet, callback) => {

    const sql = `
        INSERT INTO pets (name, slug, type, age, city, image, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const tempSlug = slugify(pet.name, { lower: true, strict: true });

    db.query(sql, [
        pet.name, tempSlug, pet.type, pet.age, pet.city, pet.image, pet.description
    ], (err, results) => {
        if (err) return callback(err);

        const finalSlug = tempSlug + "-" + results.insertId;
        db.query("UPDATE pets SET slug = ? WHERE id = ?", [finalSlug, results.insertId], (err2) => {
            if (callback) callback(err2, results);
        });
    });
};

exports.deletePet = (id, callback) => {
    db.query("DELETE FROM pets WHERE id = ?", [id], (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.updatePet = (id, data, callback) => {
    const sql = `
        UPDATE pets 
        SET name=?, type=?, age=?, city=?, image=?, description=?
        WHERE id=?
    `;

    const params = [
        data.name, data.type, data.age, data.city, data.image, data.description, id
    ];

    db.query(sql, params, (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.count = (callback) => {
    db.query("SELECT COUNT(*) AS total FROM pets", (err, results) => {
        if (callback) callback(err, results ? results[0].total : 0);
    });
};

exports.deactivate = (id, callback) => {
    db.query("UPDATE pets SET is_active = 0 WHERE id = ?", [id], (err, results) => {
        if (callback) callback(err, results);
    });
};
