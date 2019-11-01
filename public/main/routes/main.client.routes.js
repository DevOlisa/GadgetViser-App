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
        })
        .state('laptops', {
            url: '/laptops',
            templateUrl: './main/views/device-category.html',
            params : {
                category: 'Laptop'
            }
        })
        .state('view-device.questions', {
            templateUrl: './questions/views/questions-tab.html',
            controller: 'QuestionsTabController as vm'
        }).state('view-device.specs', {
            templateUrl: './main/views/mobile/specs-tab.html'
        }).state('view-device.prices', {
            templateUrl: './prices/views/prices-tab.html'
        })
        .state('view-device', {
            url: '/:device/v/:id',
            templateUrl: './main/views/view-device.html',
            controller: "GadgetController as gadgetCtrl",
            resolve: {
                selectedGadget: ['$stateParams', 'GadgetBuilder', function ($stateParams, GadgetBuilder) {
                    return GadgetBuilder.fetch($stateParams.id);
                }]
            },
        })

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            // 'http://*.youtube.com/**'
        ]);
    });