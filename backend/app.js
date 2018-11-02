const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const dialogFlow = require('./dialogflow/dialogflow-client');
const products_dress = require('./products-dress');
const products_shoes = require('./products-shoes');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('startRecording', function (data) {
    greeting();
  });

  socket.on('blob', function (data) {
    dialogFlow.executeQuery(dialogFlow.createBlobQuery(data), function(response) {
        
        console.log('received response: ' + JSON.stringify(response));

        if (response && response.params && response.params.product === 'dresses') {
            io.emit('newProducts', products_dress)
        } else {
            io.emit('newProducts', products_shoes)
        }
    });
  })
});

function greeting() {
    io.emit('georgeTalking')

    dialogFlow.executeQuery(dialogFlow.createTextQuery('hello'), function(response) {
        setTimeout(function(){
            io.emit('userTalking');
        }, 3000)
    })
}

http.listen(4000, function(){
  console.log('listening on *:4000');
});
