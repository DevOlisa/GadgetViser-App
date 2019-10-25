angular.module('Main')
    .config(function ($routeProvider, $sceDelegateProvider) {
        $routeProvider.when('/', {
            templateUrl: './main/views/home.client.view.html',
        });
        $routeProvider.when('/phones', {
            templateUrl: './main/views/device-category.html',
            category: 'phone',
        });
        $routeProvider.when('/laptops', {
            templateUrl: './main/views/device-category.html',
            category: 'laptop',
        });
        $routeProvider.when('/phones/v/:id', {
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

        $routeProvider.otherwise({redirectTo: '/'});
    });