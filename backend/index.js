const Express = require("express");
const app = Express();
const morgan = require("morgan");
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");
const patientRoute = require("./routes/patientRoute");
const doctorRoute = require("./routes/doctorRoutes");
const appointmentRoute = require("./routes/appointmentRoutes")
const chatRoute = require("./routes/chatRoutes");
const paymentRoute = require("./routes/paymentRoutes");
const conversationRoute = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const bodyParser = require("body-parser");

//Connecting to DB
require("./startup/db")();

app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

//! Routes
// require("./startup/routes")(app);

app.use("/api/users", usersRoute);
app.use("/api/patient", patientRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/appointment", appointmentRoute)
app.use("/api/chat", chatRoute);
app.use("/api/payment", paymentRoute)
app.use("/api/conversation", conversationRoute);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Listening on port", port, "...");
});

module.exports = server;
