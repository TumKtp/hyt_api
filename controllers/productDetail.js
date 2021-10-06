const db = require("../db");

exports.addProductDetail = async (req, res) => {
  try {
    const { stock, sold, promo_price_per_unit, branch_location } = req.body;
    const { branchId, productId } = req.query;
    const results = await db.query(
      "INSERT INTO product_detail (stock,sold,promo_price_per_unit,branch_location,product_id,branch_id) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        stock,
        sold,
        promo_price_per_unit,
        branch_location,
        productId,
        branchId,
      ].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        stock,
        sold,
        promo_price_per_unit,
        branch_location,
        productId,
        branchId,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to add new product detail",
    });
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const { branchId } = req.query;
    const results = await db.query(
      "SELECT * FROM product_detail WHERE product_id=$1 AND branch_id=$2",
      [productId, branchId].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        productDetail: results.rows[0],
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No product detail found",
    });
  }
};

exports.updateProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const { branchId } = req.query;
    const { stock, sold, promo_price_per_unit, branch_location } = req.body;
    const results = await db.query(
      "UPDATE product_detail SET stock=$1,sold=$2,promo_price_per_unit=$3,branch_location=$4 WHERE product_id=$5 AND branch_id=$6",
      [
        stock,
        sold,
        promo_price_per_unit,
        branch_location,
        productId,
        branchId,
      ].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        stock,
        sold,
        promo_price_per_unit,
        branch_location,
        productId,
        branchId,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to update product detail",
    });
  }
};

exports.deleteProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const { branchId } = req.query;
    const results = await db.query(
      "DELETE FROM product_detail WHERE product_id=$1 AND branch_id=$2",
      [productId, branchId].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        message: "Product detail deleted",
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to delete product detail",
    });
  }
};
