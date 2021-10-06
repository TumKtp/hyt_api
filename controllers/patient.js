const db = require("../db");

exports.addPatient = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      nickname,
      user_info,
      address,
      phone_number,
      gender,
    } = req.body;
    const results = await db.query(
      "INSERT INTO patient (firstname,lastname,nickname,user_info,address,phone_number,gender,user_account_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        firstname,
        lastname,
        nickname,
        user_info,
        address,
        phone_number,
        gender,
        req.auth.id,
      ].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        firstname,
        lastname,
        nickname,
        user_info,
        address,
        phone_number,
        gender,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to add a new patient",
    });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const results = await db.query(
      "SELECT patient.*,user_account.username FROM patient LEFT JOIN user_account ON user_account.id = patient.user_account_id ORDER BY id"
    );
    return res.json({
      status: "success",
      data: {
        patients: results.rows,
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No patient found",
    });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const {
      firstname,
      lastname,
      nickname,
      user_info,
      address,
      phone_number,
      gender,
    } = req.body;
    const results = await db.query(
      "UPDATE patient SET firstname=$1,lastname=$2,nickname=$3,user_info=$4,address=$5,phone_number=$6,gender=$7 WHERE id=$8",
      [
        firstname,
        lastname,
        nickname,
        user_info,
        address,
        phone_number,
        gender,
        patientId,
      ].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        firstname,
        lastname,
        nickname,
        user_info,
        address,
        phone_number,
        gender,
        patientId,
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to add a new patient",
    });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const results = await db.query(
      "DELETE FROM patient WHERE id=$1",
      [patientId].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        message: "Patient deleted",
      },
    });
  } catch (e) {
    if (!process.env.PRODUCTION) console.log(e);
    return res.status(400).json({
      error: "Failed to delete the patient",
    });
  }
};

exports.getPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const results = await db.query(
      "SELECT * FROM patient WHERE id=$1",
      [patientId].map((v) => (v === "" ? null : v))
    );
    return res.json({
      status: "success",
      data: {
        patient: results.rows[0],
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: "No patient found",
    });
  }
};
