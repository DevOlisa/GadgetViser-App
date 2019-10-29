angular.module('Main')
.controller('RootController', ['$scope', 'RouteStateService', 'SearchBarState', 
function($scope, RouteStateService, SearchBarState) {
    $scope.$on('$routeChangeSuccess', function(event, current, previous) {
        RouteStateService.currentRoute = current;
        if (SearchBarState.isSearchBarHidden === false) SearchBarState.isSearchBarHidden = true;
        
        // console.log(RouteStateService);
    })
}]);