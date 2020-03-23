const axios = require("axios");
const config = require("../config");

let fx = require("money");

async function GetCurrencyConverter(request) {
  let result = await axios
    .get(
      "https://openexchangerates.org/api/latest.json?app_id=" +
        config.openexchangeratesApikey
    )
    .then(response => {
      if (typeof fx !== "undefined" && fx.rates) {
        fx.rates = response.data.rates;
        fx.base = response.data.base;
      } else {
        // If not, apply to fxSetup global:
        var fxSetup = {
          rates: response.data.rates,
          base: response.data.base
        };
      }
      let result = fx(request.body.value)
        .from(request.body.from)
        .to(request.body.to);

      return result;
    })
    .catch(error => {
      console.log(error);
    });
  console.log(
    "Currency Convert From " +
      request.body.from +
      " To: " +
      request.body.to +
      " Value: " +
      result
  );
  return result;
}

module.exports = { GetCurrencyConverter };
