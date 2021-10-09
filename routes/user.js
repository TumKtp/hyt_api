const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { isSignedIn, isOwner } = require("../middlewares/auth");

router.get("/users/:userId", isSignedIn, isOwner, getUser);
router.get("/users", isSignedIn, isOwner, getAllUsers);

router.put("/users/:userId", isSignedIn, isOwner, updateUser);

router.delete("/users/:userId", isSignedIn, isOwner, deleteUser);

module.exports = router;
