const db = require("../db");

exports.addPatient = async (req, res) => {
  try {
    const { firstname, lastname, nickname, user_info, address, phone_number } =
      req.body;
    const results = await db.query(
      "INSERT INTO patients (firstname,lastname,nickname,user_info,address,phone_number) VALUES ($1,$2,$3,$4,$5,$6)",
      [firstname, lastname, nickname, user_info, address, phone_number]
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
    const results = await db.query("SELECT * FROM patients ORDER BY id");
    return res.json({
      status: "success",
      data: {
        patients: results.rows,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "No patient found",
    });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { firstname, lastname, nickname, user_info, address, phone_number } =
      req.body;
    console.log(patientId);
    const results = await db.query(
      "UPDATE patients SET firstname=$1,lastname=$2,nickname=$3,user_info=$4,address=$5,phone_number=$6 WHERE id=$7",
      [
        firstname,
        lastname,
        nickname,
        user_info,
        address,
        phone_number,
        patientId,
      ]
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
    const results = await db.query("DELETE FROM patients WHERE id=$1", [
      patientId,
    ]);
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
    const results = await db.query("SELECT * FROM patients WHERE id=$1", [
      patientId,
    ]);
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
