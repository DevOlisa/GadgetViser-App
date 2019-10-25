angular.module('News').config(function ($routeProvider) {
    $routeProvider.when('/news', {
        templateUrl: './news/views/news-page.html',
    });
});