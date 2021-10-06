const db = require("../db");
const { securePassword } = require("../helpers/authHelper");
const { v4: uuidv4 } = require("uuid");

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await db.query(
      "SELECT id,username,detail,role,branch_id FROM user_account WHERE id=$1",
      [userId].map((v) => (v === "" ? null : v))
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
      "SELECT user_account.id,user_account.username,user_account.detail,user_account.role,branch.name as branch_name FROM user_account LEFT JOIN branch ON user_account.branch_id = branch.id ORDER BY role"
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
    const { username, password, detail, role, branch_id } = req.body;
    const salt = uuidv4();
    const encryptedPassword = securePassword(password, salt);
    const results = await db.query(
      "UPDATE user_account SET username=$1,encry_password=$2,salt=$3,detail=$4,role=$5,branch_id=$6 WHERE id=$7",
      [username, encryptedPassword, salt, detail, role, branch_id, userId].map(
        (v) => (v === "" ? null : v)
      )
    );
    return res.json({
      status: "success",
      data: {
        username,
        detail,
        role,
        branch_id,
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
    const results = await db.query(
      "DELETE FROM user_account WHERE id=$1",
      [userId].map((v) => (v === "" ? null : v))
    );
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
