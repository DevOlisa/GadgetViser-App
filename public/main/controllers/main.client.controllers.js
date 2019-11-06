angular.module('Main')
    .controller('MainController', ['$scope', 'BgMask', 'SearchBarState', 'QuestionDialogService', 'AnswerDialogService', 
    function ($scope, BgMask, SearchBarState, QuestionDialogService, AnswerDialogService) {
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
        $scope.AnswerDialogService = AnswerDialogService;
        $scope.SearchBarState = SearchBarState;
        $scope.SearchBarState = SearchBarState;
    }])
    .controller('GadgetController', ['$scope', '$state', 'GadgetFactory', 'selectedGadget', 'QuestionService', 'QuestionDialogService',
        function ($scope,$state, GadgetFactory, selectedGadget, QuestionService, QuestionDialogService) {
            let self = this;
            $scope.gadget = selectedGadget;
            $scope.gadgets = selectedGadget;
            $scope.similarGadgets = [];
            QuestionDialogService.selectedGadget = selectedGadget;
            QuestionService.selectedGadget = selectedGadget._id;

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

            self.likeGadget =  function() {
                GadgetFactory.like(selectedGadget)
                .then(function(response) {
                    alert(response.data);
                })
            };

            self.getOemDevice();
            $state.go('view-device.questions')
        }])
    .controller('NavController', ['$scope', 'NavState', function ($scope, NavState) {
        let self = this;
        self.NavState = NavState;
    }])