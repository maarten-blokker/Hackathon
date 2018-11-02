const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const dialogFlow = require('./dialogflow/dialogflow-client');
const products = require('./products');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('startRecording', function (data) {
    
    greeting(socket);

    // io.emit('newProducts', products)
  });

  socket.on('blob', function (data) {
    dialogFlow.executeSpeechQuery(dialogFlow.createBlobQuery(data));
  })
});

function greeting(socket) {
    socket.emit('georgeTalking')

    dialogFlow.executeQuery(dialogFlow.createTextQuery('hello'), function(response) {
        setTimeout(function(){
            socket.emit('userTalking');
        }, 3000)
    })
}

http.listen(4000, function(){
  console.log('listening on *:4000');
});
