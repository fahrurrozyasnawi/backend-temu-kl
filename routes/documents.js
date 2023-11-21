const express = require("express");
const { verifyToken } = require("../controllers/auth");
const router = express.Router();
const documents = require("../controllers/documents");

router.get("/:_id", verifyToken, documents.getData);
router.get("", verifyToken, documents.getAll);
router.post("", verifyToken, documents.create);
router.put("/:_id", verifyToken, documents.update);
router.delete("/:_id", verifyToken, documents.delete);
router.get("/download/:filename", documents.getFileDownload);
router.post("/upload", verifyToken, documents.upload);

module.exports = router;
