const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const areaCodeSchema = new Schema({
  kode: String,
  nama: String,
});
module.exports = mongoose.model("areacodes", areaCodeSchema);
