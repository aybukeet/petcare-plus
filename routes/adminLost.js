const express = require("express");
const router = express.Router();
const adminLostController = require("../controller/adminLostController");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/", isAdmin, adminLostController.list);
router.get("/create", isAdmin, adminLostController.createForm);
router.post("/create", isAdmin, adminLostController.create);
router.post("/delete/:id", isAdmin, adminLostController.delete);

router.get("/sightings", isAdmin, adminLostController.listSightings);
router.post("/sightings", isAdmin, adminLostController.processSighting);

module.exports = router;
