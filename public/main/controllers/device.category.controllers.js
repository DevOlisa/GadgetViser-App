angular.module('Main')
.controller('GadgetCategoryController', ['$scope', '$location', 'RouteStateService', 'GadgetBuilder', 
function( $scope, $location, RouteStateService, GadgetBuilder) {
    var self = this;
    self.category = RouteStateService.currentRoute.category;
    self.fetchLatestDevices
}])
.controller('TrendingNewsController', ['$scope', function($scope) {
    var self = this;
}])