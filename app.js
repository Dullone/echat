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
    username =  randomUserName();
    var userdata = {
        username: username
    }
    console.log(userdata);
    client.broadcast.emit('userjoined', userdata);

    client.on('username', function(message){
        username = message.username;
    });

    client.on('message', function(message){
        message.username = username;

        client.broadcast.emit('message', message);
        client.emit('message', message);
        console.log(message);
    });

    client.on('disconnect', function(){
        console.log("disconnect");
        console.log(userdata);
        client.broadcast.emit('userdisconnected', userdata);
    });
});


var randomUserName = function(){
    return "user" + Math.floor(Math.random() * 10000000);
};

server.listen(3000);