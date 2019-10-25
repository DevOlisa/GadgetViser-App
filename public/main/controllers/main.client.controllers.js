angular.module('Main')
    .controller('MainController', ['$scope', 'BgMask', 'SearchBarState', function ($scope, BgMask, SearchBarState) {
        $scope.isDialogOpen = false;
        
    $scope.$on('$routeChangeSuccess', function(e, current, previous) {
        $scope.currentRoute =  current;
    });

        $scope.closeAccountDialog = function () {
            if ($scope.isDialogOpen === false) return;
            $scope.isDialogOpen = false;
            BgMask.toggle();
        };

        $scope.openAccountDialog = function () {
            if ($scope.isDialogOpen === true) return;
            $scope.isDialogOpen = true;
            BgMask.toggle();
        };

        $scope.SearchBarState = SearchBarState;

    }])
    .controller('QuestionController', [function () {
        var self = this;
        self.visible = false;
        self.answered = false;
        self.options = false;
        self.showDescription = function () {
            self.visible = true;
        };

        self.toggleOptions = function () {
            self.options = !self.options;
        };

    }])
    .controller('GadgetController', ['$scope', 'GadgetFactory', 'selectedGadget',
        function ($scope, GadgetFactory, selectedGadget) {
            let self = this;
            $scope.gadget = selectedGadget;
            $scope.gadgets = [selectedGadget];
            $scope.similarGadgets = [];

            self.likeGadget = function() {
                ++$scope.gadget.likes;
            };

            self.getOemDevice = function() {
                var opt = {};
                opt.type = selectedGadget.type;
                opt.oem= selectedGadget.oem;
                // opt.sort = -1;
                // opt.limit = 6;
                // console.log(opt);
                return GadgetFactory.getGadgets(opt)
                .then(function(gadgets) {
                    $scope.similarGadgets = gadgets;
                }, function(error) {
                    console.error(error);
                });
            };

            self.getOemDevice();
        }])
    .controller('PricesController', ['TestObjects', function (TestObjects) {
        let self = this;
        self.stores = TestObjects.stores;
        self.showModal = false;
        self.modal = '';

        self.openModal = function (arg) {
            if (arg == 'filter' || arg == 'settings') {
                self.showModal = !self.showModal;
                self.modal = arg;
                return;
            }
        }

        self.closeModal = function () {
            self.showModal = false;
            return;
        };
    }])
    .controller('NavController', ['$scope', 'NavState', function ($scope, NavState) {
        let self = this;
        self.NavState = NavState;
    }])