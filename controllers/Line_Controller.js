var express = require("express");
var router = express.Router();
const config = require("../config");
var authenticateJWT = require("../middlewares/jwt");
const { LineClient } = require("messaging-api-line");

router.post("/", authenticateJWT, async (req, res) => {
  const { to, message } = req.body;

  const client = LineClient.connect({
    accessToken: config.lineToken,
    channelSecret: config.lineChannel,
  });
  client.push(to, [
    {
      type: "text",
      text: message,
    },
  ]);
  res.json({ result: "line was send to " + to });
});

module.exports = router;
