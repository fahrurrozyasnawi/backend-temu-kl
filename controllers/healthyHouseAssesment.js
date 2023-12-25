const healthyHouse = require("../models/healthyHouse");
const healthyHouseAssesment = require("../models/healthyHouseAssesment");
const mongoose = require("mongoose");

exports.getAll = async function (req, res, next) {
  // pagination
  const page = parseInt(req.query.pageIndex) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const { hh } = req.query;
  let query = {};

  if (hh) {
    query = { ...query, hh: new mongoose.Types.ObjectId(hh) };
  }

  try {
    const totalPages = await healthyHouseAssesment.countDocuments(query); // total items

    const data = await healthyHouseAssesment
      .find(query)
      .populate("hh")
      .skip(page * pageSize)
      .limit(pageSize);

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
    const data = await healthyHouseAssesment
      .findById(_id)
      .populate("hh")
      .exec();
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  let status = "",
    scoreAssesment = 0;
  const { type } = req.query;
  const { assesments, score } = req.body;
  const diagnoseAssesment = assesments[1].children;

  let isQ1Filled = false,
    isQ2Filled = false;
  if (type === "Jamban Keluarga") {
    scoreAssesment = score; // score assesment same with base score

    // check if question 1 and 2 is filled
    diagnoseAssesment.slice(0, 3).forEach((item, index) => {
      if (item.value === "Ya") {
        if (index === 0) {
          isQ1Filled = true;
        }
        if (index === 1) {
          isQ2Filled = true;
        }
      }
    });

    // set status
    if (score === 0) status = "Resiko Rendah";
    if (score >= 5) status = "Resiko Tinggi";
    if (score >= 1 && score <= 4) {
      if (isQ1Filled && isQ2Filled) {
        status = "Resiko Tinggi";
      } else {
        status = "Resiko Sedang";
      }
    }
  } else if (type === "Sanitasi Rumah Sehat") {
    scoreAssesment = (score / 440) * 100;
    console.log("score");
    // set status
    switch (true) {
      case scoreAssesment < 40:
        status = "Tidak Baik";
        break;
      case scoreAssesment < 56:
        status = "Kurang Baik";
        break;
      case scoreAssesment < 76:
        status = "Cukup";
        break;
      default:
        status = "Baik";
        break;
    }
  }

  let new_data = new healthyHouseAssesment({
    ...req.body,
    status,
    scoreAssesment,
  });
  console.log(new_data);

  try {
    // update healthy house parent status & score
    const { hh } = req.body;
    await healthyHouse.findByIdAndUpdate(hh, {
      $set: { status, score: scoreAssesment },
    });

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
    await healthyHouseAssesment.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", msg: "data created!" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    await healthyHouseAssesment.findByIdAndDelete(req.params._id);
    res.status(200).json({ status: "success", msg: "data deleted!" });
  } catch (err) {
    next(err);
  }
};
