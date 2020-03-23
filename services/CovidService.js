const axios = require("axios");

async function GetCovidByCountryCode(country_code) {
  let result = await axios.get(
    "http://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=" +
      country_code
  );

  return result.data;
}

module.exports = { GetCovidByCountryCode };
