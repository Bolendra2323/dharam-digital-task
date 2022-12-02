const express = require('express');

const userController = require("../controller/login");

const userController2 = require("../controller/user");

const campaingController = require("../controller/campaign");

const redirectController = require("../controller/redirect");

const middleware = require("../middleware/middleware");

const router = express.Router();


//=============================POST-API================================================
router.post('/users', userController2.createUser);

// line no.17 is post api where we posting the user details and '/users' is the end point

router.post('/campaigns', campaingController.createCampaign);

// line no.21 is post api where we posting the campaign details and '/campaigns' is the end point

//============================Log-In API================================================
router.post("/api/login", userController.login);

// line no.26 is login api where we will use the end point---> '/api/login' to logged in.

//============================Redirect-API==============================================

//router.get("/api/redirect", middleware.auth, redirectController.redirectURL);
router.get("/api/redirect", middleware.auth, redirectController.redirectURL);

//line no.23 is for redirecting the user to different url which we will be doing with the help of axios

module.exports = router;