const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_secret: process.env.REFRESH_TOKEN_SECRET,
  user: process.env.USER,
  pass: process.env.PASS
};
