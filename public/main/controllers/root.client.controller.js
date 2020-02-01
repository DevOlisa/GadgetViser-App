angular.module('Main')
.controller('RootController', ['$scope', '$transitions', 'SearchBarState', 'AuthService', 'NavState', 
function($scope, $transitions, SearchBarState, AuthService, NavState) {
    $transitions.onStart({}, function() {
        if (NavState.isOpen === true) {
            NavState.isOpen = false;
        }
        
        

        if (SearchBarState.isSearchBarHidden === false) {
            SearchBarState.isSearchBarHidden = true;
        }
    });
}]);