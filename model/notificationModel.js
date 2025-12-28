const db = require("./db");

exports.create = (userId, message, type, callback) => {
    const sql = "INSERT INTO notifications (user_id, message, type) VALUES (?, ?, ?)";
    db.query(sql, [userId, message, type], (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getByUser = (userId, callback) => {
    const sql = "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC";
    db.query(sql, [userId], (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.getUnreadCount = (userId, callback) => {
    const sql = "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0";
    db.query(sql, [userId], (err, results) => {
        if (callback) callback(err, results[0].count);
    });
};

exports.markRead = (id, callback) => {
    const sql = "UPDATE notifications SET is_read = 1 WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (callback) callback(err, results);
    });
};

exports.markAllRead = (userId, callback) => {
    const sql = "UPDATE notifications SET is_read = 1 WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
        if (callback) callback(err, results);
    });
};
