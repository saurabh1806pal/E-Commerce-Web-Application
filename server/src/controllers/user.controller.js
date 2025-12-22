const Product = require("../models/product.model");
const User = require("../models/user.model");
const fs = require("fs");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  console.log("product fetched:", products.length);

  res.json({
    success: true,
    products,
  });
};
exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json({
    success: true,
    product,
  });
};
exports.getUserProfile = (req, res) => {
  res.json({
    success: true,
    user: req.session.user,
  });
};
exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.session.user._id).populate("favourites");

  res.json({
    success: true,
    products: user.favourites,
  });
};
exports.addToWishlist = async (req, res) => {
  const user = await User.findById(req.session.user._id);

  if (!user.favourites.includes(req.params.id)) {
    user.favourites.push(req.params.id);
    await user.save();
  }

  res.json({
    success: true,
    message: "Added to wishlist",
  });
};
exports.removeFromWishlist = async (req, res, next) => {
  const user = await User.findById(req.session.user._id);
  if (user.favourites.includes(req.params.id)) {
    user.favourites.splice(user.favourites.indexOf(req.params.id), 1);
    await user.save();
  }
  res.json({
    success: true,
    message: "Removed from wishlist",
  });
};

exports.getCart = async (req, res, next) => {
  const user = await User.findById(req.session.user._id).populate("cart");

  res.json({
    success: true,
    products: user.cart,
  });
};

exports.addToCart = async (req, res, next) => {
  const user = await User.findById(req.session.user._id);

  if (!user.cart.includes(req.params.id)) {
    user.cart.push(req.params.id);
    await user.save();
  }

  res.json({
    success: true,
    message: "Added to cart",
  });
};
exports.removeFromCart = async (req, res, next) => {
  const user = await User.findById(req.session.user._id);
  if (user.cart.includes(req.params.id)) {
    user.cart.splice(user.cart.indexOf(req.params.id), 1);
    await user.save();
  }
  res.json({
    success: true,
    message: "Removed from cart",
  });
};
