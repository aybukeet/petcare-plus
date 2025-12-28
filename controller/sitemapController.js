const Pets = require("../model/petsModel");
const LostPets = require("../model/lostPetsModel");
const Announcement = require("../model/announcementModel");

exports.index = (req, res) => {
    Pets.getAllPets((err, pets) => {
        LostPets.getAllLostPets({}, (err2, lostPets) => {
            Announcement.getAll((err3, announcements) => {
                res.render("pages/sitemap", {
                    pets,
                    lostPets,
                    announcements,
                    title: "Site Haritası"
                });
            });
        });
    });
};
