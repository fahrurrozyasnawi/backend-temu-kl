const reportModel = require("../models/reports");
const tfuModel = require("../models/tfu");
const tppModel = require("../models/tpp");
const waterModel = require("../models/water");
const sanitaryModel = require("../models/sanitary");
const mongoose = require("mongoose");

exports.getAll = async function (req, res, next) {
  const { type } = req.query;
  let query = {};

  if (type) {
    query = { ...query, type };
  }
  try {
    const data = await reportModel.find(query).sort({ _id: -1 });
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.getData = async function (req, res, next) {
  const { _id } = req.params;
  const { puskesmas } = req.query;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next();
  }

  try {
    const data = await reportModel.findById(_id);
    let dataPrintable = null;
    const { type, report } = data;

    if (type === "tfu") {
      const { period } = report;
      dataPrintable = await tfuModel.find();
    }

    if (type === "tpp") {
      const { period, province, region, ward, district } = report;
      let query = {};

      if (province) {
        query = { ...query, "tpp.addressData.province.kode": province };
      }
      if (region) {
        query = { ...query, "tpp.addressData.region.kode": region };
      }
      if (district) {
        query = { ...query, "tpp.addressData.district.kode": district };
      }
      if (ward) {
        query = { ...query, "tpp.addressData.ward.kode": ward };
      }

      // dataPrintable = tppModel.aggregate([
      //   {

      //   }
      // ])
    }

    res.json({ status: "success", data: dataPrintable });
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  let new_data = new reportModel(req.body);
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
    await reportModel.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", msg: "data created!" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    await reportModel.findByIdAndDelete(req.params._id);
    res.status(200).json({ status: "success", msg: "data deleted!" });
  } catch (err) {
    next(err);
  }
};
