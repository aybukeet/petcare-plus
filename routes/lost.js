const express = require("express");
const router = express.Router();
const lostController = require("../controller/lostController");
const api = require("../middleware/authMiddleware");

router.get("/", lostController.list);
router.get("/my", lostController.myLost);
router.get("/create", lostController.createForm);
router.post("/create", lostController.create);
router.get("/edit/:id", lostController.editForm);
router.post("/edit/:id", lostController.update);
router.post("/delete/:id", lostController.delete);
router.get("/found/:id", api.isAuth, lostController.foundForm);
router.post("/found/:id", api.isAuth, lostController.submitFound);
router.get("/:slug", lostController.detail);

module.exports = router;
