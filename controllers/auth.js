const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcryptjs");
const users = require("../models/users");

const generateToken = (username, userAccess, secretKey) => {
  const token = jwt.sign({ username, userAccess }, secretKey, {
    expiresIn: "1d",
  });
  return token;
};

exports.login = function (req, res, next) {
  const { username, password } = req.body;
  const secretKey = req.app.get("secretKey");

  users
    .findOne({ username })
    .then((userInfo) => {
      if (userInfo) {
        if (bcrypt.compareSync(password, userInfo.password)) {
          if (userInfo.status === "active") {
            const token = generateToken(
              // userInfo._id,
              userInfo.username,
              userInfo.level,
              secretKey
            );

            res.status(200).json({
              status: "success",
              msg: "sign in success!!",
              // id: userInfo._id,
              token: token,
            });
          } else {
            res
              .status(401)
              .json({ status: "error", msg: "Your account is deactivated" });
          }
        } else {
          res.status(403).json({ status: "error", msg: "Invalid Password" });
        }
      } else {
        res.status(401).json({ status: "error", msg: "Invalid Username" });
      }
    })
    .catch((err) =>
      res.status(403).json({ status: "error", msg: "Invalid Data" })
    );
};

exports.verifyToken = async function (req, res, next) {
  // const token = req.headers.authorization;
  const _token = req.headers.authorization;
  console.log("token from header", _token);

  if (_token && _token.startsWith("Bearer ")) {
    try {
      const token = _token.split(" ")[1];
      const decodedToken = jwt.verify(token, req.app.get("secretKey"));
      // console.log("decoded", decodedToken);
      if (decodedToken) {
        const user = await users.findOne({ username: decodedToken.username });
        if (!user) {
          return res.status(401).json({ msg: "User not found" });
        }
        req.user = decodedToken;
        // res.status(200).json({ msg: "User verified" });
        return next();
      } else {
        return res.status(401).json({ msg: "Token expired" });
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({ msg: "Invalid token" });
    }
  } else {
    res.status(403).json({ msg: "Token not found" });
  }
};
