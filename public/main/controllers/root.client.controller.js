angular.module('Main')
.controller('RootController', ['$scope', '$transitions', 'SearchBarState', 'NavState', 
function($scope, $transitions, SearchBarState, NavState) {
    $transitions.onStart({}, function() {
        if (NavState.isClosed === false) {
            NavState.isClosed = true;
        }
        if (SearchBarState.isSearchBarHidden === false) {
            SearchBarState.isSearchBarHidden = true;
        }
    });
}]);