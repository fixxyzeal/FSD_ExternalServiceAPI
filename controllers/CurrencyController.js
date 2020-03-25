var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");
const ccService = require("../services/CurrencyConverterService");
const redisService = require("../services/RedisService");

router.post("/", authenticateJWT, async (req, res) => {
  let redis = redisService.Get();

  redis.get(
    req.body.form + req.body.to + req.body.value,
    async (error, cache) => {
      if (error) {
        console.log(error);
      }

      if (cache) {
        return res.json(JSON.parse(cache));
      }

      let data = await ccService.GetCurrencyConverter(req);
      redisService.SetWithExpire(
        req.body.form + req.body.to + req.body.value,
        3600,
        data
      );
      res.json(data);
    }
  );
});

module.exports = router;
