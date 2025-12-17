const express = require("express");
const adminRouter = express.Router();

const adminController = require("../controllers/admin.controller");

adminRouter.get("/add-product", adminController.getAddProduct);
adminRouter.post("/add-product", adminController.postAddProduct);
adminRouter.get("/product-listed", adminController.getProducts);
adminRouter.get("/edit-product/:id", adminController.getEditProduct);
adminRouter.post("/edit-product", adminController.postEditProduct);
adminRouter.post("/delete-product/:id", adminController.postDeleteProduct);

module.exports = adminRouter;
