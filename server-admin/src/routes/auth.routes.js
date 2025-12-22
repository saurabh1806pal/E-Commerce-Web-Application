const express = require("express");
const authRouter = express.Router();

// Local Module
const authController = require("../controllers/auth.controller");
const redirectIfLoggedIn = require("../middlewares/redirectIfLoggedIn");
authRouter.get("/", redirectIfLoggedIn, authController.getLogin);
authRouter.get("/login", redirectIfLoggedIn, authController.getLogin);
authRouter.post("/login", authController.postLogin);

authRouter.post("/logout", authController.postLogout);

authRouter.get("/signup", redirectIfLoggedIn, authController.getSignup);
authRouter.post("/signup", authController.postSignup);

module.exports = authRouter;
