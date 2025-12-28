const express = require("express");
const router = express.Router();
const announcementController = require("../controller/announcementController");

router.get("/", announcementController.list);
router.get("/:slug", announcementController.detail);


module.exports = router;
