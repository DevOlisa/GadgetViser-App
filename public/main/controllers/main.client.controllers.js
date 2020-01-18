angular.module('Main')
    .controller('MainController', ['$scope', 'BgMask', 'SearchBarState', 'NavState', 'QuestionDialogService', 'AnswerDialogService',
        function ($scope, BgMask, SearchBarState, NavState, QuestionDialogService, AnswerDialogService) {
            let self = this;
            self.NavState = NavState;
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
    .controller('GadgetController', ['$scope', '$state', 'GadgetFactory', 'selectedGadget', 'QuestionService', 'QuestionDialogService', 'UserService',
        function ($scope, $state, GadgetFactory, selectedGadget, QuestionService, QuestionDialogService, UserService) {
            let self = this;
            let userID = UserService.userID || sessionStorage.getItem('userId');
            $scope.gadget = selectedGadget;
            $scope.similarGadgets = [];
            QuestionDialogService.selectedGadget = selectedGadget;
            QuestionService.selectedGadget = selectedGadget._id;

            self.isGadgetLiked = function(_user) {
                if (selectedGadget.likes.includes(_user)) {
                    $scope.isLiked = true;
                } else {
                    $scope.isLiked = false;
                }
            };

            self.getOemDevice = function () {
                var opt = {};
                opt.type = selectedGadget.type;
                opt.oem = selectedGadget.oem;
                opt.id = selectedGadget._id;
                opt.function = "moreFromOem";

                return GadgetFactory.getGadgets(opt)
                    .then(function (gadgets) {
                        $scope.similarGadgets = gadgets;
                    }, function (error) {
                        console.error(error);
                    });
            };

            self.highlight = function() {
                

            };

            self.likeGadget = function () {
                self.processingLike = true;
                if ($scope.isLiked && !self.processingLike) {
                    selectedGadget.likes.splice(selectedGadget.likes.indexOf(userID), 1);
                    GadgetFactory.like(selectedGadget)
                        .then(function (response) {
                            console.log('User unliked this');
                            // console.log(userID);
                            $scope.isLiked = false;
                            $scope.gadget = selectedGadget;
                            self.processingLike = false;
                        }, function(error) {
                            console.error(error);
                        })
                } else if (!$scope.isLiked && !self.processingLike) {
                    selectedGadget.likes.push(userID);
                    GadgetFactory.like(selectedGadget)
                        .then(function (response) {
                            console.log('User liked this');
                            $scope.isLiked = true;
                            $scope.gadget = selectedGadget;
                            self.processingLike = false;
                        }, function(error) {
                            console.error(error);
                        })
                }
            };

            self.getOemDevice();
            $state.go('view-device.questions');
            console.log(userID);
            self.isGadgetLiked(userID);
        }])