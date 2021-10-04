const express = require("express");
const router = express.Router();

const {
  addPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
  getPatient,
} = require("../controllers/patient");

router.post("/patients", addPatient);

router.get("/patients/:patientId", getPatient);
router.get("/patients", getAllPatients);

router.put("/patients/:patientId", updatePatient);

router.delete("/patients/:patientId", deletePatient);

module.exports = router;
