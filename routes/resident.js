const express = require("express");
const router = express.Router();
const resident = require("../controllers/resident");

router.get("/:_id", resident.getData);
router.get("", resident.getAll);
router.post("", resident.create);
router.put("/:_id", resident.update);
router.delete("/:_id", resident.delete);

module.exports = router;
