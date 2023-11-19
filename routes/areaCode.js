const express = require("express");
const router = express.Router();
const areaCode = require("../controllers/areaCode");

router.get("/", areaCode.get_data);

module.exports = router;
