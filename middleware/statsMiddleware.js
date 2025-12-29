const db = require("../model/db");
const activeSessions = new Set();

module.exports = (req, res, next) => {
    
    if (!req.session.isVisited) {
        req.session.isVisited = true;
        db.query("UPDATE visitor_stats SET total_visitors = total_visitors + 1 WHERE id = 1", (err) => {
            if (err) console.error("Visitor count error:", err);
        });
    }

    if (req.sessionID) {
        activeSessions.add(req.sessionID);

        req.session.lastActivity = Date.now();
    }

    db.query("SELECT total_visitors FROM visitor_stats WHERE id = 1", (err, results) => {
        res.locals.totalVisitors = results && results[0] ? results[0].total_visitors : 0;
        res.locals.onlineUsers = activeSessions.size;
        next();
    });
};

setInterval(() => {
    if (activeSessions.size > 100) activeSessions.clear();
}, 300000);
