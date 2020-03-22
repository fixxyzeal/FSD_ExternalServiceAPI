var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");

router.get("/", authenticateJWT, function(req, res) {
  res.jsonp("Oil");
});

module.exports = router;
