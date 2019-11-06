angular.module('Main')
    .factory('GadgetFactory', ['$resource', '$http', '$q', function ($resource, $http, $q) {
        var service = {};
        var newGadget = true;

        service.addGadget = function (gadget) {
            if (gadget.name) {
                GadgetToSave = angular.copy(gadget);
                GadgetToSave.link = (GadgetToSave.oem + '-' + GadgetToSave.name).toLowerCase().replace(/\s+/gi, '-');
                return $http.post('http://localhost:3000/gadgets', GadgetToSave)
                    .then(function (response) {
                        alert(GadgetToSave.name + ' was added to the database successfully!');
                        return GadgetToSave;
                    });
            }
        };

        service.like = function(gadget) {
            return $http.put('http://localhost:3000/gadgets', gadget)
            .then(function(response) {
                if (response.data) {
                    return response;
                }
            }, function(error) {
                $q.reject(error);
            })
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
            return GadgetFactory.getGadget(link)
                .then(function (gadget) {
                    buildGadget = gadget;
                    return buildGadget;
                }, function (err) {
                    console.log('In Error: ' + err);
                });
        };

        return service;

    }])