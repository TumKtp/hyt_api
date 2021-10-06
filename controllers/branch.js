const e = require("express");
const db = require("../db");

exports.addBranch = async (req, res) => {
  try {
    const { name, address, detail, phone_number } = req.body;
    const results = await db.query(
      "INSERT INTO branch (name,address,detail,phone_number) VALUES ($1,$2,$3,$4)",
      [name, address, detail, phone_number].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        name,
        address,
        detail,
        phone_number,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to add a new branch",
    });
  }
};

exports.getAllBranches = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM branch ORDER BY id");
    return res.json({
      status: "success",
      data: {
        branches: results.rows,
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No branch found",
    });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const { branchId } = req.params;
    const { name, address, detail, phone_number } = req.body;
    const results = await db.query(
      "UPDATE branch SET name=$1,address=$2,detail=$3,phone_number=$4 WHERE id=$5",
      [name, address, detail, phone_number, branchId].map((v) =>
        v === "" ? null : v
      )
    );
    if (results.rowCount == 0) throw "Not found";
    return res.json({
      status: "success",
      data: {
        name,
        address,
        detail,
        phone_number,
        branchId,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to update a branch",
    });
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    const { branchId } = req.params;
    const results = await db.query("DELETE FROM branch WHERE id=$1", [
      branchId,
    ]);
    if (results.rowCount == 0) throw "Not found";
    return res.json({
      status: "success",
      data: {
        message: "Branch deleted",
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to delete the branch",
    });
  }
};

exports.getBranch = async (req, res) => {
  try {
    const { branchId } = req.params;
    const results = await db.query(
      "SELECT * FROM branch WHERE id=$1",
      [branchId].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        branch: results.rows[0],
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No branch found",
    });
  }
};
