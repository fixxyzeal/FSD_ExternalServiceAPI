var express = require("express");
var router = express.Router();
var authenticateJWT = require("../middlewares/jwt");
const ccService = require("../services/CurrencyConverterService");

router.post("/", authenticateJWT, async (req, res) => {
  let data = await ccService.GetCurrencyConverter(req);
  console.log(data);
  res.json(data);
});

module.exports = router;
