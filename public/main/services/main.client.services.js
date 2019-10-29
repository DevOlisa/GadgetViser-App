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
    self.searchText = '';
    self.isSearchBarHidden = true;

    self.getState = function() {
        return self.isSearchBarHidden;
    };

    self.getText = () => {
        return self.searchText;
    };

    self.clearText = () => {
        self.searchText = '';
        console.log('Clearing');
    };
}])
.factory('ObjectStateService', [function() {
    let self = this;
    self.state = {};
    self.getState = function() {
        return self.state;
    };
    return self;
}])
.factory('RouteStateService', [function() {
    let service = [];
    return service;
}])
