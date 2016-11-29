var exports = module.exports={};

exports.randomUserName = function(connectedUsers){
    var username = "user" + Math.floor(Math.random() * 10000);
    while(connectedUsers.indexOf(username) !== -1){
        username += Math.floor(Math.random() * 10);
    }
    return username;
};