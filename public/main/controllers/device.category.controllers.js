angular.module('Main')
    .controller('GadgetCategoryController', ['$scope', '$location', 'RouteStateService', 'GadgetFactory',
        function ($scope, $location, RouteStateService, GadgetFactory) {
            var self = this;
            $scope.latestGadgets = [];
            $scope.upcomingGadgets = [];
            self.category = RouteStateService.currentRoute.category;
            
            self.fetchLatestGadgets = () => {
                let opt = {};
                opt.function = "latest";
                opt.type = self.category;
                GadgetFactory.getGadgets(opt)
                    .then(function (response) {
                        $scope.latestGadgets = response;
                        // console.log(response)
                    }, function(err) {
                        console.error(err);
                    });
            };

            self.fetchUpcomingGadgets = () => {
                let opt = {};
                opt.function = "upcoming";
                opt.type = self.category;
                GadgetFactory.getGadgets(opt)
                    .then(function (response) {
                        $scope.upcomingGadgets = response;
                        console.log(response);
                    }, function(err) {
                        console.error(err);
                    });
            };

            let init = () => {
                self.fetchLatestGadgets();
                self.fetchUpcomingGadgets();
            };

            init();
        }])
    .controller('TrendingNewsController', ['$scope', function ($scope) {
        var self = this;
    }])