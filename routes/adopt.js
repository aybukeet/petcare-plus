const express = require("express");
const router = express.Router();
const adoptController = require("../controller/adoptController");
const { isAuth } = require("../middleware/authMiddleware");

router.get("/", adoptController.list);
router.get("/:slug", adoptController.detail);
router.get("/request/:id", isAuth, adoptController.requestForm);
router.post("/request/:id", isAuth, adoptController.submitRequest);


module.exports = router;
