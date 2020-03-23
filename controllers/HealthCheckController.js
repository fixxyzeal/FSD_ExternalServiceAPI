var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  const healthcheck = {
    status: "Healthy",
    totalDuration: secondsToHms(process.uptime()),
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

function secondsToHms(num) {
  var sec_num = parseInt(num, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

module.exports = router;
