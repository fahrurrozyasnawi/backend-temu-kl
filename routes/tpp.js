const express = require("express");
const router = express.Router();
const tpp = require("../controllers/tpp");

router.get("/:_id", tpp.getData);
router.get("", tpp.getAll);
router.post("", tpp.create);
router.put("/:_id", tpp.update);
router.delete("/:_id", tpp.delete);

module.exports = router;
