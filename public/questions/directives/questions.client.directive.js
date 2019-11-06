angular.module('Questions')
    .directive('questionPanel', ['AnswerDialogService', 'AnswerService',
        function (AnswerDialogService, AnswerService) {
            return {
                templateUrl: '/main/views/question-panel.html',
                restrict: 'AE',
                scope: {
                    questionData: '='
                },
                link: function ($scope, $element, $attrs) {
                    $scope.visible = false;
                    $scope.options = false;

                    $scope.createReply = function (question) {
                        AnswerDialogService.isDialogVisible = true;
                        AnswerDialogService.answer.question = question;
                        console.log('Crafting a reply for: ');
                        console.log(question._id);
                    }

                    $scope.showDescription = function () {
                        $scope.visible = true;
                    };

                    $scope.toggleOptions = function () {
                        $scope.options = !$scope.options;
                    };

                    $scope.socialShare = function () {
                        console.log('Sharing button click!')
                    };
                }
            };
        }])
    .directive('quiModal', ['QuestionDialogService', function (QuestionDialogService) {
        return {
            restrict: 'AE',
            link: function ($scope, $element, $attrs) {
                $('body').on('click', function (event) {
                    if ($(event.target).is($element)) {
                        $scope.$apply(function () {
                            QuestionDialogService.isDialogVisible = false;
                        });
                    }
                });
            }
        };
    }])
    .directive('auiModal', ['AnswerDialogService', function (AnswerDialogService) {
        return {
            restrict: 'AE',
            scope: true,
            link: function ($scope, $element, $attrs) {

                $('body').on('click', function (event) {
                    if ($(event.target).is($element)) {
                        $scope.$apply(function () {
                            AnswerDialogService.isDialogVisible = false;
                        });
                    }
                });

                $scope.createReply = function () {
                    console.log('Trying to create a reply!')
                }
            }
        }
    }])
