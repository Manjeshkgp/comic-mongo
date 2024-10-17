require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../services/logger.service");

exports.dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    logger.info("Database Connection Successful");
  } catch (error) {
    logger.error(error);
  }
};
