const LostPets = require("../model/lostPetsModel");

exports.dashboard = (req, res) => {
    res.render("user/dashboard", {
        user: req.session.user
    });
};

exports.myLostPets = (req, res) => {
    const userId = req.session.user.id;

    LostPets.getByUserId(userId, (err, lostPets) => {
        if (err) return res.send("DB Hatası");

        res.render("pages/user/myLostPets", { lostPets });
    });
};
