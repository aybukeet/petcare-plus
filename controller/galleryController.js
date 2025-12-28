const Gallery = require("../model/galleryModel");

exports.list = (req, res) => {
    Gallery.getAll((err, photos) => {
        if (err) {
            console.log(err);
            return res.send("DB HATASI: " + err);
        }

        res.render("pages/gallery", { photos });
    });
};
