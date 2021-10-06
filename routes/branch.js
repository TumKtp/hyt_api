const express = require("express");
const router = express.Router();

const {
  addBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
  getBranch,
} = require("../controllers/branch");

router.post("/branches", addBranch);

router.get("/branches/:branchId", getBranch);
router.get("/branches", getAllBranches);

router.put("/branches/:branchId", updateBranch);

router.delete("/branches/:branchId", deleteBranch);

module.exports = router;
