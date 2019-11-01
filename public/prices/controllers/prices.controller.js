angular.module('Prices')
    .controller('PricesController', ['$scope', function ($scope) {
        var self = this;
        self.stores = [1, 2, 3];
        
        self.showModal = false;
        self.modal = '';

        self.openModal = function (arg) {
            if (arg == 'filter' || arg == 'settings') {
                self.showModal = !self.showModal;
                self.modal = arg;
                return;
            }
        }

        self.closeModal = function () {
            self.showModal = false;
            return;
        };

    }]).controller('PriceSettingController', [ function() {
        var self = this;
    }])