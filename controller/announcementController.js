const Announcement = require("../model/announcementModel");

exports.list = (req, res) => {
    Announcement.getAll((err, announcements) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB Hatası");
        }

        res.render("pages/announcements", {
            announcements,
            selected: null,
            title: "Duyurular"
        });
    });
};

exports.detail = (req, res) => {
    const slug = req.params.slug;

    Announcement.getAll((err, announcements) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB Hatası");
        }

        Announcement.getBySlug(slug, (err, selected) => {
            if (err) {
                console.error(err);
                return res.status(500).send("DB Hatası");
            }

            if (!selected) {
                return res.status(404).send("Duyuru bulunamadı");
            }

            res.render("pages/announcements", {
                announcements,
                selected,
                title: selected.title
            });
        });
    });
};

exports.adminList = (req, res) => {
    Announcement.getAll((err, announcements) => {
        if (err) return res.send("DB Hatası");

        res.render("admin/announcements", { announcements, title: "Duyuru Yönetimi" });
    });
};

exports.newForm = (req, res) => {
    res.render("admin/newAnnouncement");
};

exports.create = (req, res) => {
    const { title, description, date } = req.body;

    Announcement.insert({ title, description, date }, (err) => {
        if (err) return res.send("DB Hatası");

        res.redirect("/admin/announcements");
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Announcement.delete(id, (err) => {
        if (err) return res.send("DB Hatası");

        res.redirect("/admin/announcements");
    });
};
