const express = require("express");
const router = express.Router();
const adminGalleryController = require("../controller/adminGalleryController");
const { isAdmin } = require("../middleware/authMiddleware");

// GALERİ LİSTE
router.get("/", isAdmin, adminGalleryController.list);

// GALERİ EKLE FORM
router.get("/add", isAdmin, adminGalleryController.addForm);

// GALERİ KAYDET
router.post("/add", isAdmin, adminGalleryController.create);

// GALERİ SİL
router.post("/delete/:id", isAdmin, adminGalleryController.delete);

module.exports = router;
