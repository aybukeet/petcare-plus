const db = require("../model/db");

// Global set for online users (session IDs)
const activeSessions = new Set();

module.exports = (req, res, next) => {
    // 1. Visitor Counter (once per session)
    if (!req.session.isVisited) {
        req.session.isVisited = true;
        db.query("UPDATE visitor_stats SET total_visitors = total_visitors + 1 WHERE id = 1", (err) => {
            if (err) console.error("Visitor count error:", err);
        });
    }

    // 2. Online Users Logic
    // We add the current session ID to the set
    if (req.sessionID) {
        activeSessions.add(req.sessionID);

        // Clean up session if it's inactive (simplified for homework)
        // In a real app, this would be handled by session store events
        // Here we just keep track of unique session IDs seen in recent requests
        req.session.lastActivity = Date.now();
    }

    // Expose stats to all views
    db.query("SELECT total_visitors FROM visitor_stats WHERE id = 1", (err, results) => {
        res.locals.totalVisitors = results && results[0] ? results[0].total_visitors : 0;
        res.locals.onlineUsers = activeSessions.size;
        next();
    });
};

// Cleanup inactive sessions every 5 minutes
setInterval(() => {
    // This is a very basic cleanup for memory-store
    // In a real environment, activeSessions.size would be much larger
    // For this homework, we'll just keep it simple.
    // Ideally, we'd check req.session.lastActivity, but we don't have access to all sessions here.
    // So we'll just clear and rebuild or use a smaller TTL.
    if (activeSessions.size > 100) activeSessions.clear();
}, 300000);
