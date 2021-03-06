require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { isSignedIn } = require("./middlewares/auth");
const app = express();
// Middlewares
app.use(express.json());
if (process.env.PRODUCTION)
  app.use(
    cors({
      origin: ["https://portal.huayitangtcmclinic.com"],
    })
  );
else app.use(cors());
app.use(helmet());
// Routes
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const productDetailRoutes = require("./routes/productDetail");
const branchRoutes = require("./routes/branch");

app.use("/api", authRoutes);
app.use("/api", branchRoutes);
app.use("/api", isSignedIn, patientRoutes);
app.use("/api", isSignedIn, userRoutes);
app.use("/api", isSignedIn, productRoutes);
app.use("/api", isSignedIn, productDetailRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
