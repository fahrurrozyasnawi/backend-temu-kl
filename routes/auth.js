const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
// router.get('/cek', auth.check);
router.post("/login", auth.login);
// router.post('/refresh', auth.refreshToken);
// router.post('/verifyToken', auth.verifyToken);
module.exports = router;
