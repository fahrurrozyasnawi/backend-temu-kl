const express = require("express");
const router = express.Router();
const sanitary = require("../controllers/sanitary");

router.get("/:_id", sanitary.getData);
router.get("", sanitary.getAll);
router.post("", sanitary.create);
router.put("/:_id", sanitary.update);
router.delete("/:_id", sanitary.delete);

module.exports = router;
