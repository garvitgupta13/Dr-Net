require("dotenv").config();

const config = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};

module.exports = config;
