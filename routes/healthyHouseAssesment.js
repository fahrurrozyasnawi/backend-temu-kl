const express = require("express");
const router = express.Router();
const healthyHouseAssesment = require("../controllers/healthyHouseAssesment");

router.get("/:_id", healthyHouseAssesment.getData);
router.get("", healthyHouseAssesment.getAll);
router.post("", healthyHouseAssesment.create);
router.put("/:_id", healthyHouseAssesment.update);
router.delete("/:_id", healthyHouseAssesment.delete);

module.exports = router;
