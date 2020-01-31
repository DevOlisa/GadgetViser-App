angular.module('Search')
.factory('ResultProvider', ['$http', '$q', 'NotificationDialog', function($http, $q, NotificationDialog) {
     var service = {};

     service.searchString= function(searchText) {
        return $http.get('http://localhost:3000/search/' + searchText)
        .then(function(response) {
            return response.data;
        }, function(error) {
            console.error(error);
            error.status == -1 ? NotificationDialog.alertUser({type: 'warning', message: 'No internet connection'}) : 
                            NotificationDialog.alertUser({ type: 'warning', message: 'Error Fetching Results' });
            return $q.reject(error);
        })
     };

     return service;
}]);