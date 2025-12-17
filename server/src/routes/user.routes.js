const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");

// User Routes

// Routes to get all the Products and Product Details
userRouter.get("/", userController.getAllProducts);
userRouter.get("/home", userController.getAllProducts);
userRouter.get("/home/:id", userController.getProductDetails);

// // Routes to view User Profile
userRouter.get("/profile", userController.getUserProfile);

// // Routes to manage Favourites
userRouter.get("/wishlist", userController.getWishlist);
userRouter.post("/wishlist/:id", userController.addToWishlist);
userRouter.post("/wishlistDel/:id", userController.removeFromWishlist);

// // Routes to manage Cart
userRouter.get("/cart", userController.getCart);
userRouter.post("/cart/:id", userController.addToCart);
userRouter.post("/cartDel/:id", userController.removeFromCart);

module.exports = userRouter;
