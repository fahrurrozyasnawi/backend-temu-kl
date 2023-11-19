const express = require("express");
const router = express.Router();
const sanitaryAssesment = require("../controllers/sanitaryAssesment");

router.get("/:_id", sanitaryAssesment.getData);
router.get("", sanitaryAssesment.getAll);
router.post("", sanitaryAssesment.create);
router.put("/:_id", sanitaryAssesment.update);
router.delete("/:_id", sanitaryAssesment.delete);

module.exports = router;
