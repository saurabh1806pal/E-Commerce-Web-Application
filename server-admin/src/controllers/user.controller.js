const Product = require("../models/product.model");
const User = require("../models/user.model");
const fs = require("fs");

exports.getAllProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("users/home", {
      products: products,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Product.findById(id).then((product) => {
    res.render("users/details-page", {
      product: product,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getUserProfile = (req, res, next) => {
  res.render("users/profile-page", {
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.getWishlist = async (req, res, next) => {
  const userId = req.session.user._id;
  const userDocs = await User.findById(userId).populate("favourites");
  res.render("users/wishlist", {
    products: userDocs.favourites,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.addToWishlist = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(id)) {
    user.favourites.push(id);
    await user.save();
  }
  res.redirect("/wishlist");
};

exports.removeFromWishlist = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.session.user._id;
  console.log(id, userId);
  const user = await User.findById(userId);
  if (user.favourites.includes(id)) {
    user.favourites.splice(user.favourites.indexOf(id), 1);
    await user.save();
  }
  res.redirect("/wishlist");
};

exports.getCart = async (req, res, next) => {
  const userId = req.session.user._id;
  const userDocs = await User.findById(userId).populate("cart");
  res.render("users/cart", {
    products: userDocs.cart,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.addToCart = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.cart.includes(id)) {
    user.cart.push(id);
    await user.save();
  }
  res.redirect("/cart");
};
exports.removeFromCart = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.cart.includes(id)) {
    user.cart.splice(user.cart.indexOf(id), 1);
    await user.save();
  }
  res.redirect("/cart");
};
