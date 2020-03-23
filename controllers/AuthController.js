var express = require("express");
var router = express.Router();
const authService = require("../services/AuthService");

router.post("/login", (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  var result = authService.GetToken(username, password);
  res.json(result);
});

router.post("/token", (req, res) => {
  const { token } = req.body;
  return authService.GetRefreshToken(token, res);
});

module.exports = router;
