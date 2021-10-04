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
      stock,
      sold,
    } = req.body;
    const results = await db.query(
      "INSERT INTO products (th_name,zh_name,en_name,detail,type,price_per_unit,stock,sold) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [th_name, zh_name, en_name, detail, type, price_per_unit, stock, sold]
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
        stock,
        sold,
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
    const results = await db.query("SELECT * FROM products ORDER BY id");
    return res.json({
      status: "success",
      data: {
        products: results.rows,
      },
    });
  } catch (e) {
    console.log(e);
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
      stock,
      sold,
    } = req.body;
    const results = await db.query(
      "UPDATE products SET th_name=$1,zh_name=$2,en_name=$3,detail=$4,type=$5,price_per_unit=$6,stock=$7,sold=$8 WHERE id=$9",
      [
        th_name,
        zh_name,
        en_name,
        detail,
        type,
        price_per_unit,
        stock,
        sold,
        productId,
      ]
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
        stock,
        sold,
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
    const results = await db.query("DELETE FROM products WHERE id=$1", [
      productId,
    ]);
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
    const results = await db.query("SELECT * FROM products WHERE id=$1", [
      productId,
    ]);
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
