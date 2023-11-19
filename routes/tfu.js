const express = require("express");
const router = express.Router();
const tfu = require("../controllers/tfu");

router.get("/:_id", tfu.getData);
router.get("", tfu.getAll);
router.post("", tfu.create);
router.put("/:_id", tfu.update);
router.delete("/:_id", tfu.delete);

module.exports = router;
