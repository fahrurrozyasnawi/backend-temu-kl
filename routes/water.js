const express = require("express");
const router = express.Router();
const water = require("../controllers/water");

router.get("/:_id", water.getData);
router.get("", water.getAll);
router.post("", water.create);
router.put("/:_id", water.update);
router.delete("/:_id", water.delete);

module.exports = router;
