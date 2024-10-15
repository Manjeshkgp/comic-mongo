require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Comic Mongo" });
});

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
