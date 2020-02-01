angular.module('Main')
    .config(function ($routeProvider, $stateProvider, $locationProvider, $urlRouterProvider, $sceDelegateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './main/views/home.html',
            })
            .state('home.phones', {
                url: 'phones',
                templateUrl: './main/views/device-category.html',
                params: {
                    category: 'Phone'
                },
                controller: "GadgetCategoryController as gCtrl",
                resolve: {
                    topChoice: ['$stateParams', 'GadgetFactory', function ($stateParams, GadgetFactory) {
                        var opt = {
                            type: $stateParams.category,
                            topChoice: true,
                        };
                        return GadgetFactory.getGadgets(opt).then(function(response) {
                            return response
                        });
                    }]
                }
            })
            .state('home.laptops', {
                url: 'laptops',
                templateUrl: './main/views/device-category.html',
                params: {
                    category: 'Laptop'
                },
                controller: "GadgetCategoryController as gCtrl",
                resolve: {
                    topChoice: ['$stateParams', 'GadgetFactory', function ($stateParams, GadgetFactory) {
                        var opt = {
                            type: $stateParams.category,
                            topChoice: true,
                        };
                        return GadgetFactory.getGadgets(opt);
                    }]
                }
            })
            .state('view-device.questions', {
                templateUrl: './questions/views/questions-tab.html',
                controller: 'QuestionsTabController as vm'
            }).state('view-device.specs', {
                templateUrl: './main/views/mobile/specs-tab.html',
                controller: 'SpecsTabController as specCtrl',
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
            .state('category', {
                url: '/:deviceType/:category',
                templateUrl: './main/views/category.html',
                controller: "CategoryController as categoryCtrl",
                resolve: {
                    topChoice: ['$stateParams', 'GadgetFactory', function ($stateParams, GadgetFactory) {
                        var deviceType = $stateParams.deviceType.charAt(0).toUpperCase()
                            + $stateParams.deviceType.substring(1, $stateParams.deviceType.lastIndexOf('s'));
                        var opt = {
                            type: deviceType,
                            category: $stateParams.category,
                            topChoice: true,
                        };
                        return GadgetFactory.getGadgets(opt);
                    }]
                }
            })

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            // 'http://*.youtube.com/**'
        ]);
    });