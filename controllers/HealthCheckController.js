var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  const healthcheck = {
    status: "Healthy",
    totalDuration: process.uptime(),
    entries: {},
    timestamp: Date.now()
  };
  try {
    res.json(healthcheck);
  } catch (e) {
    healthcheck.status = "Unhealthy";
    res.status(503).json(healthcheck);
  }
});

module.exports = router;
