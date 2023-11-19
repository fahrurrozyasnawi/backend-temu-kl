const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const sanitaryAssesmentSchema = new Schema(
  {
    sanitary: {
      type: Schema.Types.ObjectId,
      ref: "sanitaries",
    },
    type: String, // jenis penyakit
    reviewer: String,
    baseData: Object,
    assesments: Array,
    assesmentDate: Date, // tanggal inspeksi
    status: String, // hasil inspeksi

    // data konseling
    isHaveCounseling: Boolean,
    counselingDate: Date,
    counseling: {
      condition: String, // kondisi/problem
      recommend: String, // saran/rekomendasi
    },
    result: String,
    intervention: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("sanitary-assesments", sanitaryAssesmentSchema);
