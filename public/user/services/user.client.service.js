angular.module('User').factory('UserService', ['$http', '$q', '$resource', '$rootScope', function ($http, $q, $resource, $rootScope) {
    var service = {};
    service.localSignIn = (user) => {
        let userToSignIn = angular.copy(user);
        return $http.post('http://localhost:3000/signin', { param: userToSignIn })
        .then((response) => {
            console.log(response);
        }, (err) => {
            console.error(err);
        })
    };

    
    service.localSignUp = (user) => {
        let userToCreate = angular.copy(user);
        return $http.post('http://localhost:3000/signup', { param: userToCreate })
        .then((response) => {
            console.log(response);
        }, (err) => {
            console.error(err);
        })
    };

    return service;
}])