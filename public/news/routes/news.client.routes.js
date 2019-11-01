angular.module('News').config(function ($stateProvider) {
    $stateProvider
    .state('news', {
        url: '/news',
        templateUrl: './news/views/news-page.html',
    });
});