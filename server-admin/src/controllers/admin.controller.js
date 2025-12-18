const Product = require("../models/product.model");
const fs = require("fs");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("admin/all-product", {
      products: products,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const {
    productName,
    brandName,
    images,
    originalPrice,
    currentPrice,
    category,
    description,
  } = req.body;
  const product = new Product({
    productName,
    brandName,
    images,
    originalPrice,
    currentPrice,
    category,
    description,
  });
  product.save().then(() => {
    console.log("Product Saved Successfully");
  });
  res.redirect("/admin/product-listed");
};

exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  const editing = req.query.editing === "true";
  console.log(editing);
  console.log(id);
  Product.findById(id).then((product) => {
    res.render("admin/add-product", {
      product: product,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
      editing: editing,
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  console.log(req.body);
  const {
    id,
    productName,
    brandName,
    images,
    originalPrice,
    currentPrice,
    description,
  } = req.body;
  Product.findById(id)
    .then((product) => {
      product.productName = productName;
      product.brandName = brandName;
      product.images = images;
      product.originalPrice = originalPrice;
      product.currentPrice = currentPrice;
      product.description = description;

      product
        .save()
        .then((result) => {
          console.log("Product Updated");
        })
        .catch((err) => {
          console.log("Error while updating", err);
        });
      res.redirect("/admin/product-listed");
    })
    .catch((err) => {
      console.log("error while finding home");
    });
};
exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/admin/product-listed");
    })
    .catch((error) => {
      console.log("DELETE HIT: PRODUCT DELETED", id);
    });
};
