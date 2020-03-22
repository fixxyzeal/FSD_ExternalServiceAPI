const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const oil = require("./controllers/OilController");
const auth = require("./controllers/AuthController");
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("FSD External Service API"));

app.use("/auth", auth);
app.use("/oil", oil);

app.listen(port, () => console.log(`FSD_Service listening on port ${port}!`));
