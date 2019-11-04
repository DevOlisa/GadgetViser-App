angular.module('User')
    .config(function ($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/account',
                templateUrl: './user/views/account-page.html',
            })
            .state('user.activity', {
                templateUrl: './user/views/activity.html',
            })
            .state('user.watchlist', {
                templateUrl: './user/views/watchlist.html',
            })
            .state('user.settings', {
                templateUrl: './user/views/settings.html',
            })
    });