angular.module('Main').service('BgMask', [function () {
    this.mask = $(document).find('.gad-shell-mask');
    this.toggle = function () {
        this.mask.toggleClass('blur');
    };
}])
.service('NavState', ['$rootScope', function($rootScope) {
    let self= this;
    self.isOpen = false;
    self.getState = function() {
        return self.NavOpen;
    };
    $rootScope.$on("$routeChangeSuccess", function(e, args) {
        if (self.isOpen === true) self.isOpen = false;
    });
}])
.service('SearchBarState', ['$rootScope', function($rootScope) {
    let self= this;
    self.isSearchBarHidden = true;
    self.getState = function() {
        return self.isSearchBarHidden;
    };
    $rootScope.$on("$routeChangeSuccess", function(e, args) {
        if (self.isSearchBarHidden === true) self.isSearchBarHidden = false;
    });
}])
.service('ObjectStateService', [function() {
    let self = this;
    self.state = null;
    self.getState = function() {
        return self.state;
    };
}])