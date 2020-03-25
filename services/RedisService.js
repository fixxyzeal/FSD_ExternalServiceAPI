var redis = require("redis");
const config = require("../config");

let redisClient = redis.createClient({
  port: 11876,
  host: config.redisURL, // replace with your hostanme or IP address
  password: config.redisPASS // replace with your password
});

function Get() {
  return redisClient;
}

function SetWithExpire(key, expire, data) {
  redisClient.setex(key, expire, JSON.stringify(data));
}

module.exports = { Get, SetWithExpire };
