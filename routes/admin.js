const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const announcementController = require("../controller/announcementController");
const adminGalleryRoute = require("./adminGallery");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/dashboard", isAdmin, adminController.dashboard);

router.get("/pets", isAdmin, adminController.listPets);
router.get("/pets/add", isAdmin, adminController.addPetForm);
router.post("/pets/add", isAdmin, adminController.saveNewPet);
router.get("/pets/edit/:id", isAdmin, adminController.editPetForm);
router.post("/pets/edit/:id", isAdmin, adminController.updatePet);
router.post("/pets/delete/:id", isAdmin, adminController.deletePet);

router.get("/announcements", isAdmin, announcementController.adminList);
router.get("/announcements/new", isAdmin, announcementController.newForm);
router.post("/announcements/new", isAdmin, announcementController.create);
router.post("/announcements/delete/:id", isAdmin, announcementController.delete);

router.get("/users", isAdmin, adminController.users);

router.use("/gallery", adminGalleryRoute);

module.exports = router;
