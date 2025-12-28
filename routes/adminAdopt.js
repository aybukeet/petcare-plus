const express = require("express");
const router = express.Router();
const adminAdoptController = require("../controller/adminAdoptController");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/", isAdmin, adminAdoptController.list);
router.get("/create", isAdmin, adminAdoptController.createForm);
router.post("/create", isAdmin, adminAdoptController.create);
router.post("/delete/:id", isAdmin, adminAdoptController.delete);

// Requests
router.get("/requests", isAdmin, adminAdoptController.listRequests);
router.post("/requests", isAdmin, adminAdoptController.processRequest);

module.exports = router;
