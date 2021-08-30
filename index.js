const app = require('express')();
const http = require('http').createServer(app);
const socketIo= require('socket.io');
const io = socketIo(http);
const PORT = process.env.PORT || 5000;


io.on('connection',(socket) =>{
  console.log('an user was connected')
});

http.listen(PORT, () => {
  console.log(`listening on *${PORT}`);
});