const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const dialogFlow = require('./dialogflow/dialogflow-client');
const products = require('./products');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  greeting(socket);

  socket.on('startRecording', function (data) {
    io.emit('newProducts', products)
  });

  socket.on('blob', function (data) {
    dialogFlow.executeSpeechQuery(dialogFlow.createBlobQuery(data));
  })
});

function greeting(socket) {
    dialogFlow.executeQuery(dialogFlow.createTextQuery('hello'), function(response) {
        setTimeout(function(){
            socket.emit('georgeTalking');
        }, 5000)
    })
}

http.listen(4000, function(){
  console.log('listening on *:4000');
});
