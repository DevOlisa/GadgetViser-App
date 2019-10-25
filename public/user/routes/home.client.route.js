angular.module('Home', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/views/home.client.view.html',
            controller: 'HomeController as dCtrl'
        });
    });