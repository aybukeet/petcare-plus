const Pets = require("../model/petsModel");

exports.list = (req, res) => {
    const { type, age, city } = req.query;

    // Eğer filtre yoksa → direkt tümünü çek
    if (!type && !age && !city) {
        return Pets.getAllPets((err, pets) => {
            if (err) return res.status(500).send("DB hatası: " + err);
            return res.render("pages/adopt", { pets, title: "Sahiplendirme", selectedType: type });
        });
    }

    // Filtre varsa → filtreli sorgu
    Pets.filterPets(type, age, city, (err, pets) => {
        if (err) return res.status(500).send("DB hatası: " + err);
        return res.render("pages/adopt", { pets, title: "Sahiplendirme", selectedType: type });
    });
};

exports.detail = (req, res) => {
    const slug = req.params.slug;

    Pets.getPetBySlug(slug, (err, pet) => {
        if (err) {
            console.log(err);
            return res.send("DB hatası");
        }

        if (!pet) {
            return res.status(404).send("Hayvan bulunamadı.");
        }

        res.render("pages/petDetail", { pet, title: pet.name });
    });
};
exports.requestForm = (req, res) => {
    const petId = req.params.id;
    Pets.getPetById(petId, (err, pet) => {
        if (err || !pet) return res.redirect("/adopt");
        res.render("pages/adoptRequest", { pet, title: "Sahiplenme Talebi", user: req.session.user });
    });
};

exports.submitRequest = (req, res) => {
    const petId = req.params.id;
    const userId = req.session.user.id; // User middleware'den gelmeli

    const requestData = {
        pet_id: petId,
        user_id: userId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        reason: req.body.reason,
        has_other_pets: req.body.has_other_pets
    };

    const AdoptRequest = require("../model/adoptRequestModel");

    AdoptRequest.createRequest(requestData, (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Bir hata oluştu.");
        }
        res.render("pages/success", {
            title: "Talep Alındı",
            message: "Sahiplenme talebiniz başarıyla alındı. Yönetici onayı bekliyor.",
            redirectUrl: "/adopt"
        });
    });
};
