const express = require("express");
const router = express.Router();

const {
  addPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
  getPatient,
} = require("../controllers/patient");

router.get("/patients", getAllPatients);

router.post("/patients", addPatient);

router.put("/patient/:patientId", updatePatient);

router.get("/patient/:patientId", getPatient);

router.delete("/patient/:patientId", deletePatient);

module.exports = router;
