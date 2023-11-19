const jwt = require("jsonwebtoken");
const axios = require("axios");

// middleware untuk memverifikasi access token
const _authentication = async (req, res, next, uriAuth) => {
  const token = req.headers.authorization.replace(/^Bearer\s+/, "");
  try {
    const resAuth = await axios.post(
      uriAuth,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (resAuth.status == 200) {
      next();
    } else {
      res.status(resAuth.status).json({ message: resAuth.status.message });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authentication = async (req, res, next, uriAuth) => {
  const token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    const _token = token.split(" ")[1];
    req.token = _token;
  } else {
    res.status(401).json({ msg: "Invalid Token" });
  }
};

module.exports = {
  authentication,
};
