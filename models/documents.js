const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const DocumentsSchema = new Schema(
  {
    name: String,
    filename: String,
    type: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("documents", DocumentsSchema);
