const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.get("/:_id", users.getData);
router.get("", users.getAll);
router.post("", users.register);
router.post("/password", users.changePassword);
router.put("/:_id", users.update);
router.delete("/:_id", users.delete);
router.post("/upload", users.upload);
module.exports = router;
