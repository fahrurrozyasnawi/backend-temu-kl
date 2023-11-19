const express = require("express");
const router = express.Router();
const tppAssesment = require("../controllers/tppAssesment");

router.get("/:_id", tppAssesment.getData);
router.get("", tppAssesment.getAll);
router.post("", tppAssesment.create);
router.put("/:_id", tppAssesment.update);
router.delete("/:_id", tppAssesment.delete);

module.exports = router;
