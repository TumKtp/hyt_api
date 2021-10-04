const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const router = express.Router();

router.post("/products", addProduct);

router.get("/products/:productId", getProduct);
router.get("/products", getAllProducts);

router.put("/products/:productId", updateProduct);

router.delete("/products/:productId", deleteProduct);

module.exports = router;
