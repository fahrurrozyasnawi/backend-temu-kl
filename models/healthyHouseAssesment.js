const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const HHAssesmentSchema = new Schema(
  {
    hh: {
      type: Schema.Types.ObjectId,
      ref: "healthy-houses",
    },
    assesments: Array,
    reviewer: String,
    assesmentDate: Date, // Tanggal pemeriksaan
    score: Number,
    scoreAssesment: Number,
    status: String,
    assesmentPerson: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("hh-assesments", HHAssesmentSchema);
