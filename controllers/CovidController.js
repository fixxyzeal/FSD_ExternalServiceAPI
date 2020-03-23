var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");
const covidService = require("../services/CovidService");

router.get("/", authenticateJWT, async (req, res) => {
  let data = await covidService.GetCovidByCountryCode(req.query.country_code);

  res.json(data);
});

module.exports = router;
