const express = require("express");
const router = express.Router();
const adminAnnouncementController = require("../controller/adminAnnouncementController");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/", isAdmin, adminAnnouncementController.list);
router.get("/create", isAdmin, adminAnnouncementController.createForm);
router.post("/create", isAdmin, adminAnnouncementController.create);
router.get("/delete/:id", isAdmin, adminAnnouncementController.delete);

module.exports = router;
