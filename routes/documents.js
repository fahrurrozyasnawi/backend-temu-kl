const express = require("express");
const router = express.Router();
const documents = require("../controllers/documents");

router.get("/:_id", documents.getData);
router.get("", documents.getAll);
router.post("", documents.create);
router.put("/:_id", documents.update);
router.delete("/:_id", documents.delete);
router.post("/upload", documents.upload);

module.exports = router;
