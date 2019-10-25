angular.module('Admin').config(function ($routeProvider) {
    $routeProvider.when('/admin/add-device', {
        templateUrl: './admin/views/add-gadget.html',
        controller: 'AddDeviceController', 
        controllerAs: 'addCtrl'
    });
});