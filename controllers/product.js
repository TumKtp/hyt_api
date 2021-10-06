const db = require("../db");

exports.addProduct = async (req, res) => {
  try {
    const {
      th_name,
      zh_name,
      en_name,
      detail,
      type,
      price_per_unit,
      location,
      image_url,
    } = req.body;
    const results = await db.query(
      "INSERT INTO product (th_name,zh_name,en_name,detail,type,price_per_unit,location,image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        th_name,
        zh_name,
        en_name,
        detail,
        type,
        price_per_unit,
        location,
        image_url,
      ].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        th_name,
        zh_name,
        en_name,
        detail,
        type,
        price_per_unit,
        location,
        image_url,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to add a new product",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM product ORDER BY id");
    return res.json({
      status: "success",
      data: {
        products: results.rows,
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No product found",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      th_name,
      zh_name,
      en_name,
      detail,
      type,
      price_per_unit,
      location,
      image_url,
    } = req.body;
    const results = await db.query(
      "UPDATE product SET th_name=$1,zh_name=$2,en_name=$3,detail=$4,type=$5,price_per_unit=$6,location=$7,image_url=$8 WHERE id=$9",
      [
        th_name,
        zh_name,
        en_name,
        detail,
        type,
        price_per_unit,
        location,
        image_url,
        productId,
      ].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        th_name,
        zh_name,
        en_name,
        detail,
        type,
        price_per_unit,
        location,
        image_url,
        productId,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to update a product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const results = await db.query(
      "DELETE FROM product WHERE id=$1",
      [productId].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        message: "Product deleted",
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to delete the product",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const results = await db.query(
      "SELECT * FROM product WHERE id=$1",
      [productId].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        product: results.rows[0],
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No product found",
    });
  }
};
