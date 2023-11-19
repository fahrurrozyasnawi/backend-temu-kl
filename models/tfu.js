const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const TFUSchema = new Schema(
  {
    name: String,
    desc: String,
    province: Object,
    region: Object, //kab
    district: Object,
    ward: Object, // kelurahan
    area: String, // area/puskesmas
    areaId: Schema.Types.ObjectId, // puskesmas,
    puskesmas: {
      type: Schema.Types.ObjectId,
      ref: "puskesmas",
    },
    address: String,
    type: String, // jenis tfu
    kum: String, // kriteria umum minimal
    status: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("tfus", TFUSchema);
