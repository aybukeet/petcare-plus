const express = require("express");
const router = express.Router();
const careController = require("../controller/careController");
const { isUser } = require("../middleware/authMiddleware");

router.get("/", isUser, careController.list);
router.get("/create", isUser, careController.createForm);
router.post("/create", isUser, careController.create);
router.post("/delete/:id", isUser, careController.delete);
router.get("/edit/:id", isUser, careController.editForm);
router.post("/edit/:id", isUser, careController.update);

module.exports = router;
