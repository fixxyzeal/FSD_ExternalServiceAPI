const axios = require("axios");
const config = require("../config");

async function GetAqiByCountry(city, state) {
  let result = await axios.get(
    "https://api.airvisual.com/v2/city?city=" +
      city +
      "&state=" +
      state +
      "&country=thailand&key=" +
      config.iqAirApikey
  );

  return result.data;
}

async function GetAqiByGeolocation(lat, lon) {
  let result = await axios.get(
    "https://api.airvisual.com/v2/nearest_city?lat=" +
      lat +
      "&lon=" +
      lon +
      "&key=" +
      config.iqAirApikey
  );

  return result.data;
}

module.exports = { GetAqiByCountry, GetAqiByGeolocation };
