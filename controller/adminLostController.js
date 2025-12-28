const LostPets = require("../model/lostPetsModel");

exports.list = (req, res) => {
    LostPets.getAllLostPets({}, (err, lostPets) => {
        if (err) return res.send("DB Hatası");
        res.render("admin/lost/list", { lostPets, title: "Kayıp Hayvan Yönetimi" });
    });
};

exports.createForm = (req, res) => {
    res.render("admin/lost/create", { title: "Yeni Kayıp İlanı" });
};

exports.create = (req, res) => {
    const data = {
        name: req.body.name,
        type: req.body.type,
        city: req.body.city,
        image: req.body.image,
        description: req.body.description,
        user_id: null
    };

    LostPets.insertLostPet(data, () => {
        res.redirect("/admin/lost");
    });
};

exports.delete = (req, res) => {
    LostPets.deleteLostPet(req.params.id, () => {
        res.redirect("/admin/lost");
    });
};

// --- SIGHTINGS ---

const Sighting = require("../model/sightingModel");

exports.listSightings = (req, res) => {
    Sighting.getAllSightings((err, sightings) => {
        if (err) return res.send("DB Hatası");
        res.render("admin/lostSightings", { sightings });
    });
};

const Notifications = require("../model/notificationModel");

exports.processSighting = (req, res) => {
    const { id, status } = req.body;

    Sighting.getSightingById(id, (err, sighting) => {
        if (err || !sighting) return res.send("Bildirim bulunamadı");

        Sighting.updateStatus(id, status, (err) => {
            if (err) return res.send("DB Hatası");

            if (status === 'approved') {
                // Kayıp ilanı kapat (bulundu say)
                LostPets.deactivate(sighting.lost_pet_id, () => { });

                // Bildirimi yapana teşekkür mesajı
                Notifications.create(sighting.user_id, `Teşekkürler! ${sighting.pet_name} hakkındaki bildiriminiz bize ulaştı ve doğrulandı. Sayenizde bir can dostumuz kurtuldu!`, "success");

                // İlan sahibine de bildirim gitmeli (sighting.user_id bulan kişi, ilan sahibi kim? Onu da bulmamız lazım ama şimdilik sadece bulana teşekkür edelim veya karışıklık olmasın)
                // İdealde: LostPets.getById(sighting.lost_pet_id) -> owner_id -> Notify owner.
                // Şimdilik sadece bildirim yapana dönüyoruz.
            } else {
                Notifications.create(sighting.user_id, `${sighting.pet_name} hakkındaki bildiriminiz doğrulanamadığı için reddedildi.`, "error");
            }

            res.redirect("/admin/lost/sightings");
        });
    });
};
