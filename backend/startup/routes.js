const Express = require("express");

module.exports = function (app) {
  app.use(Express.json());

  //Routes
  app.use("/", (req, res) => {
    res.send("Welcome to backend of Dr,Net backend");
  });
};
