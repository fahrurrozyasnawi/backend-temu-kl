const users = require("../models/users");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const mongoose = require("mongoose");

// Upload Image
const storage = multer.diskStorage({
  destination: "./repo/user",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 30000000 },
}).single("picture");

exports.getAll = async function (req, res, next) {
  const { name, username } = req.query;
  let query = {};

  if (name) {
    query = { ...query, name };
  }
  if (username) {
    query = { ...query, username };
  }

  try {
    const data = await users
      .find(query)
      .populate("puskesmas")
      .sort({ _id: -1 })
      .select("-password");
    console.log("getUser", data);
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.getData = async function (req, res, next) {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next();
  }

  try {
    const data = await users
      .findById(_id)
      .populate("puskesmas")
      .select("-password");
    console.log("getUser", data);
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.register = async function (req, res, next) {
  console.log("data", req.body);
  var new_data = new users(req.body);
  console.log(new_data);

  try {
    await new_data.save();
    res.status(201).json({
      status: "success",
      message: "User added successfully!!!",
    });
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(403)
        .json({ status: "error", msg: "User already exists!" });

    next(err);
    // next(err);
  }
};

exports.changePassword = async function (req, res, next) {
  const { username, password, newPassword } = req.body;

  try {
    const dataUser = await users.findOne({ username });

    if (dataUser) {
      if (bcrypt.compareSync(password, dataUser.password)) {
        try {
          // hash a new pwd
          const newPasswordHash = bcrypt.hashSync(newPassword, 10);

          await users.findOneAndUpdate(
            { _id: dataUser._id },
            { $set: { password: newPasswordHash } },
            { new: true }
          );
          res.status(201).json({
            status: "success",
            msg: "Success change passowrd",
          });
        } catch (err2) {
          next(err2);
        }
      } else {
        res.status(401).json({ status: "error", msg: "Password not match" });
      }
    } else {
      res.status(401).json({ status: "error", msg: "Invalid Username" });
    }
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  try {
    await users.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.status(200).json({ status: "success", msg: "profile created!" });
  } catch (err) {
    next(err);
  }
};

exports.update = async function (req, res, next) {
  console.log("data", req.body);
  try {
    await users.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.status(200).json({ status: "success", msg: "profile created!" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    await users.findByIdAndDelete(req.params._id);
    res.status(200).json({ status: "success", msg: "User deleted!" });
  } catch (err) {
    next(err);
  }
};

// Upload image news
exports.upload = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // console.log("req file", req.files);
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    res.send("File uploaded successfully!");
  });
};
