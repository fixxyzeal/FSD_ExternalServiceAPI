const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const oil = require("./controllers/OilController");
const covid = require("./controllers/CovidController");
const gold = require("./controllers/GoldController");
const aqi = require("./controllers/AQI_Controller");
const cc = require("./controllers/CurrencyController");
const hc = require("./controllers/HealthCheckController");
const auth = require("./controllers/AuthController");

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.send("FSD External Service API"));

app.use("/auth", auth);
app.use("/oil", oil);
app.use("/covid", covid);
app.use("/gold", gold);
app.use("/aqi", aqi);
app.use("/currencyconvert", cc);
app.use("/hc", hc);

app.listen(port, () => console.log(`FSD_Service listening on port ${port}!`));
