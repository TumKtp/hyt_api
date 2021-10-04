const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.get("/users/:userId", getUser);
router.get("/users", getAllUsers);

router.put("/users/:userId", updateUser);

router.delete("/users/:userId", deleteUser);

module.exports = router;
