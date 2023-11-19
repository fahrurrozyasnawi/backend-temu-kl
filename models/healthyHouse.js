const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const HealthyHouseSchema = new Schema(
  {
    name: String,
    type: String,
    address: String,

    // jamban sehat
    location: String,
    nUsed: Number,
    job: String,
    visitDate: Date,

    // rumah sehat
    nFamily: String,
    assesmentDate: Date,
    assesmentPerson: String,
    province: Object,
    region: Object,
    district: Object,
    ward: Object,

    status: String, // last status from assesment
    score: Number, // last score form assesment
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("healthy-houses", HealthyHouseSchema);
