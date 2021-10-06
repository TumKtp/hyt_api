const express = require("express");
const router = express.Router();

const {
  addBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
  getBranch,
} = require("../controllers/branch");
const { isSignedIn } = require("../middlewares/auth");

router.post("/branches", isSignedIn, addBranch);

router.get("/branches/:branchId", getBranch);
router.get("/branches", getAllBranches);

router.put("/branches/:branchId", isSignedIn, updateBranch);

router.delete("/branches/:branchId", isSignedIn, deleteBranch);

module.exports = router;
