const tpp = require("../models/tpp");
const mongoose = require("mongoose");

exports.getAll = async function (req, res, next) {
  // pagination
  const page = parseInt(req.query.pageIndex) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // queries
  const { search, query: by } = req.query;

  let query = {};

  if (search && by) {
    query = {
      ...query,
      [by]: { $regex: new RegExp(search, "i") },
    };
  }

  try {
    const totalPages = await tpp.countDocuments(query); // total items

    const data = await tpp
      .find(query)
      .skip(page * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 });

    res.json({ status: "success", data, totalPages });
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
    const data = await tpp.findById(_id);
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  let new_data = new tpp(req.body);
  console.log(new_data);

  try {
    await new_data.save();
    res.status(201).json({
      status: "success",
      message: "data added successfully!!!",
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async function (req, res, next) {
  try {
    await tpp.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.status(200).json({ status: "success", msg: "data created!" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    await tpp.findByIdAndDelete(req.params._id);
    res.status(200).json({ status: "success", msg: "data deleted!" });
  } catch (err) {
    next(err);
  }
};
