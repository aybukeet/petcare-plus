const express = require("express");
const router = express.Router();
const sitemapController = require("../controller/sitemapController");

router.get("/", sitemapController.index);

module.exports = router;
