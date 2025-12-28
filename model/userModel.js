const db = require("./db");

exports.findByEmail = (email, callback) => {
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
            if (callback) callback(err, results[0]);
        }
    );
};

exports.create = (user, callback) => {
    db.query(
        "INSERT INTO users (email, password, role, avatar) VALUES (?, ?, ?, ?)",
        [user.email, user.password, user.role, user.avatar || "avatar1.png"],
        callback
    );
};

exports.count = (callback) => {
    db.query("SELECT COUNT(*) AS total FROM users", (err, result) => {
        if (callback) callback(err, result ? result[0].total : 0);
    });
};

exports.getAllUsers = (callback) => {
    db.query(
        "SELECT id, email, role FROM users",
        callback
    );
};
