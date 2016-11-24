(function() {
    var socket = io.connect('http://localhost:3000');

    socket.on('message', function(data){
        console.log(data.hello);
    });

    var chat = angular.module('chat', []);
    
    
    chat.directive('chatWindow', [function(){
        return{
            restrict: 'E',
            templateUrl: '/partials/chat/chatwindow.html',
            controller: function($scope){
                $scope.test = "Chat messages goes here";
            }
        }
    }]);

    chat.directive('messageEntry', [function(){
        return {
            restrict: 'E',
            templateUrl: '/partials/chat/messageEntry.html',
            controller: function($scope){
                $scope.message = {};
                $scope.sendMessage =  function(message) {
                    if(message.body && message.body.length >= 1){
                        socket.emit('message', message);
                        console.log("Sent: " + message.body);
                        $scope.message = {};
                    }
                };
            }
        }
    }]);

})(); 