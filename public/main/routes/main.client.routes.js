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
            params : {
                category: 'Phone'
            }
        }).state('view-phone.questions', {
            templateUrl: './questions/views/questions-tab.html',
            controller: 'QuestionsTabController as vm'
        }).state('view-phone.specs', {
            templateUrl: './main/views/mobile/specs-tab.html'
        }).state('view-phone.prices', {
            templateUrl: './prices/views/prices-tab.html'
        })
        .state('laptops', {
            url: '/laptops',
            templateUrl: './main/views/device-category.html',
        })
        .state('view-phone', {
            url: '/phone/v/:id',
            templateUrl: './main/views/view-device.html',
            controller: "GadgetController as gadgetCtrl",
            resolve: {
                selectedGadget: ['$stateParams', 'GadgetBuilder', function ($stateParams, GadgetBuilder) {
                    return GadgetBuilder.fetch($stateParams.id);
                }]
            },
        })
        .state('view-laptop', {
            url: '/laptop/v/:id',
            templateUrl: './main/views/view-device.html',
            controller: "GadgetController as gadgetCtrl",
            resolve: {
                selectedGadget: ['$stateParams', 'GadgetBuilder', function ($stateParams, GadgetBuilder) {
                    return GadgetBuilder.fetch($stateParams.id);
                }]
            },
        })
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