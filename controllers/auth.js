const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const { securePassword } = require("../helpers/authHelper");

exports.signup = async (req, res) => {
  try {
    const { username, password, detail, role } = req.body;
    const salt = uuidv4();
    const encryptedPassword = securePassword(password, salt);
    const results = await db.query(
      "INSERT INTO users (username,encry_password,salt,detail,role) VALUES ($1,$2,$3,$4,$5)",
      [username, encryptedPassword, salt, detail, role]
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
    const results = await db.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    const {
      salt,
      encry_password: encryptedPassword,
      detail,
      role,
      id,
    } = results.rows[0];

    if (securePassword(password, salt) !== encryptedPassword) {
      if (!process.env.PRODUCTION) console.log("Password Incorrect");
      throw e;
    }

    // Create token
    const token = jwt.sign({ username, id }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    // Send response to front end
    return res.json({
      status: "success",
      data: {
        token,
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
        error: "Email or password incorrect",
      },
    });
  }
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
