var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");
const covidService = require("../services/CovidService");
const redisService = require("../services/RedisService");

router.get("/", authenticateJWT, async (req, res) => {
  let redis = redisService.Get();

  redis.get(req.query.country_code, async (error, cache) => {
    if (error) {
      console.log(error);
    }
    if (cache) {
      return res.json(JSON.parse(cache));
    }
    let data = await covidService.GetCovidByCountryCode(req.query.country_code);
    redisService.SetWithExpire(req.query.country_code, 3600, data);
    res.json(data);
  });
});

module.exports = router;
