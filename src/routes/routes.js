const express = require('express');


const userController = require("../controller/login");
const userController2 = require("../controller/user");
const redirectController = require("../controller/redirect");
const middleware = require("../middleware/middleware");
const router = express.Router();


//=============================User-API================================================
router.post('/users', userController2.createUser);

// line no.12 is post api where we posting the user details and '/users' is the end point 

//============================Log-In API================================================
router.post("/api/login", userController.login);

// line no.17 is login api where we will use the end point---> '/api/login' to logged in.

//============================Redirect-API==============================================

router.get("/api/redirect", middleware.auth, redirectController.redirect);

//line no.23 is for redirecting the user to different url which we will be doing with the help of axios

module.exports = router;