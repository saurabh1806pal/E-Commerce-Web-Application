const express = require("express");
const authRouter = express.Router();

// Local Module
const authController = require("../controllers/auth.controller");

authRouter.post("/login", authController.postLogin);
authRouter.get("/me", authController.getMe);
authRouter.post("/logout", authController.postLogout);
authRouter.post("/signup", authController.postSignup);

module.exports = authRouter;
