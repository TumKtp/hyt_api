require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const { isSignedIn } = require("../middlewares/auth");
const app = express();

// Middlewares
app.use(express.json());
// Routes
const authRoutes = require("../routes/auth");
const patientRoutes = require("../routes/patient");

app.use("/.netlify/functions/api", authRoutes);
app.use("/.netlify/functions/api", isSignedIn, patientRoutes);

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

module.exports.handler = serverless(app);
