const mongoose = require("mongoose");
const tpps = require("./tpp");

//Define a schema
const Schema = mongoose.Schema;
const TPPAssesmentSchema = new Schema(
  {
    tpp: {
      type: Schema.Types.ObjectId,
      ref: "tpps",
    },
    typeCook: String, // golongan untuk jasa boga
    sentraType: String, // pengelola atau gerai untuk assesment sentra pangan jajanan
    sentraParent: String, // jika sentra adalah gerai maka wajib menambahkan pengelola yang terkait
    owner: String,
    reviewer: String, // nama pemeriksa
    score: Number, // nilai ketidaksesuaian
    scoreAssesment: Number, // nilai setelah dilakukan perhitungan dari nilai ketidasesuaian
    reviewDate: Date,
    assesments: Array,
    assesmentDate: Date,
    status: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("tpp-assesments", TPPAssesmentSchema);
