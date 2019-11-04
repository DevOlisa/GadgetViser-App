angular.module('Main')
    .controller('CategoryController', ['$scope', 'topChoice',
        function ($scope, topChoice) {
            var self = this;
            $scope.topChoice = topChoice;

        }])
    .controller('GadgetCategoryController', ['$scope', '$stateParams', '$location', 'RouteStateService', 'GadgetFactory', 'topChoice',
        function ($scope, $stateParams, $location, RouteStateService, GadgetFactory, topChoice) {
            var self = this;
            $scope.latestGadgets = [];
            $scope.upcomingGadgets = [];
            $scope.topChoice = topChoice;
            self.category = $stateParams.category;

            self.fetchLatestGadgets = () => {
                let opt = {};
                opt.function = "latest";
                opt.type = self.category;
                GadgetFactory.getGadgets(opt)
                    .then(function (response) {
                        $scope.latestGadgets = response;
                        // console.log(response)
                    }, function (err) {
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
                    }, function (err) {
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