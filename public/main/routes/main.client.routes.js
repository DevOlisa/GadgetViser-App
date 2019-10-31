angular.module('Main')
    .config(function ($routeProvider, $stateProvider, $locationProvider, $urlRouterProvider, $sceDelegateProvider) {
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './main/views/home.html',
        })
        .state('phones', {
            url: '/phones',
            templateUrl: './main/views/device-category.html',
            resolve: {}
        })
        .state('laptops', {
            url: '/laptops',
            templateUrl: './main/views/device-category.html',
        });
        $routeProvider.when('/phone/v/:id', {
            templateUrl: './main/views/view-device.html',
            controller: "GadgetController as gadgetCtrl",
            resolve: {
                selectedGadget: ['$route', 'GadgetBuilder', function ($route, GadgetBuilder) {
                    return GadgetBuilder.fetch($route.current.params.id);

                }]
            },
        });
        $routeProvider.when('/laptop/v/:id', {
            templateUrl: './main/views/view-device.html',
            controller: "GadgetController as gadgetCtrl",
            resolve: {
                selectedGadget: ['$route', 'GadgetBuilder', function ($route, GadgetBuilder) {
                    return GadgetBuilder.fetch($route.current.params.id);

                }]
            },
        });

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            // 'http://*.youtube.com/**'
        ]);
    });