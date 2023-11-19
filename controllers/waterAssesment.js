const waterAssesment = require("../models/waterAssesment");
const mongoose = require("mongoose");
const water = require("../models/water");

exports.getAll = async function (req, res, next) {
  const { water: waterType } = req.query;
  let query = {};

  if (waterType) {
    query = { ...query, water: new mongoose.Types.ObjectId(waterType) };
  }

  try {
    const data = await waterAssesment
      .find(query)
      .sort({ _id: -1 })
      .populate("water")
      .exec();
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
    const data = await waterAssesment.findById(_id).populate("water").exec();
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  /* 
  PPSR  : 11
  PPKU  : 17
  SGLPT : 11
  SGL   : 8
  PMA   : 11 / 16 (ada penangkap)
  PPAH  : 13
   */
  const { type } = req.query;
  console.log("type", type);
  let { score } = req.body;
  score = parseInt(score);
  let status = "";

  // count score to get status for assesments
  if (type === "PPSR") {
    if (score <= 2) {
      status = "Resiko Rendah";
    } else if (score <= 5) {
      status = "Resiko Sedang";
    } else if (score <= 9) {
      status = "Resiko Tinggi";
    } else if (score <= 11) {
      status = "Resiko Amat Tinggi";
    }
  }
  if (type === "SGL") {
    if (score <= 2) {
      status = "Resiko Rendah";
    } else if (score <= 4) {
      status = "Resiko Sedang";
    } else if (score <= 6) {
      status = "Resiko Tinggi";
    } else if (score <= 8) {
      status = "Resiko Amat Tinggi";
    }
  }
  if (type === "SGLPT") {
    if (score <= 2) {
      status = "Resiko Rendah";
    } else if (score <= 5) {
      status = "Resiko Sedang";
    } else if (score <= 9) {
      status = "Resiko Tinggi";
    } else if (score <= 11) {
      status = "Resiko Amat Tinggi";
    }
  }
  if (type === "PPAH") {
    if (score <= 3) {
      status = "Resiko Rendah";
    } else if (score <= 6) {
      status = "Resiko Sedang";
    } else if (score <= 9) {
      status = "Resiko Tinggi";
    } else if (score <= 13) {
      status = "Resiko Amat Tinggi";
    }
  }
  if (type === "PPKU") {
    if (score <= 4) {
      status = "Resiko Rendah";
    } else if (score <= 9) {
      status = "Resiko Sedang";
    } else if (score <= 14) {
      status = "Resiko Tinggi";
    } else if (score <= 17) {
      status = "Resiko Amat Tinggi";
    }
  }
  if (type === "PMA") {
    const assesments = req.body.assesments;
    const isPenangkap = assesments
      ?.slice(-5)
      .some((item) => item.value === "Ya");

    if (isPenangkap) {
      if (score <= 4) {
        status = "Resiko Rendah";
      } else if (score <= 8) {
        status = "Resiko Sedang";
      } else if (score <= 12) {
        status = "Resiko Tinggi";
      } else if (score <= 16) {
        status = "Resiko Amat Tinggi";
      }
    } else {
      if (score <= 2) {
        status = "Resiko Rendah";
      } else if (score <= 5) {
        status = "Resiko Sedang";
      } else if (score <= 8) {
        status = "Resiko Tinggi";
      } else if (score <= 11) {
        status = "Resiko Amat Tinggi";
      }
    }
  }

  let new_data = new waterAssesment({ ...req.body, status: status });
  console.log(new_data);

  try {
    // set last status to tpp
    await water.findByIdAndUpdate(
      req.body.water,
      { score: req.body.score, status },
      { new: true }
    );

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
    await waterAssesment.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", msg: "data created!" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    await waterAssesment.findByIdAndDelete(req.params._id);
    res.status(200).json({ status: "success", msg: "data deleted!" });
  } catch (err) {
    next(err);
  }
};
