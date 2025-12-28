const Gallery = require("../model/galleryModel");

/* LİSTE */
exports.list = (req, res) => {
    Gallery.getAll((err, images) => {
        if (err) return res.send("DB HATASI");

        res.render("admin/gallery-list", {
            images,
            title: "Galeri Yönetimi"
        });
    });
};

/* FORM */
exports.addForm = (req, res) => {
    res.render("admin/gallery-add", { title: "Fotoğraf Ekle" });
};

/* KAYDET */
exports.create = (req, res) => {
    const data = {
        title: req.body.title,
        image: req.body.image
    };

    Gallery.create(data, () => {
        res.redirect("/admin/gallery");
    });
};

/* SİL */
exports.delete = (req, res) => {
    Gallery.deleteById(req.params.id, () => {
        res.redirect("/admin/gallery");
    });
};
