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
const { addUser,getUser,removeUser } = require("./server/helpers/helper");

io.on("connection", (socket) => {
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
    socket.join(room_id);
    if(error){
      console.log("Joinr error",error);
    }else{
      console.log("JOIN USER", user)
    }
  });
  socket.on('send_message',(message,room_id,callback)=>{
    const user = getUser(socket.id);
    const msgToStore = {
      name:user.name,
      user_id:user.user_id,
      room_id,
      text: message
    }
    console.log('msg...',msgToStore); 
    io.to(room_id).emit('message',msgToStore);
    callback()
  });
  socket.on('disconnected',()=>{
    const user = removeUser(socket.id);
  })
});

http.listen(PORT, () => {
  console.log(`listening on *${PORT}`);
});
