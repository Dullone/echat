var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var randName = require("./utility/randomName.js");
var session = require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");
var users = require('./users/users.js');

app.use(express.static('public'));
app.use(session);
io.use(sharedsession(session, {
    autoSave:true
}));


app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

var connectedUsers = [];

io.on('connection', function(client){
    console.log("Client connected...");
    username = users.createUser();
    client.handshake.session.username = username;
    client.broadcast.emit('userjoined', username);
    setTimeout(function(){
        client.emit('selfjoined', users.all(), username);
    }, 300); //give client time to get ready
    

    client.on('username', function(message){
        client.handshake.session.username = message.username;
    });

    client.on('message', function(message){
        message.username = client.handshake.session.username;

        client.broadcast.emit('message', message);
        client.emit('message', message);
        console.log(message);
    });

    client.on('disconnect', function(){
        console.log("disconnect");
        console.log(client.handshake.session.username);
        users.removeUser(client.handshake.session.username);
        client.broadcast.emit('userdisconnected', client.handshake.session.username);
    });
});

server.listen(3000);