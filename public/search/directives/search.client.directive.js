angular.module('Search')
.directive('search-modal', ['SearchBarState',function(SearchBarState) {
    return {
        restrict: 'AE',
        link: function($scope, $element, $attrs) {
            $('body').on('click', function (event) {
                if ($(event.target).is($element)) {
                    $scope.$apply(function () {
                        SearchBarState.isSearchBarHidden = true;
                        console.log(SearchBarState.isSearchBarHidden);
                        console.log("Got here");
                    });
                }
            });
        }
    };
}])