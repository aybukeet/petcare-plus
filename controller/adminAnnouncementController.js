const Announcement = require("../model/announcementModel");

exports.list = (req, res) => {
    Announcement.getAll((err, announcements) => {
        res.render("admin/announcements/list", { announcements });
    });
};

exports.createForm = (req, res) => {
    res.render("admin/announcements/create");
};

exports.create = (req, res) => {
    Announcement.insert(req.body, () => {
        res.redirect("/admin/announcements");
    });
};

exports.delete = (req, res) => {
    Announcement.delete(req.params.id, () => {
        res.redirect("/admin/announcements");
    });
};
