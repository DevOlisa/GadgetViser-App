angular.module('News')
.directive('newsItem', [function () {
    return {
        templateUrl: './news/partials/news-item-widget.html',
        restrict: 'AE',
        link: function ($scope, $element, $attrs) {
            $scope.selectArticle = function() {
                if ($scope.$parent.selectedArticle === $scope.article._id) return;
                $scope.$parent.selectedArticle = $scope.article._id;
            };
        }
    };
}]);