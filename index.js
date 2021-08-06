require("dotenv").config();
const express = require("express");
const { isSignedIn } = require("./middlewares/auth");
const app = express();
// Middlewares
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use("/api", authRoutes);
app.use("/api", isSignedIn, patientRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//
