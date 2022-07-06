const mongoose = require('mongoose');
const config = require('../config');

module.exports = async function () {
  const db = config.MONGO_DB_URL;
  await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log(`Connected to DB `))
    .catch((err) => {
      console.error('Unable to connect to db ', err);
    });
};
