const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const ResidentSchema = new Schema(
  {
    name: String,
    idNum: Number, // nik
    village: String,
    age: {
      ageValue: Number,
      ageType: String, // Bulan, Tahun
    },
    address: {
      street: String,
      nbAssociate: String, // rt
      ctAssociate: String, // rw
      province: Object,
      region: Object,
      district: Object,
      ward: Object, // kelurahan
    },
    posCode: String, //kode pos
    phone: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("residents", ResidentSchema);
