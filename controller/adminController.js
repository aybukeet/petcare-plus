const User = require("../model/userModel");
const Pets = require("../model/petsModel");
const Lost = require("../model/lostPetsModel");
const Announcement = require("../model/announcementModel");


// Listeleme
exports.listPets = (req, res) => {
    Pets.getAllPets((err, pets) => {
        if (err) return res.send("DB hatası");
        res.render("admin/petsList", { pets, title: "Hayvan Yönetimi" });
    });
};

// Silme
exports.deletePet = (req, res) => {
    const id = req.params.id;

    Pets.deletePet(id, () => {
        res.redirect("/admin/pets");
    });
};


exports.editPetForm = (req, res) => {
    const id = req.params.id;

    Pets.getPetById(id, (err, pet) => {
        if (err || !pet) return res.send("Hayvan bulunamadı");

        res.render("admin/pets/edit", { pet, title: "Düzenle" });
    });
};


exports.updatePet = (req, res) => {
    const id = req.params.id;

    const data = {
        name: req.body.name,
        type: req.body.type,
        age: req.body.age,
        city: req.body.city,
        image: req.body.image,
        description: req.body.description
    };

    Pets.updatePet(id, data, (err) => {
        if (err) {
            req.session.message = { type: "error", text: "Güncelleme sırasında hata oluştu" };
            return res.redirect("/admin/pets");
        }
        req.session.message = { type: "success", text: "Kayıt başarıyla güncellendi" };
        res.redirect("/admin/pets");
    });
};


exports.dashboard = (req, res) => {

    User.count((err, userCount) => {
        Pets.count((err, petCount) => {
            Lost.count((err, lostCount) => {
                Announcement.count((err, announcementCount) => {

                    res.render("admin/dashboard", {
                        userCount,
                        petCount,
                        lostCount,
                        announcementCount,
                        totalVisitors: res.locals.totalVisitors || 0,
                        onlineUsers: res.locals.onlineUsers || 0,
                        title: "Admin Panel"
                    });

                });
            });
        });
    });

};

exports.users = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) return res.send("DB Hatası");

        res.render("admin/users", { users, title: "Kullanıcı Yönetimi" });
    });
};

exports.addPetForm = (req, res) => {
    res.render("admin/pets/add", { title: "Yeni Hayvan Ekle" });
};

exports.saveNewPet = (req, res) => {
    const pet = {
        name: req.body.name,
        type: req.body.type,
        age: req.body.age,
        city: req.body.city,
        image: req.body.image,
        description: req.body.description
    };

    Pets.insertPet(pet, () => {
        res.redirect("/admin/pets");
    });
};
