const cors = require("cors");
const express = require("express");
const app = express();
var corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
const http = require("http").createServer(app);
const socketIo = require("socket.io");
const io = socketIo(http);
const PORT = process.env.PORT || 5000;
const { addUser } = require("./server/helpers/helper");

io.on("connection", (socket) => {
  console.log("an user was connected");
  console.log("socet id", socket.id);
  socket.on("create-room", (name) => {
    console.log("name ----- ", name);
  });
  socket.on("join", ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id,
    });
    if(error){
      console.log("Joinr error",error);
    }else{
      console.log("JOIN USER", user)
    }
  });
});

http.listen(PORT, () => {
  console.log(`listening on *${PORT}`);
});
