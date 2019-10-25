angular.module('Main')
.controller('RootController', ['$scope', 'RouteStateService', function($scope, RouteStateService) {
    $scope.$on('$routeChangeSuccess', function(event, current, previous) {
        RouteStateService.currentRoute = current;
        // console.log(RouteStateService);
    })
}]);