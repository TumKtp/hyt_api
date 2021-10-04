const db = require("../db");
const { securePassword } = require("../helpers/authHelper");
const { v4: uuidv4 } = require("uuid");

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await db.query(
      "SELECT id,username,detail,role FROM users WHERE id=$1",
      [userId]
    );
    return res.json({
      status: "success",
      data: {
        user: results.rows[0],
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No user found",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const results = await db.query(
      "SELECT id,username,detail,role FROM users ORDER BY role"
    );
    return res.json({
      status: "success",
      data: {
        users: results.rows,
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No user found",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password, detail, role } = req.body;
    const salt = uuidv4();
    const encryptedPassword = securePassword(password, salt);
    const results = await db.query(
      "UPDATE users SET username=$1,encry_password=$2,salt=$3,detail=$4,role=$5 WHERE id=$6",
      [username, encryptedPassword, salt, detail, role, userId]
    );
    return res.json({
      status: "success",
      data: {
        username,
        detail,
        role,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      status: "error",
      data: {
        error: "Unable to update the user.",
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await db.query("DELETE FROM users WHERE id=$1", [userId]);
    return res.json({
      status: "success",
      data: {
        message: "User deleted",
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to delete the user",
    });
  }
};
