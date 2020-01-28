angular.module('Main')
.factory('NotificationDialog', ['$timeout', function($timeout) {
    let service = {};
    service.isDialogVisible = false;
    service.message = null;
    service.type = null;

    service.prepareMessage = function(data) {
        switch (typeof data) {
            case "object":
                service.type = data.type;
                service.message = data.message;
                break;
            default:
                service.message = data;
        }
    };

    service.reset = function() {
        service.isDialogVisible = false;
    };

    service.alertUser = function(data) {
        service.prepareMessage(data);
        service.isDialogVisible = true;
        $timeout(service.reset, 4000, function() {
            service.message = null;
        });
    };

    return service;
}])