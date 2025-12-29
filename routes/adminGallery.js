const express = require("express");
const router = express.Router();
const adminGalleryController = require("../controller/adminGalleryController");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/", isAdmin, adminGalleryController.list);
router.get("/add", isAdmin, adminGalleryController.addForm);
router.post("/add", isAdmin, adminGalleryController.create);
router.post("/delete/:id", isAdmin, adminGalleryController.delete);

module.exports = router;
