const Notifications = require("../model/notificationModel");

exports.list = (req, res) => {
    Notifications.getByUser(req.session.user.id, (err, notifications) => {
        if (err) return res.send("Hata");
        res.render("user/notifications", { notifications, title: "Bildirimlerim" });
    });
};

exports.markRead = (req, res) => {
    Notifications.markRead(req.params.id, () => {
        res.redirect("/user/notifications");
    });
};

exports.markAllRead = (req, res) => {
    Notifications.markAllRead(req.session.user.id, () => {
        res.redirect("/user/notifications");
    });
};
