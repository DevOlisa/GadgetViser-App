angular.module('User').factory('UserService', function($q, $resource, $rootScope) {
    var service= {};
    service.User = $resource('http://localhost:3000/users');
    return service;
})