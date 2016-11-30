(function () {

	var chat = angular.module('chat', []);
	var socket = null;

	chat.directive('chatWindow', ['$filter', function ($filter) {
		return {
			link: function (scope, element, attr) {
				socket = io(); //defaults to URL that served the page, ex: 'http://localhost:3000'

				socket.on('message', function (message) {
					scope.addMessageToChatwindow(message);
				});

			},
			restrict: 'E',
			templateUrl: '/partials/chat/chatwindow.html',
			controller: function ($scope) {
				$scope.addMessageToChatwindow = function (message) {
					formatedMessage = $scope.formatChatMessage(message);
					$('.messages-window').append(formatedMessage)  //append message
						.scrollTop($('.messages-window')[0].scrollHeight); //and scoll to bottom
				};
				$scope.formatChatMessage = function (message, date) {
					if (!date) {
						date = new Date();
					}
					time = $filter('date')(date, 'mediumTime');
					dateString = '[' + time + "] ";
					return '<p>' +
						dateString +
						message.username + ": " +
						message.body +
						'</p>';
				};
			}
		};
	}]);

	chat.directive('usersList', [function () {
		return {
			link: function (scope, element, attr) {
				socket.on('userjoined', function (data) {
					scope.addUser(data);
					scope.$apply();
				});
				socket.on('selfjoined', function (usersdata, selfName) {
					usersdata.forEach(function (element) {
						scope.userlist.push(element);
					});
					scope.usernameSelf = selfName;
					scope.$apply();

				});
				socket.on('userdisconnected', function (userdata) {
					scope.removeUser(userdata);
				});
			},
			restrict: 'E',
			templateUrl: '/partials/chat/userList.html',
			controller: function ($scope) {
				$scope.userlist = [];

				$scope.addUser = function (username) {
					$scope.userlist.push(username);
				};
				$scope.removeUser = function (username) {
					var index = $scope.userlist.indexOf(username);
					if (index > -1) {
						$scope.userlist.splice(index, 1);
					}
					$scope.$apply();
				};
				$scope.isUsernameSelf = function(username){
					return username == $scope.usernameSelf;
				};
			}
		};
	}]);

	chat.directive('messageEntry', [function () {
		return {
			restrict: 'E',
			templateUrl: '/partials/chat/messageEntry.html',
			controller: function ($scope) {
				$scope.message = {};
				$scope.sendMessage = function (message) {
					if (message.body && message.body.length >= 1) {
						socket.emit('message', message);
						$scope.message = {}; //clear input feilds
					}
				};
			}
		};
	}]);

	//captures and responds to enter key
	chat.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown", function (e) {
				if (e.which === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.ngEnter, { 'e': e });
					});
					e.preventDefault();
				}
			});
		};
	});


})();