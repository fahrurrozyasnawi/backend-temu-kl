const mongoose = require("mongoose");
const tfus = require("./tfu");

//Define a schema
const Schema = mongoose.Schema;
const TFUAssesmentSchema = new Schema(
  {
    tfu: {
      type: Schema.Types.ObjectId,
      ref: "tfus",
    },
    score: Number, // nilai ketidaksesuaian
    scoreAssesment: Number, // nilai setelah dilakukan perhitungan dari nilai ketidasesuaian
    step: Number, // tahap
    reviewer: String, // pemeriksa
    reviewDate: Date, // tgl IKL (IS?)
    assesments: Array,
    status: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("tfu-assesments", TFUAssesmentSchema);
