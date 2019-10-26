angular.module('Main').service('TestObjects', ['$resource', '$http', '$q', 'GadgetFactory',
    function ($resource, $http, $q, GadgetFactory) {


    }])
    .factory('GadgetFactory', ['$resource', '$http', function ($resource, $http) {
        var service = {};
        var newGadget = true;
        service.Gadget = $resource('http://localhost:3000/gadgets', {}, { update: { action: 'PUT' } }).$promise;

        service.addGadget = function (gadget) {
            if (gadget.name) {
                GadgetToSave = angular.copy(gadget);
                GadgetToSave.link = (GadgetToSave.oem + '-' + GadgetToSave.name).toLowerCase().replace(/\s+/gi, '-');
                return $http.post('http://localhost:3000/gadgets', GadgetToSave)
                    .then(function (response) {
                        return GadgetToSave;
                        alert( GadgetToSave.name + ' was added to the database successfully!');
                    });
            }
        };

        service.getGadget = function (link) {
            return $http.get('http://localhost:3000/gadget/' + link)
                .then(function (response) {
                    return response.data;
                });
        };

        service.getGadgets = function (opt) {
            return $http.get('http://localhost:3000/gadgets', { params: opt })
                .then(function (response) {
                    return response.data;
                });
        };

        return service;

    }])
    .factory('GadgetBuilder', ['GadgetFactory', function (GadgetFactory) {
        var service = {};
        var buildGadget;

        service.save = function () {
            var promise = newGadget ? GadgetFactory.addGadget(Gadget)
                : GadgetFactory.updateGadget(Gadget);
            promise.then(function () {
                newGadget = false;
            });
            return promise;
        };

        service.fetch = function (link) {
            return GadgetFactory.getGadget(link).then(function (gadget) {
                buildGadget = gadget;
                return buildGadget;
                console.log(buildGadget);
            }, function (err) {
                console.log('In Error: ' + err);
            });
        };

        return service;

    }])