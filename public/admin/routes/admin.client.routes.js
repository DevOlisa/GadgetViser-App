angular.module('Admin')
    .config(function ($stateProvider) {
        $stateProvider
            .state('addDevice', {
                url: '/admin/add-device',
                templateUrl: './admin/views/add-gadget.html',
                controller: 'AddDeviceController',
                controllerAs: 'addCtrl'
            });
    });