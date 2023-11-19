const express = require("express");
const router = express.Router();
const waterAssesment = require("../controllers/waterAssesment");

router.get("/:_id", waterAssesment.getData);
router.get("", waterAssesment.getAll);
router.post("", waterAssesment.create);
router.put("/:_id", waterAssesment.update);
router.delete("/:_id", waterAssesment.delete);

module.exports = router;
