const express = require("express");
const {
  getProductDetail,
  addProductDetail,
  updateProductDetail,
  deleteProductDetail,
} = require("../controllers/productDetail");
const router = express.Router();

router.post("/product_detail", addProductDetail);

router.get("/product_detail/:productId", getProductDetail);

router.put("/product_detail/:productId", updateProductDetail);

router.delete("/product_detail/:productId", deleteProductDetail);

module.exports = router;
