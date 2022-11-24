const express = require('express');
const router = express.Router();
const userController = require("../controller/login");
const redirectController = require("../controller/redirect");
const middleware = require("../middleware/middleware");

//============================Log-In API================================================
router.post("/api/login", userController.login);

//============================Redirect-API==============================================

router.get("/api/redirect", redirectController.redirect);


module.exports = router;