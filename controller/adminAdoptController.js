const Pets = require("../model/petsModel");

exports.list = (req, res) => {
    Pets.getAllPets((err, pets) => {
        if (err) return res.send("DB Hatası");
        res.render("admin/adopt/list", { pets });
    });
};

exports.createForm = (req, res) => {
    res.render("admin/pets/add", { title: "Yeni Hayvan Ekle" });
};

exports.create = (req, res) => {
    const pet = {
        name: req.body.name,
        type: req.body.type,
        age: req.body.age,
        city: req.body.city,
        image: req.body.image,
        description: req.body.description
    };

    Pets.insertPet(pet, () => {
        res.redirect("/admin/adopt");
    });
};

exports.delete = (req, res) => {
    Pets.deletePet(req.params.id, () => {
        res.redirect("/admin/adopt");
    });
};

const AdoptRequest = require("../model/adoptRequestModel");

exports.listRequests = (req, res) => {
    AdoptRequest.getAllRequests((err, requests) => {
        if (err) return res.send("DB Hatası");
        res.render("admin/adoptRequests", { requests });
    });
};

const Notifications = require("../model/notificationModel");

exports.processRequest = (req, res) => {
    const { id, status } = req.body; // status: 'approved' or 'rejected'

    AdoptRequest.getRequestById(id, (err, request) => {
        if (err || !request) return res.send("Talep bulunamadı");

        AdoptRequest.updateStatus(id, status, (err) => {
            if (err) return res.send("DB Hatası");

            if (status === 'approved') {
                // İlanı yayından kaldır
                Pets.deactivate(request.pet_id, () => { });
                // Bildirim gönder
                Notifications.create(request.user_id, `Harika haber! ${request.pet_name} için sahiplenme başvurunuz ONAYLANDI. Detaylar için sizi arayacağız.`, "success");
            } else {
                Notifications.create(request.user_id, `Merhaba, ${request.pet_name} için yaptığınız sahiplenme başvurusu ne yazık ki onaylanmadı.`, "error");
            }

            res.redirect("/admin/adopt/requests");
        });
    });
};
