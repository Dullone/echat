var exports = module.exports={};

var namesGiven = 1;

exports.randomUserName = function(connectedUsers){
    namesGiven++;
    var username = "user" + namesGiven;
    
    while(arrayContainsUser(connectedUsers, username) && username.length < 20){
        username += Math.floor(Math.random() * 10);
    }
    if (arrayContainsUser(connectedUsers, username)){
        throw new Error("Name not unique");
    }
    return username;

};

arrayContainsUser = function(array, username){
    return array.indexOf(username) !== -1;
};