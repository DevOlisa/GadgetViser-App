angular.module('Admin').controller('AddDeviceController', ['$scope', 'GadgetFactory', 
function ($scope, GadgetFactory) {
    var self = this;
    self.deviceType = [
        { label: 'Mobile Phone', value: 'Phone', selected: true },
        { label: 'Laptops & UltraBooks', value: 'Laptop' },
        { label: 'Tablet', value: 'Tablet' },
    ];

    self.deviceCategory = [
        { label: 'Gaming', value: 'gaming', selected: true },
        { label: 'Battery Champ', value: 'battery' },
        { label: 'Best Camera', value: 'camera' },
    ];

    self.gadgetCameras = [];

    self.addCam = function() {
        let cam = {};
        cam.id = 'camera-' + (self.gadgetCameras.length + 1);
        self.gadgetCameras.push(cam);
        console.log(self.gadgetCameras);
    };

    self.submit = function () {
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
            console.log(device);

            GadgetFactory.addGadget(device)
            .then(function(response) {
                
            }, function(error) {

            })
            // $scope.addDeviceForm.$setPristine();
        }
    };
}]);