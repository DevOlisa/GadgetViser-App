angular.module('Header').controller('HeaderController', ['$scope', 'UserService', 'SearchBarState', 'NavState', 'BgMask',
 function ($scope, UserService, SearchBarState, NavState, BgMask) {
    var self = this;
    self.showMask = true;
    $scope.image = sessionStorage.getItem('image') || './icons/account.png' ; 

    $scope.user = UserService.getUser();
    $scope.$on('userLoggedIn', function(e, args) {
        alert('User logged in')
    })

    self.showSearchBar = function () {
        SearchBarState.isSearchBarHidden = !SearchBarState.isSearchBarHidden;
        SearchBarState.clearText();
    };

    self.toggleSideNav = function() {
        NavState.toggleState();
    };
}]);