const express = require("express");
const app = express();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*"
  }
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("User connected");

  //Get userId and socketId from client and give them the list of online users
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //remove the user from users list as he disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected");
    removeUser(socket.id);
  });
});

httpServer.listen(5003, () => console.log("Listening on port 5003..."));
