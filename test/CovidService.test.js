const covidService = require("../services/CovidService");

test("Get Thailand Covid Data", async () => {
  const data = await covidService.GetCovidByCountryCode("TH");
  await expect(data).not.toEqual({
    latest: {
      confirmed: 0,
      deaths: 0,
      recovered: 0
    },
    locations: []
  });
});
