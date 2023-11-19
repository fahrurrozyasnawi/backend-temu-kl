const express = require("express");
const router = express.Router();
const reports = require("../controllers/reports");

router.get("/:_id", reports.getData);
router.get("", reports.getAll);
router.post("", reports.create);
router.put("/:_id", reports.update);
router.delete("/:_id", reports.delete);

module.exports = router;
