const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const products = require('./products');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('startRecording', function (data) {
    io.emit('newProducts', products)
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
