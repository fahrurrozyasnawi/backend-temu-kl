const express = require("express");
const router = express.Router();
const healthyHouse = require("../controllers/healthyHouse");

router.get("/:_id", healthyHouse.getData);
router.get("", healthyHouse.getAll);
router.post("", healthyHouse.create);
router.put("/:_id", healthyHouse.update);
router.delete("/:_id", healthyHouse.delete);

module.exports = router;
