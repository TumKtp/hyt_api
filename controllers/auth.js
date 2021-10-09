const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const { securePassword } = require("../helpers/authHelper");
const { hasWhiteSpace } = require("../helpers/textHelper");

exports.signup = async (req, res) => {
  try {
    const { username, password, detail, role, branch_id } = req.body;
    if (hasWhiteSpace(password)) throw "Password can't contain space";
    if (password.length < 8) throw "Password must be at least 8 characters";

    const salt = uuidv4();
    const encryptedPassword = securePassword(password, salt);
    const results = await db.query(
      "INSERT INTO user_account (username,encry_password,salt,detail,role,branch_id) VALUES ($1,$2,$3,$4,$5,$6)",
      [username, encryptedPassword, salt, detail, role, branch_id].map((v) =>
        v === "" ? null : v
      )
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
        error: "Unable to sign up.",
      },
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const results = await db.query(
      "SELECT * FROM user_account WHERE username=$1",
      [username].map((v) => (v === "" ? null : v))
    );
    const {
      salt,
      encry_password: encryptedPassword,
      detail,
      role,
      id,
      branch_id,
    } = results.rows[0];

    if (securePassword(password, salt) !== encryptedPassword) {
      if (!process.env.PRODUCTION) console.log("Password Incorrect");
      throw e;
    }

    // Create token
    const token = jwt.sign(
      { username, id, role, branch_id },
      process.env.SECRET,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    );
    // Send response to front end
    return res.json({
      status: "success",
      data: {
        token,
        username,
        detail,
        role,
        branch_id,
        id,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      status: "error",
      data: {
        error: "Email or password incorrect",
      },
    });
  }
};

exports.role = (req, res) => {
  return res.json({
    status: "success",
    data: {
      role: req.auth.role,
    },
  });
};

exports.signout = (_, res) => {
  console.log("Clear token from cookie");
  res.clearCookie("token");
  return res.json({
    status: "success",
    data: {
      message: "User signout successfully",
    },
  });
};
