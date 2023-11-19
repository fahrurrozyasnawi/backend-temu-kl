require("dotenv").config();

var databaseURI = process.env.DATABASE_URI || "mongodb://localhost/dbsippkl";

module.exports = {
  mongoURI: databaseURI,
  secretOrKey: "nahdude",
};
