const tfuAssesment = require("../models/tfuAssesment");
const mongoose = require("mongoose");

exports.getAll = async function (req, res, next) {
  // pagination
  const page = parseInt(req.query.pageIndex) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const { tfu, search, query: by } = req.query;
  let query = {};

  if (tfu) {
    query = { ...query, tfu: new mongoose.Types.ObjectId(tfu) };
  }

  if (search && by) {
    query = { ...query, [by]: { $regex: new RegExp(search, "i") } };
  }

  try {
    const totalPages = await tfuAssesment.countDocuments(query); // total items

    const data = await tfuAssesment
      .find(query)
      .populate("tfu")
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
    const data = await tfuAssesment.findById(_id).populate("tfu").exec();
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  const dataLength = await tfuAssesment.countDocuments({
    tfu: new mongoose.Types.ObjectId(req.body.tfu),
  });
  // console.log("tfu", req.body.tfu);
  req.body.step = dataLength + 1; // add step
  // const { type } = req.query;
  // let scoreAssesment = 0,
  // status = "Tidak memenuhi syarat";
  // const { score } = req.body;

  // calculate score with formula given
  // switch (type) {
  //   case "Gereja":
  //     scoreAssesment = score * 12;
  //     break;
  // }

  // set status
  /*
    If score >=75 it will be 'Memenuhi Syarat' 
   */
  // if (scoreAssesment >= 75) {
  // }

  let new_data = new tfuAssesment(req.body);
  // console.log(new_data);

  // return res.status(200);
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
    await tfuAssesment.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", msg: "data created!" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    await tfuAssesment.findByIdAndDelete(req.params._id);
    res.status(200).json({ status: "success", msg: "data deleted!" });
  } catch (err) {
    next(err);
  }
};
