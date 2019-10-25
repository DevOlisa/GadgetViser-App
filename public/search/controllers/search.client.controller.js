angular.module('Search').controller('SearchBarController', ['$scope', 'SearchBarState', 'NavState', 'BgMask', 
function ($scope, SearchBarState, NavState, BgMask) {
    var self = this;
    self.showMask = true;

    
    // self.showSearchBar = function () {
    //     SearchBarState.isSearchBarHidden = !SearchBarState.isSearchBarHidden;
    // };

    // self.toggleSideNav = function() {
    //     NavState.isOpen = !NavState.isOpen;
    // };
}]);