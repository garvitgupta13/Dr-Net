require("dotenv").config();

const config = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BRAINTREE_MERCHANT_ID: process.env.BRAINTREE_MERCHANT_ID,
  BRAINTREE_PUBLIC_KEY: process.env.BRAINTREE_PUBLIC_KEY,
  BRAINTREE_PRIVATE_KEY: process.env.BRAINTREE_PRIVATE_KEY
};

module.exports = config;
