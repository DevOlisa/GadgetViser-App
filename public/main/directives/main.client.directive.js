angular.module('Main')
    .directive('gadgetShell', [function () {
        return {
            templateUrl: './main/views/gadget-shell.html',
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
    .directive('navModal', ['NavState', function(NavState) {
        return {
            restrict: 'AE',
            link: function($scope, $element, $attrs) {
                $('body').on('click', function (event) {
                    if ($(event.target).is($element)) {
                        $scope.$apply(function () {
                            NavState.isOpen = false;
                        });
                    }
                });
            }
        }
    }])
    .directive('searchModal', ['SearchBarState',function(SearchBarState) {
        return {
            restrict: 'AE',
            link: function($scope, $element, $attrs) {
                $element.on('click', function (event) {
                    if ($(event.target).is($element)) {
                        $scope.$apply(function () {
                            SearchBarState.isSearchBarHidden = true;
                        });
                    }
                });
            }
        };
    }])