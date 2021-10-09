const express = require("express");
const router = express.Router();

const {
  addBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
  getBranch,
} = require("../controllers/branch");
const { isSignedIn, isOwner } = require("../middlewares/auth");

router.post("/branches", isSignedIn, isOwner, addBranch);

router.get("/branches/:branchId", isSignedIn, getBranch);
router.get("/branches", isSignedIn, getAllBranches);

router.put("/branches/:branchId", isSignedIn, isOwner, updateBranch);

router.delete("/branches/:branchId", isSignedIn, isOwner, deleteBranch);

module.exports = router;
