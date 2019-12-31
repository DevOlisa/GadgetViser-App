angular.module('Main').service('BgMask', [function () {
    this.mask = $(document).find('.gad-shell-mask');
    this.toggle = function () {
        this.mask.toggleClass('blur');
    };
}])
.factory('NavState', function() {
    let service = {};
    service.isOpen = false;

    service.toggleState = () => {
        service.isOpen = !service.isOpen;
    };

    return service;
})
.service('SearchBarState', function() {
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
})
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
