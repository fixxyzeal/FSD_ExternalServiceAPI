var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");
const goldService = require("../services/GoldService");
const redisService = require("../services/RedisService");

router.get("/", authenticateJWT, async (req, res) => {
  let redis = redisService.Get();

  redis.get("gold", async (error, cache) => {
    if (error) {
      console.log(error);
    }

    if (cache) {
      return res.json(JSON.parse(cache));
    }

    let data = await goldService.GetGold();
    redisService.SetWithExpire("gold", 3600, data);

    res.json(data);
  });
});

module.exports = router;
