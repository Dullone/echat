var SocketFactory = angular.module('SocketFactory', [])

.factory('ioFactory', function(){
    var socket = io.connect('http://localhost:3000');

    this.onMessage = function(callback) {
        socket.on('message', function(data){
            callback.call(data);
        });
        return;
    }; 
});
