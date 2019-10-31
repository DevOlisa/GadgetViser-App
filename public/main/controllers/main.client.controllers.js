angular.module('Main')
    .controller('MainController', ['$scope', 'BgMask', 'SearchBarState', 'QuestionDialogService', 
    function ($scope, BgMask, SearchBarState, QuestionDialogService) {
        $scope.isDialogOpen = false;

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

        $scope.QuestionDialogService = QuestionDialogService;
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
    .controller('GadgetController', ['$scope', '$state', 'GadgetFactory', 'selectedGadget',
        function ($scope,$state, GadgetFactory, selectedGadget) {
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
                opt.id= selectedGadget._id;
                opt.function= "moreFromOem";
                
                return GadgetFactory.getGadgets(opt)
                .then(function(gadgets) {
                    $scope.similarGadgets = gadgets;
                }, function(error) {
                    console.error(error);
                });
            };

            self.getOemDevice();
            $state.go('view-phone.questions')
        }])
    .controller('PricesController', ['GadgetFactory', function (GadgetFactory) {
        let self = this;
        self.stores = GadgetFactory.getGadgets().then((response)=> { return response});
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