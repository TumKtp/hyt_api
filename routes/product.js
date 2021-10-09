const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { isSignedIn, isOwner } = require("../middlewares/auth");
const router = express.Router();

router.post("/products", isSignedIn, isOwner, addProduct);

router.get("/products/:productId", isSignedIn, getProduct);
router.get("/products", isSignedIn, getAllProducts);

router.put("/products/:productId", isSignedIn, isOwner, updateProduct);

router.delete("/products/:productId", isSignedIn, isOwner, deleteProduct);

module.exports = router;
