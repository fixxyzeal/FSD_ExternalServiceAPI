const axios = require("axios");

async function GetGold() {
  let result = await axios.get("https://thai-gold-api.herokuapp.com/latest");

  return result.data;
}

module.exports = { GetGold };
