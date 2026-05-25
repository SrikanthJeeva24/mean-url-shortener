const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(express.json());

const urlRoutes = require("./routes/url.routes");
app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  res.send("API Working!");
});

module.exports = app;
