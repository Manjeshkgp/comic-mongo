require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { dbConnection } = require("./config/db.config");
const routes = require("./routes/index.routes");
const logger = require("./services/logger.service");
const morgan = require("morgan");

const morganFormat = ':method :url :status :response-time ms';

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use(morgan(morganFormat,{
  stream:{
    write:(message)=>{
      const logObject = {
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status:message.split(' ')[2],
        responseTime: message.split(' ')[3]
      };
      logger.info(JSON.stringify(logObject));
    }
  }
}))

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Comic Mongo" });
});

app.use("/api", routes);

app.listen(process.env.PORT, async () => {
  try {
    await dbConnection();
    logger.info(`Server running on port ${process.env.PORT}`);
  } catch (error) {
    logger.error("Error connecting to the database:", error);
    process.exit(1);
  }
});
