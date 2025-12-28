const LostPets = require("../model/lostPetsModel");

/* =========================================================
   📌 TÜM KAYIP İLANLARI (PUBLIC)
   GET /lost?type=&city=
========================================================= */
exports.list = (req, res) => {
  const filters = {
    type: req.query.type || "",
    city: req.query.city || "",
  };

  LostPets.getAllLostPets(filters, (err, lostPets) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB HATASI");
    }

    res.render("pages/lost", {
      lostPets,
      title: "Kayıp Hayvanlar",
      selectedType: filters.type,
      cityFilter: filters.city
    });
  });
};

/* =========================================================
   📌 DETAY SAYFASI (PUBLIC)
   GET /lost/:id
========================================================= */
exports.detail = (req, res) => {
  const slug = req.params.slug;

  LostPets.getLostBySlug(slug, (err, lost) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB hatası");
    }
    if (!lost) return res.status(404).send("Kayıp hayvan bulunamadı.");

    res.render("pages/lostDetail", { lost, title: lost.name });
  });
};

/* =========================================================
   📌 "BULDUM" BİLDİRİMİ (USER)
   GET /lost/found/:id
   (şimdilik basit)
========================================================= */
exports.foundForm = (req, res) => {
  const id = req.params.id;
  LostPets.getLostById(id, (err, lost) => {
    if (err || !lost) return res.redirect("/lost");
    res.render("pages/lostFound", { lost, title: "Gördüm / Buldum", user: req.session.user });
  });
};

exports.submitFound = (req, res) => {
  const lostId = req.params.id;
  const userId = req.session.user.id;

  const data = {
    lost_pet_id: lostId,
    user_id: userId,
    finder_name: req.body.finder_name,
    finder_contact: req.body.finder_contact,
    location_found: req.body.location_found,
    time_found: req.body.time_found,
    message: req.body.message
  };

  const Sighting = require("../model/sightingModel");

  Sighting.createSighting(data, (err) => {
    if (err) {
      console.log(err);
      return res.send("Hata oluştu.");
    }
    res.render("pages/success", {
      title: "Bildirim Alındı",
      message: "Verdiğiniz bilgiler kaydedildi ve yöneticilere iletildi. Teşekkür ederiz.",
      redirectUrl: "/lost"
    });
  });
};

/* =========================================================
   📌 BENİM KAYIP İLANLARIM (USER)
   GET /lost/my
========================================================= */
exports.myLost = (req, res) => {
  if (!req.session?.user) return res.redirect("/auth/login");

  const userId = req.session.user.id;

  LostPets.getLostByUserId(userId, (err, lostPets) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB HATASI");
    }

    // ✅ Tek isim: lostPets
    // ✅ Tek view: user/myLostPets
    res.render("user/myLostPets", { lostPets, title: "Benim İlanlarım" });

    // Eğer sen bunu views/pages/lostMy.ejs kullanacaksan:
    // res.render("pages/lostMy", { lostPets });
  });
};

/* =========================================================
   📌 CREATE FORM (USER)
   GET /lost/create
========================================================= */
exports.createForm = (req, res) => {
  if (!req.session?.user) return res.redirect("/auth/login");
  res.render("pages/lostCreate");
};

/* =========================================================
   📌 YENİ KAYIP İLANI EKLE (USER)
   POST /lost/create
========================================================= */
exports.create = (req, res) => {
  if (!req.session?.user) return res.redirect("/auth/login");

  const data = {
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    image: req.body.image || null,
    description: req.body.description || null,
    user_id: req.session.user.id,
  };

  if (!data.name || !data.city) {
    req.session.message = { type: "error", text: "İsim ve şehir alanları zorunludur" };
    return res.redirect("/lost/create");
  }

  LostPets.insertLostPet(data, (err) => {
    if (err) {
      req.session.message = { type: "error", text: "İlan eklenirken bir hata oluştu" };
      return res.redirect("/lost/create");
    }
    req.session.message = { type: "success", text: "Kayıp ilanı başarıyla yayınlandı" };
    res.redirect("/lost/my");
  });
};

/* =========================================================
   📌 DÜZENLE FORMU (USER)
   GET /lost/edit/:id
========================================================= */
exports.editForm = (req, res) => {
  if (!req.session?.user) return res.redirect("/auth/login");

  const userId = req.session.user.id;
  const id = req.params.id;

  LostPets.getLostByIdAndUser(id, userId, (err, lost) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB HATASI");
    }
    if (!lost) return res.status(403).send("Yetkisiz erişim");

    res.render("pages/lostEdit", { lost });
  });
};

/* =========================================================
   📌 GÜNCELLE (USER)
   POST /lost/edit/:id
========================================================= */
exports.update = (req, res) => {
  if (!req.session?.user) return res.redirect("/auth/login");

  const userId = req.session.user.id;
  const id = req.params.id;

  const data = {
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    image: req.body.image || null,
    description: req.body.description || null,
  };

  LostPets.updateLostByUser(id, userId, data, (err) => {
    if (err) {
      req.session.message = { type: "error", text: "Güncelleme sırasında hata oluştu" };
      return res.redirect("/lost/my");
    }
    req.session.message = { type: "success", text: "İlan başarıyla güncellendi" };
    res.redirect("/lost/my");
  });
};

/* =========================================================
   📌 SİL (USER)
   POST /lost/delete/:id   ✅ (POST önerilir)
========================================================= */
exports.delete = (req, res) => {
  if (!req.session?.user) return res.redirect("/auth/login");

  const userId = req.session.user.id;
  const id = req.params.id;

  LostPets.deleteLostByUser(id, userId, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB HATASI");
    }
    res.redirect("/lost/my");
  });
};
