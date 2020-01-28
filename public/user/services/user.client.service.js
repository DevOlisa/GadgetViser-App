angular.module('User').factory('UserService', ['$http', '$q', '$resource', '$rootScope', 'NotificationDialog',
function ($http, $q, $resource, $rootScope, NotificationDialog) {
    var service = {};
    service.user = {};

    service.localSignIn = (user) => {
        let userToSignIn = angular.copy(user);
        return $http.post('http://localhost:3000/signin', userToSignIn)
        .then(function(response) {
            if (response.data.user) {
                console.log(response)
                sessionStorage.setItem('userId', response.data.user.id);
                sessionStorage.setItem('username', response.data.user.username);
                sessionStorage.setItem('image', response.data.user.image);
                service.isLoggedIn = true;
                service.userID = response.data.user.id;
                NotificationDialog.alertUser({type: 'success', message: 'Sign in successful'});
                $http.defaults.headers.common['Authorization'] = 'Basic ' + response.data.user._id;
                $rootScope.$broadcast('userAuthenticated');
            }
        }, (err) => {
            console.error(err);
            NotificationDialog.alertUser({type: 'warning', message: 'Sign in failed'});

        })
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
