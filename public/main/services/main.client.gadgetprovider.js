angular.module('Main')
    .factory('GadgetFactory', ['$resource', '$http', '$q', 'NotificationDialog', function ($resource, $http, $q, NotificationDialog) {
        var service = {};
        var newGadget = true;

        service.addGadget = function (gadget) {
            console.log(gadget)
            if (gadget.name) {
                GadgetToSave = angular.copy(gadget);
                GadgetToSave.link = (GadgetToSave.oem + '-' + GadgetToSave.name).toLowerCase().replace(/\s+/gi, '-');
                return $http.post('http://localhost:3000/gadgets', GadgetToSave)
                    .then(function (response) {
                        NotificationDialog.alertUser(GadgetToSave.name + ' was added to the database successfully!');
                        console.log(response);
                        return GadgetToSave;
                    }, function(error) {
                        return $q.reject(error);
                    });
            }
        };

        service.like = function (gadget) {
            return $http.put('http://localhost:3000/gadgets', gadget)
                .then(function (response) {
                    if (response && response.status < 200) {
                        return $q.reject(response);
                    }
                    if (response.status === 200 && response.data.nModified === 1) {
                        console.log(response);
                        return response;
                    }
                }, function (error) {
                    return $q.reject(error);
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