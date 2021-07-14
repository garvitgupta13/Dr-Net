const Express = require("express");
const app = Express();

//Routes
require("./startup/routes")(app);
//Connecting to DB
require("./startup/db")();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Listening on port", port, "...");
});

module.exports = server;
