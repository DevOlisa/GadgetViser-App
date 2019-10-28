angular.module('Search')
.factory('ResultProvider', ['$http', '$q', function($http, $q) {
     var service = {};

     service.searchString= function(searchText) {
        return $http.get('http://localhost:3000/search/' + searchText)
        .then(function(response) {
            console.log(response);
            return response.data;
        }, function(error) {
            console.error(error);
            return $q.reject(error);
        })
     };

     return service;
}]);