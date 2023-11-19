require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// verifyToken
const { verifyToken } = require("./controllers/auth");

const app = express();
const path = require("path");
const db = require("./config/database").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("secretKey", process.env.SECRET_KEY || "localsippkl");

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

//repo image
app.use("/repo", express.static(path.join(__dirname, "repo")));

app.get("/", function (req, res) {
  res.json({ msg: "running SIP PKL services" });
});

// Routes API
const authRoute = require("./routes/auth");
const areaCodeRoute = require("./routes/areaCode");
const usersRoute = require("./routes/users");
const puskesmasRoute = require("./routes/puskesmas");
const documentsRoute = require("./routes/documents");
const tfuRoute = require("./routes/tfu");
const tfuAssesmentRoute = require("./routes/tfuAssesment");
const tppRoute = require("./routes/tpp");
const tppAssesmentRoute = require("./routes/tppAssesment");
const waterRoute = require("./routes/water");
const waterAssesmentRoute = require("./routes/waterAssesment");
const sanitaryRoute = require("./routes/sanitary");
const sanitaryAssesmentRoute = require("./routes/sanitaryAssesment");
const healthyHouseRoute = require("./routes/healthyHouse");
const healthyHouseAssesmentRoute = require("./routes/healthyHouseAssesment");
const residentRoute = require("./routes/resident");
const dashboardRoute = require("./routes/dashboard");
const reportRoute = require("./routes/reports");

app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);
app.use("/report", verifyToken, reportRoute);
app.use("/area", verifyToken, areaCodeRoute);
app.use("/users", verifyToken, usersRoute);
app.use("/puskesmas", verifyToken, puskesmasRoute);
app.use("/resident", verifyToken, residentRoute);
app.use("/document", verifyToken, documentsRoute);
app.use("/tfu", verifyToken, tfuRoute);
app.use("/tfu/assesment", verifyToken, tfuAssesmentRoute);
app.use("/tpp", verifyToken, tppRoute);
app.use("/tpp/assesment", verifyToken, tppAssesmentRoute);
app.use("/water", verifyToken, waterRoute);
app.use("/water/assesment", verifyToken, waterAssesmentRoute);
app.use("/sanitary", verifyToken, sanitaryRoute);
app.use("/sanitary/assesment", verifyToken, sanitaryAssesmentRoute);
app.use("/healthy-house", verifyToken, healthyHouseRoute);
app.use("/healthy-house/assesment", verifyToken, healthyHouseAssesmentRoute);

/* ############################################ */

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

const port = process.env.PORT || 4001;

app.listen(port, function () {
  console.log(`Node server listening on port ${port}`);
});
