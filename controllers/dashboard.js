const puskesmasModel = require("../models/puskesmas");
const tfuModel = require("../models/tfu");
const tfuAssesmentModel = require("../models/tfuAssesment");
const tppModel = require("../models/tpp");
const tppAssesmentModel = require("../models/tppAssesment");
const sanitaryModel = require("../models/sanitary");
const sanitaryAssesmentModel = require("../models/sanitaryAssesment");
const waterModel = require("../models/water");
const waterAssesmentModel = require("../models/waterAssesment");
const healthyHouseModel = require("../models/healthyHouse");
const healthyHouseAssesmentModel = require("../models/healthyHouseAssesment");

exports.getAll = async function (req, res, next) {
  try {
    // tfu
    const totalTFU = await tfuModel.countDocuments();
    const totalSyarat = await tfuModel.countDocuments({
      status: "Memenuhi Syarat",
    });
    const totalNonSyarat = await tfuModel.countDocuments({
      status: "Tidak Memenuhi Syarat",
    });
    const totalIKLTFU = await tfuModel
      .aggregate([
        {
          $lookup: {
            from: "tfu-assesments",
            let: {
              tfuId: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$tfu", "$$tfuId"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "assesments",
          },
        },
        {
          $match: {
            assesments: {
              $gte: [
                {
                  $size: "$assesments",
                },
                1,
              ],
            },
          },
        },
      ])
      .count("total");
    let tfuBarChartData = await tfuModel.aggregate([
      {
        $lookup: {
          from: "tfu-assesments",
          let: {
            tfu: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$tfu", "$$tfu"],
                },
              },
            },
          ],
          as: "assesments",
        },
      },
      // {
      //   $unwind: {
      //     path: "$assesments",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $group: {
          _id: "$type",
          // assesments: {
          //   $push: "$assesments",
          // },
          total: {
            $count: {},
          },
          syarat: {
            $sum: {
              $cond: [
                {
                  $eq: ["$assesments.status", "Memenuhi Syarat"],
                },
                1,
                0,
              ],
            },
          },
          nonSyarat: {
            $sum: {
              $cond: [
                {
                  $eq: ["$assesments.status", "Tidak Memenuhi Syarat"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: 1,
          label: {
            $push: "$_id",
          },
          total: {
            $push: "$total",
          },
          syarat: {
            $push: "$syarat",
          },
          nonSyarat: {
            $push: "$nonSyarat",
          },
        },
      },
    ]);

    tfuBarChartData = {
      label: tfuBarChartData[0]?.label || [],
      data: [
        { name: "Total TFU", data: tfuBarChartData[0]?.total || [0] },
        { name: "Memenuhi Syarat", data: tfuBarChartData[0]?.syarat || [0] },
        {
          name: "Tidak Memenuhi Syarat",
          data: tfuBarChartData[0]?.nonSyarat || [0],
        },
      ],
    };

    // tpp
    const totalTPP = await tppModel.countDocuments();
    const totalSyaratTPP = await tppModel.countDocuments({
      status: "Memenuhi Syarat",
    });
    const totalNonSyaratTPP = await tppModel.countDocuments({
      status: "Tidak Memenuhi Syarat",
    });
    const totalIKLTPP = await tppModel
      .aggregate([
        {
          $lookup: {
            from: "tpp-assesments",
            let: {
              tppId: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$tpp", "$$tppId"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "assesments",
          },
        },
        {
          $match: {
            assesments: {
              $gte: [
                {
                  $size: "$assesments",
                },
                1,
              ],
            },
          },
        },
      ])
      .count("total");
    let tppBarChartData = await tppModel.aggregate([
      {
        $lookup: {
          from: "tpp-assesments",
          let: {
            tpp: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$tpp", "$$tpp"],
                },
              },
            },
          ],
          as: "assesments",
        },
      },
      // {
      //   $unwind: {
      //     path: "$assesments",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $group: {
          _id: "$type",
          // assesments: {
          //   $push: "$assesments",
          // },
          total: {
            $count: {},
          },
          syarat: {
            $sum: {
              $cond: [
                {
                  $eq: ["$assesments.status", "Memenuhi Syarat"],
                },
                1,
                0,
              ],
            },
          },
          nonSyarat: {
            $sum: {
              $cond: [
                {
                  $eq: ["$assesments.status", "Tidak Memenuhi Syarat"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: 1,
          label: {
            $push: "$_id",
          },
          total: {
            $push: "$total",
          },
          syarat: {
            $push: "$syarat",
          },
          nonSyarat: {
            $push: "$nonSyarat",
          },
        },
      },
    ]);

    tppBarChartData = {
      label: tppBarChartData[0]?.label || [],
      data: [
        { name: "Total TPP", data: tppBarChartData[0]?.total || [0] },
        { name: "Memenuhi Syarat", data: tppBarChartData[0]?.syarat || [0] },
        {
          name: "Tidak Memenuhi Syarat",
          data: tppBarChartData[0]?.nonSyarat || [0],
        },
      ],
    };

    // water
    const totalWater = await waterModel.countDocuments();
    const totalLRiskWater = await waterModel.countDocuments({
      status: "Resiko Rendah",
    });
    const totalMRiskWater = await waterModel.countDocuments({
      status: "Resiko Sedang",
    });
    const totalHRiskWater = await waterModel.countDocuments({
      status: "Resiko Tinggi",
    });
    const totalSHRiskWater = await waterModel.countDocuments({
      status: "Resiko Amat Tinggi",
    });
    const totalIKLWater = await waterModel
      .aggregate([
        {
          $lookup: {
            from: "water-assesments",
            let: {
              waterId: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$water", "$$waterId"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "assesments",
          },
        },
        {
          $match: {
            assesments: {
              $gte: [
                {
                  $size: "$assesments",
                },
                1,
              ],
            },
          },
        },
      ])
      .count("total");
    let waterBarChartData = await waterModel.aggregate([
      // {
      //   $lookup: {
      //     from: "water-assesments",
      //     let: {
      //       water: "$_id",
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $eq: ["$water", "$$water"],
      //           },
      //         },
      //       },
      //     ],
      //     as: "assesments",
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$assesments",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $group: {
          _id: "$type",
          // assesments: {
          //   $push: "$assesments",
          // },
          total: {
            $count: {},
          },
          rendah: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Resiko Rendah"],
                },
                1,
                0,
              ],
            },
          },
          sedang: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Resiko Sedang"],
                },
                1,
                0,
              ],
            },
          },
          tinggi: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Resiko Tinggi"],
                },
                1,
                0,
              ],
            },
          },
          amatTinggi: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Resiko Amat Tinggi"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: 1,
          label: {
            $push: "$_id",
          },
          total: {
            $push: "$total",
          },
          rendah: {
            $push: "$rendah",
          },
          sedang: {
            $push: "$sedang",
          },
          tinggi: {
            $push: "$tinggi",
          },
          amatTinggi: {
            $push: "$amatTinggi",
          },
        },
      },
    ]);

    waterBarChartData = {
      label: waterBarChartData[0]?.label || [],
      data: [
        {
          name: "Total Penyehatan Air",
          data: waterBarChartData[0]?.total || 0,
        },
        { name: "Resiko Rendah", data: waterBarChartData[0]?.rendah || [0] },
        { name: "Resiko Sedang", data: waterBarChartData[0]?.sedang || [0] },
        { name: "Resiko Tinggi", data: waterBarChartData[0]?.tinggi || [0] },
        {
          name: "Resiko Amat Tinggi",
          data: waterBarChartData[0]?.amatTinggi || [0],
        },
      ],
    };

    // tpp
    const totalHH = await healthyHouseModel.countDocuments();
    const totalSyaratHH = await healthyHouseModel.countDocuments({
      status: { $in: ["Resiko Rendah", "Cukup", "Baik"] },
    });
    const totalNonSyaratHH = await healthyHouseModel.countDocuments({
      status: {
        $in: ["Resiko Sedang", "Resiko Tinggi", "Tidak Baik", "Kurang Baik"],
      },
    });
    const totalIKLHH = await healthyHouseModel
      .aggregate([
        {
          $lookup: {
            from: "hh-assesments",
            let: {
              hhId: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$hh", "$$hhId"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "assesments",
          },
        },
        {
          $match: {
            assesments: {
              $gte: [
                {
                  $size: "$assesments",
                },
                1,
              ],
            },
          },
        },
      ])
      .count("total");
    let healthyHouseBarChartData = await healthyHouseModel.aggregate([
      {
        $group: {
          _id: "$type",

          total: {
            $count: {},
          },
          syarat: {
            $sum: {
              $cond: [
                {
                  $in: ["$status", ["Resiko Rendah", "Cukup", "Baik"]],
                },
                1,
                0,
              ],
            },
          },
          nonSyarat: {
            $sum: {
              $cond: [
                {
                  $in: [
                    "$status",
                    [
                      "Resiko Sedang",
                      "Resiko Tinggi",
                      "Kurang Baik",
                      "Tidak Baik",
                    ],
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: 1,
          label: {
            $push: "$_id",
          },
          total: {
            $push: "$total",
          },
          syarat: {
            $push: "$syarat",
          },
          nonSyarat: {
            $push: "$nonSyarat",
          },
        },
      },
    ]);

    healthyHouseBarChartData = {
      label: healthyHouseBarChartData[0]?.label || [],
      data: [
        {
          name: "Total Penyehatan Rumah",
          data: healthyHouseBarChartData[0]?.total || [0],
        },
        {
          name: "Memenuhi Syarat",
          data: healthyHouseBarChartData[0]?.syarat || [0],
        },
        {
          name: "Tidak Memenuhi Syarat",
          data: healthyHouseBarChartData[0]?.nonSyarat || [0],
        },
      ],
    };

    // sanitary
    const totalSanitary = await sanitaryModel.countDocuments();
    const totalSanitaryByType = await sanitaryAssesmentModel.countDocuments();
    const totalSanitaryCounseling = await sanitaryAssesmentModel.countDocuments(
      { isHaveCounseling: true }
    );
    let sanitaryBarChartData = await sanitaryAssesmentModel.aggregate([
      {
        $lookup: {
          from: "sanitaries",
          localField: "sanitary",
          foreignField: "_id",
          as: "sanitary",
        },
      },
      // {
      //   $unwind: {
      //     path: "$sanitary",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $group: {
          _id: "$type",
          total: {
            $count: {},
          },
        },
      },
      {
        $group: {
          _id: 1,
          label: {
            $push: "$_id",
          },
          total: {
            $push: "$total",
          },
        },
      },
    ]);

    console.log("data chart", sanitaryBarChartData);
    sanitaryBarChartData = {
      label: sanitaryBarChartData[0]?.label || [],
      data: [{ name: "Total", data: sanitaryBarChartData[0]?.total || [0] }],
    };

    // summary data
    const data = {
      tfu: {
        totalTFU,
        totalIKLTFU: totalIKLTFU[0]?.total || 0,
        syarat: totalSyarat,
        nonSyarat: totalNonSyarat,
        chartData: tfuBarChartData,
      },
      tpp: {
        totalTPP,
        totalIKLTPP: totalIKLTPP[0]?.total || 0,
        syarat: totalSyaratTPP,
        nonSyarat: totalNonSyaratTPP,
        chartData: tppBarChartData,
      },
      sanitary: {
        totalSanitary,
        byType: totalSanitaryByType,
        byCounseling: totalSanitaryCounseling,
        chartData: sanitaryBarChartData,
      },
      hh: {
        totalHH,
        totalIKLHH: totalIKLHH[0]?.total || 0,
        syarat: totalSyaratHH,
        nonSyarat: totalNonSyaratHH,
        chartData: healthyHouseBarChartData,
      },
      water: {
        totalWater,
        totalIKLWater: totalIKLWater[0]?.total || 0,
        resiko: {
          rendah: totalLRiskWater,
          sedang: totalMRiskWater,
          tinggi: totalHRiskWater,
          amatTinggi: totalSHRiskWater,
        },
        chartData: waterBarChartData,
      },
    };
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};
