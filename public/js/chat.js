(function() {
    
    var chat = angular.module('chat', []);
    var socket = io.connect('http://localhost:3000');

    chat.directive('chatWindow', ['$filter', function($filter){
        socket.on('message', function(message){
            console.log("Recieved" + message.body);
            date = new Date();
            time = $filter('date')(date, 'mediumTime');
            dateString = '[' + time  + "] ";
           $('.messages-window').append('<p>'+ 
                        dateString + 
                        message.username  + ": " + 
                        message.body + '</p>');
        });
        return{
            restrict: 'E',
            templateUrl: '/partials/chat/chatwindow.html',
            controller: function($scope){
            }
        }
    }]);

    chat.directive('usersList', [function(){
        return {
            link: function(scope, element, attr){
                socket.on('userjoined', function(data){
                    console.log("userjoined");
                    scope.addUser(data);
                    scope.$apply();
                });
                socket.on('userdisconnected', function(userdata) {

                });
            },
            restrict: 'E',
            templateUrl: '/partials/chat/userList.html',
            controller: function($scope){
                $scope.userlist = [];

                $scope.addUser = function(user){
                    $scope.userlist.push(user.username);
                };
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