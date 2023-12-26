const tpps = require("../models/tpp");
const tppAssesment = require("../models/tppAssesment");

const mongoose = require("mongoose");

exports.getAll = async function (req, res, next) {
  // pagination
  const page = parseInt(req.query.pageIndex) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const { sentraType, tpp, search, query: by } = req.query;
  let query = {};

  if (tpp) {
    query = { ...query, tpp: new mongoose.Types.ObjectId(tpp) };
  }

  if (sentraType) {
    query = { ...query, sentraType };
  }

  if (search && by) {
    query = { ...query, [by]: { $regex: new RegExp(search, "i") } };
  }

  try {
    const totalPages = await tppAssesment.countDocuments(query); // total items

    const data = await tppAssesment
      .find(query)
      .populate("tpp")
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
    const data = await tppAssesment.findById(_id).populate("tpp").exec();
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

exports.create = async function (req, res, next) {
  let scoreAssesment = 0,
    status = "Tidak Memenuhi Syarat";
  const { tppType } = req.query;
  const { score, tpp } = req.body;

  // count score assemesment with formula given
  switch (tppType) {
    case "Depot":
      scoreAssesment = 100 - (score / 165) * 100;
      break;
    case "Gerai Pangan Jajanan":
      scoreAssesment = 100 - (score / 83) * 100;
      break;
    case "Sentra Pangan Jajanan":
      const { sentraType } = req.body;

      if (sentraType === "booth") {
        scoreAssesment = 100 - (score / 170) * 100;
      }

      if (sentraType === "owner") {
        scoreAssesment = 100 - (score / 52) * 100;
      }

      console.log("score final", scoreAssesment);
      break;
    case "Jasa Boga":
      const { typeCook } = req.body;

      switch (typeCook) {
        case "A":
          scoreAssesment = 100 - (score / 355) * 100;
          break;
        case "B":
          scoreAssesment = 100 - (score / 410) * 100;
          break;
        case "C":
          scoreAssesment = 100 - (score / 414) * 100;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }

  // set status
  if (scoreAssesment >= 70) {
    status = "Memenuhi Syarat";
  }

  let new_data = new tppAssesment({ ...req.body, scoreAssesment, status });
  console.log(new_data);

  // try {
  //   console.log("tpp", tpp);
  //   await tpp.findByIdAndUpdate(tpp, { score }, { new: true });
  // } catch (error) {
  //   next(error);
  // }

  try {
    // set last status to tpp
    await tpps.findByIdAndUpdate(tpp, { score, status }, { new: true });
    await new_data.save();

    /* 
      set status for 'Sentra Pangan Jananan' assesments 
      if the all the booth is "Memenuhi Syarat", the status
      will be also "Memenuhi Syarat" for parent assesments.
      If there's one booth is "Tidak Memenuhi Syarat", status
      will be "Tidak Memenuhi Syarat" for the parent assesments
     */
    if (tppType === "Sentra Pangan Jajanan") {
      const { sentraType, sentraParent } = req.body;

      if (sentraType === "booth") {
        const dataSentraBooth = await tppAssesment.find(
          { sentraParent },
          { scoreAssesment: 1, status: 1 }
        );

        if (
          dataSentraBooth.includes((i) => i.status === "Tidak Memenuhi Syarat")
        ) {
          status = "Tidak Memenuhi Syarat";
        }
        // reset status for parent assesments
        await tppAssesment.findByIdAndUpdate(
          sentraParent,
          { status },
          { new: true }
        );
        await tpps.findByIdAndUpdate(tpp, { status }, { new: true });
      }
    }

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
    await tppAssesment.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", msg: "data created!" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    await tppAssesment.findByIdAndDelete(req.params._id);
    res.status(200).json({ status: "success", msg: "data deleted!" });
  } catch (err) {
    next(err);
  }
};
