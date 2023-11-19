const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const TPPSchema = new Schema(
  {
    name: String,
    type: String, // jenis (Depot, Gerai pangan, dll)
    address: String,
    addressData: Object,
    owner: String, // pengelola/pemilik/penanggung jawab
    nHandler: String, // jumlah penjamah pangan

    // gerai pangan
    NIB: String, // nomor induk berusaha (gerai pangan jajanan)
    reviewer: String,
    menuRisk: String, // menu pangan berisiko yang dijual

    // sentra pangan jajanan
    nBooth: Number, // jumlah gerai
    boothData: Array, // data gerai

    // jasa boga
    businessNum: String,
    typeCatering: String,

    startDate: Date,
    location: String, // lokasi/tempat sumber air baku
    buildingArea: String,
    assesmentDate: Date,
    nSale: Number, // jumlah  yang dijual per hari
    nDaysSale: Number, // jumlah hari berjualan

    // score
    score: Number,

    status: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("tpps", TPPSchema);
