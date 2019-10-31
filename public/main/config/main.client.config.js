angular.module('Main')
    .config(function ($locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    })