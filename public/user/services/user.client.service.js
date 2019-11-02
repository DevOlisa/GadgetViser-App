angular.module('User').factory('UserService', ['$http', '$q', '$resource', '$rootScope', function ($http, $q, $resource, $rootScope) {
    var service = {};
    service.user = {};

    service.localSignIn = (user) => {
        let userToSignIn = angular.copy(user);
        return $http.post('http://localhost:3000/signin', userToSignIn)
        .then((response) => {
            console.log(response);
            if (response.data.user) {
                return response.data.user;
            }
            console.log(service.user)
        }, (err) => {
            console.error(err);
        })
    };

    service.updateStatus = function(data) {
        service.user = data;
    };
    
    service.getUser = function() {
        return service.user;
    }

    service.localSignUp = (user) => {
        let userToCreate = angular.copy(user);
        return $http.post('http://localhost:3000/signup', userToCreate)
        .then((response) => {
            console.log(response);
        }, (err) => {
            console.error(err);
        })
    };

    return service;
}])
