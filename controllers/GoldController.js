var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");
const goldService = require("../services/GoldService");

router.get("/", authenticateJWT, async (req, res) => {
  let data = await goldService.GetGold();
  res.json(data);
});

module.exports = router;
