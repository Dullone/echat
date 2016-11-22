var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});


io.on('connection', function(client){
    console.log("Client connected...");
    client.emit('message', { hello: 'world' });
    client.on('message', function(data){
        console.log(data);
    });
});

server.listen(3000);