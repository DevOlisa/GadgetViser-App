angular.module('Main')
    .directive('gadgetShell', [function () {
        return {
            templateUrl: './main/views/gadget-shell.html',
            restrict: 'AE'
        };
    }])
    .directive('questionPanel', [function () {
        return {
            templateUrl: '/main/views/question-panel.html',
            restrict: 'AE'
        };
    }])
    .directive('slideIndicator', ['$compile', function ($compile) {
        return {
            restrict: 'AE',
            link: function ($scope, $element, $attrs) {
                $scope.showLinkedItem = function() {
                    $scope.$parent.fCtrl.index = $scope.$parent.fCtrl.FeaturedArticles.indexOf($scope.item) - 1;
                    $scope.$parent.fCtrl.currentFeaturedArticle = $scope.item;
                };
            }
        };
    }])