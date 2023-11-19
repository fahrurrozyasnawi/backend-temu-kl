const express = require("express");
const router = express.Router();
const puskesmas = require("../controllers/puskesmas");

router.get("/:_id", puskesmas.getData);
router.get("", puskesmas.getAll);
router.post("", puskesmas.create);
router.put("/:_id", puskesmas.update);
router.delete("/:_id", puskesmas.delete);

module.exports = router;
