angular.module('Questions')
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