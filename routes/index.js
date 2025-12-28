const express = require("express");
const router = express.Router();

const homeController = require("../controller/homeController");

router.get("/", homeController.index);

const contactController = require("../controller/contactController");
router.get("/contact", contactController.showForm);
router.post("/contact", contactController.submitForm);

module.exports = router;
