const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const PuskesmasSchema = new Schema(
  {
    name: String,
    province: Object,
    region: Object,
    district: Object,
    ward: Object, // kelurahan
    code: String, // kode puskesmas
    type: Number,
    serialNum: Number, // no urut
    village: String,
    street: String,
    num: Number,
    nbAssociate: String, // rt
    ctAssociate: String, // rw
    posCode: String, //kode pos
    phone: String,
    fax: String,
    year: String,
    email: String,
    cp: String, // contact person
    status: String, // status pemekaran
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("puskesmas", PuskesmasSchema);
