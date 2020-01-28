angular.module('Main')
    .controller('MainController', ['$scope', 'BgMask', 'SearchBarState', 'NavState', 'QuestionDialogService', 'AnswerDialogService', 'NotificationDialog',
        function ($scope, BgMask, SearchBarState, NavState, QuestionDialogService, AnswerDialogService, NotificationDialog) {
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

            $scope.NotificationDialog = NotificationDialog;
            $scope.QuestionDialogService = QuestionDialogService;
            $scope.AnswerDialogService = AnswerDialogService;
            $scope.SearchBarState = SearchBarState;
            $scope.SearchBarState = SearchBarState;
        }])
    .controller('GadgetController', ['$scope', '$state', '$timeout', 'GadgetFactory', 'selectedGadget', 'QuestionService', 'QuestionDialogService', 'UserService', 'NotificationDialog',
        function ($scope, $state, $timeout, GadgetFactory, selectedGadget, QuestionService, QuestionDialogService, UserService, NotificationDialog) {
            let self = this,
                userID = UserService.userID || sessionStorage.getItem('userId');

            $scope.gadget = selectedGadget;
            $scope.similarGadgets = [];
            self.processingLike = false;
            QuestionDialogService.selectedGadget = selectedGadget;
            QuestionService.selectedGadget = selectedGadget._id;

            self.isGadgetLiked = function (_user) {
                if ($scope.gadget.likes.includes(_user)) {
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

            self.highlight = function () {


            };

            self.likeGadget = function () {
                if (!self.processingLike) {
                    let _selectedGadget = angular.copy($scope.gadget);

                    if ($scope.isLiked) {
                        self.processingLike = true;
                        selectedGadget.likes.splice(selectedGadget.likes.indexOf(userID), 1);
                        GadgetFactory.like(selectedGadget)
                            .then(function (response) {
                                $scope.isLiked = false;
                                $scope.gadget = selectedGadget;
                                self.processingLike = false;
                            }, function (error) {
                                console.error(error);
                                NotificationDialog.alertUser(error.data);
                                $timeout(function () {
                                    $scope.gadget = _selectedGadget;
                                    $scope.isLiked = true;
                                    self.processingLike = false;
                                }, 2000);
                            })
                    } else {
                        self.processingLike = true;
                        if (selectedGadget.likes.includes(userID)) return;
                        selectedGadget.likes.push(userID);
                        GadgetFactory.like(selectedGadget)
                            .then(function (response) {
                                $scope.gadget = selectedGadget;
                                $scope.isLiked = true;
                                self.processingLike = false;
                            }, function (error) {
                                NotificationDialog.alertUser(error.data);
                                $timeout(function () {
                                    $scope.gadget = _selectedGadget;
                                    $scope.isLiked = false;
                                    self.processingLike = false;
                                }, 2000);
                                console.error(error);
                            })
                    }
                }
            };

            self.getOemDevice();
            $state.go('view-device.specs');
            console.log(userID);
            self.isGadgetLiked(userID);
        }])