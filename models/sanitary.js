const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const sanitarySchema = new Schema(
  {
    // status
    govermentState: Object,
    district: Object,
    healthPublic: {
      type: Schema.Types.ObjectId,
      ref: "puskesmas",
    },

    // status card
    registerNum: String,
    name: String,
    familyName: String,
    gender: String,
    age: {
      value: Number,
      ageType: String,
    },
    job: String,
    address: {
      name: String,
      hamlet: String,
      nbAssociate: String, // rt
      ctAssociate: String, // rw
      ward: Object,
    },
    class: {
      value: String,
      other: String,
    }, // Golongan (Umum, Askes, dll)

    // status from assesments
    status: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("sanitaries", sanitarySchema);
