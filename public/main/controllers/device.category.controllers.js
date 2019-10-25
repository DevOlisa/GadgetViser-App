angular.module('Main')
    .controller('GadgetCategoryController', ['$scope', '$location', 'RouteStateService', 'GadgetFactory',
        function ($scope, $location, RouteStateService, GadgetFactory) {
            var self = this;
            $scope.latestGadgets = [];
            self.category = RouteStateService.currentRoute.category;
            self.fetchLatestDevices = function () {
                let opt = {};
                opt.function = "latest";
                GadgetFactory.getGadgets(opt)
                    .then(function (response) {
                        $scope.latestGadgets = response;
                        // console.log(response)
                    }, function(err) {
                        console.error(err);
                    });
            };

            self.fetchLatestDevices();
        }])
    .controller('TrendingNewsController', ['$scope', function ($scope) {
        var self = this;
    }])