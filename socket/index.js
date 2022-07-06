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
        addUser(userId, socket.id);
        console.log(userId);
        io.emit("getUsers", users);
    });

    //Receive message from sender and emit it to receiver
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            });
        }
    });

    //remove the user from users list as he disconnects
    socket.on("disconnect", () => {
        console.log("User disconnected");
        removeUser(socket.id);
    });
});

const port = process.env.PORT || 5003;
httpServer.listen(port, () => console.log("Listening on port 5003..."));
