var exports = module.exports={};
var randName = require("../utility/randomName.js");


var connectedUsers = [];

exports.createUser = function(){
    var username =  randName.randomUserName(connectedUsers);
    connectedUsers.push(username);
    return username;
};

exports.removeUser = function(user){
    var index = connectedUsers.indexOf(user);
    if (index > -1) {
        connectedUsers.splice(index, 1);
    }
};

exports.all = function(){
    //return dupicate array so caller cannnot change it
    return dupicateUsersArray();
};

exports.clear = function(){
    connectedUsers = [];
};

var dupicateUsersArray = function(){
    return connectedUsers.slice(0);
};