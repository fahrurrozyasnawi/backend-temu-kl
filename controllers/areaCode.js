const areaCode = require("../models/areaCode");

// exports.getAll = function (req, res, next) {
//   areaCode.find({}, (err, data) => {
//     if (err) {
//       next(err);
//     } else {
//       res.json(data);
//     }
//   });
// };

exports.get_data = async function (req, res, next) {
  const { level, parent, kode } = req.query;
  let query = {};

  if (kode) {
    query = { ...query, kode };
  }

  if (level === "1") {
    // Provinsi
    query = { ...query, lengthStr: 2 };
  }
  if (level === "2") {
    // Kabupaten
    query = { ...query, lengthStr: 5 };
    if (parent) {
      query = { ...query, kode: { $regex: new RegExp("^" + parent) } };
    }
  }
  if (level === "3") {
    // Kecamatan
    query = { ...query, lengthStr: 8 };
    if (parent) {
      query = { ...query, kode: { $regex: new RegExp("^" + parent) } };
    }
  }
  if (level === "4") {
    // Kelurahan
    query = { ...query, lengthStr: { $gte: 13 } };
    if (parent) {
      query = { ...query, kode: { $regex: new RegExp("^" + parent) } };
    }
  }
  // console.log("query", query);
  try {
    const data = await areaCode
      .aggregate([
        { $addFields: { lengthStr: { $strLenCP: "$kode" } } },
        {
          $match: query,
        },
      ])
      .sort({ nama: 1 });

    res.json({ msg: "success", data });
  } catch (error) {
    next(error);
  }
};
