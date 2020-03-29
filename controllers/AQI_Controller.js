var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");
const aqiService = require("../services/AqiService");
const redisService = require("../services/RedisService");

router.get("/", authenticateJWT, async (req, res) => {
  let city = req.query.city;
  let state = req.query.state;
  let redis = redisService.Get();

  redis.get("aqi", async (error, cache) => {
    if (error) {
      console.log(error);
    }

    if (cache) {
      return res.json(JSON.parse(cache));
    }

    let data = await aqiService.GetAqiByCountry(city, state);
    redisService.SetWithExpire("aqi", 1800, data);
    res.json(data);
  });
});

router.get("/geolocation", authenticateJWT, async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let data = await aqiService.GetAqiByGeolocation(lat, lon);
  res.json(data);
});

module.exports = router;
