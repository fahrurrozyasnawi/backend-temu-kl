const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const waterSchema = new Schema(
  {
    name: String, // nama pengelola SAM
    legality: String,
    letterNum: String,
    address: String,
    phone: String,
    eventCode: String,
    province: Object,
    region: Object,
    district: Object,
    ward: Object,
    class: String,
    headWard: String,
    phoneHeadWard: String,
    isPersonQC: String, // tersedia pengawas internal kualitas air minum
    trainingStatus: String, // pelatihan pengawas internal kualitas air minum
    waterSource: {
      name: String,
      mediumType: String,
      condition: String,
      waterPipe: String, //sambungan air ke rumah
      timeOp: String,
      serviceTarget: String,
    },
    nInstallation: {
      ipa: String,
      reservoir: String,
    },
    nPopulate: {
      num: Number,
      populateType: String,
    },
    nCust: {
      num: Number,
      populateType: String,
    },
    scope: {
      ward: Number,
      district: Number,
      region: Number,
      province: Number,
    },
    isManagementRate: String,
    rates: String,
    maintenance: String,

    // inspeksi
    type: String, // jenis air
    temperature: String,
    precipitation: String,
    year: Number, // tahun konstruksi
    isFloodPlace: {
      value: String,
      reason: String,
    },
    waterAvailable: {
      value: String,
      reason: String,
    },
    loc: {
      lu: String,
      ls: String,
    },

    // ppsr
    techUsed: {
      // teknologi penerapan air
      value: String,
      method: Array,
    },
    otherMethod: String,

    // get from assesments
    status: String,
    score: Number,
  },
  {
    timestamps: true,
  }
);

// waterSchema.index({ geoLocation: "2dsphere" });

module.exports = mongoose.model("waters", waterSchema);
