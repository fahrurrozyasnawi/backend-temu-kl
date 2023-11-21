const documents = require("../models/documents");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");

// Upload Image
const storage = multer.diskStorage({
  destination: "./repo/document",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 30000000 },
}).single("doc");

exports.getAll = async function (req, res, next) {
  const { type } = req.query;
  let query = {};

  if (type) {
    query = { ...query, type };
  }

  try {
    const data = await documents.find(query).sort({ _id: -1 });
    // console.log("getDocument", data);
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.getFileDownload = function (req, res, next) {
  const dirPath = "./repo/document";
  const { filename } = req.params;

  return res.download(`${dirPath}/${filename}`, filename, (err) => {
    if (err) {
      console.log("running");
      return res.status(404).json({
        message: "File tidak dapat didownload!!",
      });
    }
  });
  // try {
  //   // return res.json({ status: "success", data });
  // } catch (err) {
  //   next(err);
  // }
};

exports.getData = async function (req, res, next) {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next();
  }

  try {
    const data = await documents.findById(_id);
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  var new_data = new documents(req.body);
  console.log(new_data);

  try {
    await new_data.save();
    res.status(201).json({
      status: "success",
      message: "Document added successfully!!!",
    });
  } catch (err) {
    next(err);
    // next(err);
  }
};

exports.update = async function (req, res, next) {
  try {
    await documents.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.status(200).json({ status: "success", msg: "document created!" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    const data = await documents.findOneAndDelete({ _id: req.params._id });
    const { filename } = data;
    console.log("filename", filename);
    try {
      fs.unlinkSync(`repo/document/${filename}`);
      console.log("Succes delete file from repo");
    } catch (err) {
      console.log("Failed delete file from repo");
    }

    res.status(200).json({ status: "success", msg: "Document deleted!" });
  } catch (err) {
    next(err);
  }
};

// Upload image news
exports.upload = async (req, res, next) => {
  // console.log("req rest", req);
  upload(req, res, (err) => {
    console.log("request", req.file);
    if (err) {
      console.log("err", err);
      return res.status(500).send(err.message);
    }
    // console.log("req file", req.files);
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    res.send("File uploaded successfully!");
  });
};
