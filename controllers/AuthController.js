var express = require("express");
var router = express.Router();
const config = require("../config");
const jwt = require("jsonwebtoken");
const accessTokenSecret = config.token_secret;
const refreshTokenSecret = config.refresh_secret;
const refreshTokens = [];

router.post("/login", (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  // Filter user from the users array by username and password
  const user = config.user === username && config.pass === password;

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: process.env.User, role: "admin" },
      accessTokenSecret
    );

    const refreshToken = jwt.sign(
      { username: process.env.User, role: "admin" },
      refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken
    });
  } else {
    res.send("Username or password incorrect");
  }
});

router.post("/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: process.env.User, role: "admin" },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken
    });
  });
});

router.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(token => t !== token);

  res.send("Logout successful");
});

module.exports = router;
