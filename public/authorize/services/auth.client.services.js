angular.module('Auth')
    .service('AccountPageService', ['$resource', function ($resource) {
        var self = this;
        self.tab = 'signIn';
        self.setTab = function (arg) {
            self.tab = arg;
        };
        self.getTab = function () {
            return self.tab;
        };
        self.getUsers = function() {
            return $resource('http://localhost:3000/users');
        };

        self.Users = $resource('http://localhost:3000/users');

    }]);