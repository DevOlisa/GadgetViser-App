angular.module('Header').controller('HeaderController', ['$scope', 'UserService', 'SearchBarState', 'NavState', 'BgMask',
 function ($scope, UserService, SearchBarState, NavState, BgMask) {
    var self = this;
    self.showMask = true;
    // servmage =  './icons/account.png'; 

    $scope.user = UserService.getUser();
    console.log($scope.user)

    self.showSearchBar = function () {
        SearchBarState.isSearchBarHidden = !SearchBarState.isSearchBarHidden;
        SearchBarState.clearText();
    };

    self.toggleSideNav = function() {
        NavState.isClosed = !NavState.isClosed;
    };
}]);