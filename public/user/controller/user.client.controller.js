angular.module('User').controller('UserController', ['$http', function($http) {
    var self = this;
    self.users = $http.get('localhost/users');
}]);