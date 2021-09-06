const express = require("express");
const app = express();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("Socket: ", socket);
  console.log("Server is active");
});

httpServer.listen(5003, () => console.log("Listening on port 5003..."));
