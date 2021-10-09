const express = require("express");
const {
  getProductDetail,
  addProductDetail,
  updateProductDetail,
  deleteProductDetail,
} = require("../controllers/productDetail");
const { isSignedIn, isOwner } = require("../middlewares/auth");
const router = express.Router();

router.post("/product_detail", isSignedIn, isOwner, addProductDetail);

router.get("/product_detail/:productId", isSignedIn, isOwner, getProductDetail);

router.put(
  "/product_detail/:productId",
  isSignedIn,
  isOwner,
  updateProductDetail
);

router.delete(
  "/product_detail/:productId",
  isSignedIn,
  isOwner,
  deleteProductDetail
);

module.exports = router;
