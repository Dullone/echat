var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var session = require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");

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
    //create random username and store
    var username =  randomUserName();
    client.handshake.session.username = username;
    connectedUsers.push(username);
    client.broadcast.emit('userjoined', username);
    client.emit('selfjoined', connectedUsers);

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
        removeUser(client.handshake.session.username);
        client.broadcast.emit('userdisconnected', client.handshake.session.username);
    });
});


var randomUserName = function(){
    return "user" + Math.floor(Math.random() * 10000000);
};

var removeUser = function(user){
    var index = connectedUsers.indexOf(user);
    if (index > -1) {
        connectedUsers.splice(index, 1);
    }
};

server.listen(3000);