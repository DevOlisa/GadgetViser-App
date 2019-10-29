angular.module('Header').controller('HeaderController', ['$scope', 'SearchBarState', 'NavState', 'BgMask', function ($scope, SearchBarState, NavState, BgMask) {
    var self = this;
    self.showMask = true;

    self.showSearchBar = function () {
        SearchBarState.isSearchBarHidden = !SearchBarState.isSearchBarHidden;
        SearchBarState.clearText();
    };

    self.toggleSideNav = function() {
        NavState.isOpen = !NavState.isOpen;
    };
}]);