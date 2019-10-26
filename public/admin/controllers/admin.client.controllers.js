angular.module('Admin').controller('AddDeviceController', ['$scope', 'GadgetFactory', 
function ($scope, GadgetFactory) {
    var self = this;
    self.deviceType = [
        { label: 'Mobile Phone', value: 'Phone', selected: true },
        { label: 'Laptops & UltraBooks', value: 'Laptop' },
        { label: 'Tablet', value: 'Tablet' },
    ];

    self.submit = function () {
        // console.log($scope.addDeviceForm);
        // console.log(GadgetFactory);

        if (!$scope.addDeviceForm.$invalid) {
            var device = angular.copy($scope.device);

            switch (device.type) {
                case "Laptop":
                    device.image = './img/laptop_pics/' + $scope.device.image;
                    break;
                case "Tablet":
                    device.image = './img/tablet_pics/' + $scope.device.image;
                    break;
                default:
                    device.image = './img/phone_pics/' + $scope.device.image;
            }

            GadgetFactory.addGadget(device);
            $scope.addDeviceForm.$setPristine();
        }
    };
}]);