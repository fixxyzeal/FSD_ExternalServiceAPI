var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");
const aqiService = require("../services/AqiService");

router.get("/", authenticateJWT, async (req, res) => {
  let city = req.query.city;
  let state = req.query.state;
  let data = await aqiService.GetAqiByCountry(city, state);
  res.json(data);
});

module.exports = router;
