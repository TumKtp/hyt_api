const express = require("express");
const router = express.Router();

//TODO: allow only admin to signup
const { signout, signup, signin } = require("../controllers/auth");

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
