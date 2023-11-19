const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const ReportsSchema = new Schema(
  {
    name: String,
    type: String,
    report: Object,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("reports", ReportsSchema);
