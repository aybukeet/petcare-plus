const express = require("express");
const router = express.Router();
const galleryController = require("../controller/galleryController");

router.get("/", galleryController.list);

module.exports = router;
