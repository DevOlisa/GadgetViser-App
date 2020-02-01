// var moment = require('moment');

angular.module('Gad', ['ngRoute', 'ui.router', 'auth0.auth0', 'ngAnimate', 'ngSanitize', 'ngResource', 'ngMessages', 'angularMoment',
    'Admin', 'Main', 'News', 'Header', 'Questions', 'Search', 'Prices', 'Auth', 'User'])
    .run(['AuthService', function(AuthService) {
        console.log('in Run')
            if (localStorage.getItem('isLoggedIn') === 'true') {
              AuthService.renewTokens();
            } else {
              // Handle the authentication
              // result in the hash
              AuthService.handleAuthentication();
            }        
    }])
    .config([
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'angularAuth0Provider',
        function (
            $stateProvider,
            $locationProvider,
            $urlRouterProvider,
            angularAuth0Provider) {

            var AUTH0_CLIENT_ID = '0vY23DZFjen2aUzWrgFsc13yepS0S55j';
            var AUTH0_DOMAIN = 'dev-q8ikmtc2.auth0.com';
            var AUTH0_CALLBACK_URL = 'http://localhost:3000/callback';

            $stateProvider
                .state('callback', {
                    url: '/callback',
                    templateUrl: 'app/callback/callback.html',
                    controllerAs: 'vm'
                });

            // Initialization for the angular-auth0 library
            angularAuth0Provider.init({
                clientID: '0vY23DZFjen2aUzWrgFsc13yepS0S55j',
                domain: 'dev-q8ikmtc2.auth0.com',
                responseType: 'token id_token',
                redirectUri: 'http://localhost:3000/',
                scope: 'openid'
            });

            $urlRouterProvider.otherwise('/');

            $locationProvider.hashPrefix('!');

            /// Comment out the line below to run the app
            // without HTML5 mode (will use hashes in routes)
        }]);