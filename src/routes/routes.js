const express = require('express');
const router = express.Router();

const userController = require("../controller/login");
const userController2 = require("../controller/user");
const redirectController = require("../controller/redirect");
const middleware = require("../middleware/middleware");


//=============================User-API================================================
router.post('/users', userController2.createUser);

//============================Log-In API================================================
router.post("/api/login", userController.login);

//============================Redirect-API==============================================

router.get("/api/redirect", redirectController.redirect);


module.exports = router;