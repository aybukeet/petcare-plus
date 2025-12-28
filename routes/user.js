const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { isUser } = require("../middleware/userMiddleware");

router.get("/dashboard", isUser, userController.dashboard);
router.get("/lost", isUser, userController.myLostPets);


const notificationController = require("../controller/notificationController");

const { isAuth } = require("../middleware/authMiddleware");

router.get("/notifications", isAuth, notificationController.list);
router.get("/notifications/read/:id", isAuth, notificationController.markRead);
router.get("/notifications/read-all", isAuth, notificationController.markAllRead);

module.exports = router;
