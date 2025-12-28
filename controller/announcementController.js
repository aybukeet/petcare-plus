const Announcement = require("../model/announcementModel");

// LİSTE (sol taraf)
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

// LİSTE + DETAY (sağ taraf)
exports.detail = (req, res) => {
    const slug = req.params.slug;

    // önce tüm duyurular (sol liste)
    Announcement.getAll((err, announcements) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB Hatası");
        }

        // sonra seçilen duyuru (sağ detay)
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

// ADMIN - LİSTE
exports.adminList = (req, res) => {
    Announcement.getAll((err, announcements) => {
        if (err) return res.send("DB Hatası");

        res.render("admin/announcements", { announcements, title: "Duyuru Yönetimi" });
    });
};

// ADMIN - FORM
exports.newForm = (req, res) => {
    res.render("admin/newAnnouncement");
};

// ADMIN - CREATE
exports.create = (req, res) => {
    const { title, description, date } = req.body;

    Announcement.insert({ title, description, date }, (err) => {
        if (err) return res.send("DB Hatası");

        res.redirect("/admin/announcements");
    });
};

// ADMIN - DELETE
exports.delete = (req, res) => {
    const id = req.params.id;

    Announcement.delete(id, (err) => {
        if (err) return res.send("DB Hatası");

        res.redirect("/admin/announcements");
    });
};
