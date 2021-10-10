const express = require("express");
const router = express.Router();

//TODO: allow only admin to signup
const { signout, signup, signin, role } = require("../controllers/auth");
const { isSignedIn, isOwner } = require("../middlewares/auth");

router.post("/signup", isSignedIn, isOwner, signup);

router.post("/signin", signin);

router.get("/signout", signout);

router.get("/role", isSignedIn, role);

module.exports = router;
