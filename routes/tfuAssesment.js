const express = require("express");
const router = express.Router();
const tfuAssesment = require("../controllers/tfuAssesment");

router.get("/:_id", tfuAssesment.getData);
router.get("", tfuAssesment.getAll);
router.post("", tfuAssesment.create);
router.put("/:_id", tfuAssesment.update);
router.delete("/:_id", tfuAssesment.delete);

module.exports = router;
