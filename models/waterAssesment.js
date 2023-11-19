const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const waterAssesmentSchema = new Schema(
  {
    water: {
      type: Schema.Types.ObjectId,
      ref: "waters",
    },
    assesments: Array,
    score: Number,
    status: String,
    owner: String, // pengelola
    reviewer: String, // inspektur/pemeriksa
    reviewDate: Date,
    assesmentDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("water-assesments", waterAssesmentSchema);
