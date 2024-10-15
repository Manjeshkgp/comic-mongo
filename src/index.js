require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { dbConnection } = require("./config/db.config");
const routes = require("./routes/index.routes");

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

app.use("/api", routes);

app.listen(process.env.PORT, async () => {
  try {
    await dbConnection();
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
});
