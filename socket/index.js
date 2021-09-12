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

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("User connected");

  //Get userId and socketId from client and give them the list of online users
  socket.on("addUser", (userId) => {
    console.log('user requesting to add itself '+userId);
    addUser(userId, socket.id);
    console.log("printing user id from server" + userId);
    io.emit("getUsers", users);
  });

  //Receive message from sender and emit it to receiver
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log('send message called by ',senderId,' to ',receiverId)
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text
    });
  });

  //remove the user from users list as he disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected");
    removeUser(socket.id);
  });
});

httpServer.listen(5003, () => console.log("Listening on port 5003..."));
