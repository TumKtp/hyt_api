const express = require("express");
const router = express.Router();

const {
  addPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
  getPatient,
} = require("../controllers/patient");
const { isSignedIn, isOwner } = require("../middlewares/auth");

router.post("/patients", isSignedIn, addPatient);

router.get("/patients/:patientId", isSignedIn, getPatient);
router.get("/patients", isSignedIn, getAllPatients);

router.put("/patients/:patientId", isSignedIn, isOwner, updatePatient);

router.delete("/patients/:patientId", isSignedIn, isOwner, deletePatient);

module.exports = router;
