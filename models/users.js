const mongoose = require("mongoose");
const puskesmas = require("./puskesmas");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    province: Object,
    region: Object,
    district: Object,
    ward: Object, // kelurahan
    picture: String,
    level: String, // user access
    signIn: Date,
    puskesmas: {
      type: Schema.Types.ObjectId,
      ref: "puskesmas",
    }, // Area/Puskesmas
    area: String, // Area User
    status: String,
    permissions: Array,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("users", UserSchema);
