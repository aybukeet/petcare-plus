const Care = require("../model/careModel");

exports.list = (req, res) => {
    const userId = req.session.user.id;
    const filter = req.query.type || null;

    Care.getByUser(userId, filter, (err, notes) => {
        if (err) return res.send("DB Hatası");

        res.render("pages/care/list", {
            notes,
            selectedType: filter,
            title: "Bakım Günlüğüm"
        });
    });
};

exports.createForm = (req, res) => {
    res.render("pages/care/create", { title: "Yeni Bakım Kaydı" });
};

exports.create = (req, res) => {
    const data = {
        user_id: req.session.user.id,
        pet_name: req.body.pet_name,
        care_type: req.body.care_type,
        note: req.body.note
    };

    Care.insert(data, err => {
        if (err) return res.send("DB Hatası");
        res.redirect("/care");
    });
};

exports.delete = (req, res) => {
    const noteId = req.params.id;
    const userId = req.session.user.id;

    Care.delete(noteId, userId, err => {
        if (err) return res.send("DB Hatası");
        res.redirect("/care");
    });
};

exports.editForm = (req, res) => {
    const id = req.params.id;
    const userId = req.session.user.id;

    Care.getById(id, userId, (err, note) => {
        if (err || !note) return res.send("Kayıt bulunamadı");
        res.render("pages/care/edit", { note, title: "Kaydı Düzenle" });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const userId = req.session.user.id;

    const data = {
        pet_name: req.body.pet_name,
        care_type: req.body.care_type,
        note: req.body.note
    };

    Care.update(id, userId, data, err => {
        if (err) return res.send("DB Hatası");
        res.redirect("/care");
    });
};
