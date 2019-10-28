angular.module('Search').controller('SearchController', ['$scope', 'ResultProvider', 'NavState', 'BgMask',

    function ($scope, ResultProvider, NavState, BgMask) {
        var self = this;
        $scope.searchText = '';
        $scope.searchResult = null;

        $scope.$watch('searchText', function (n, o) {
            console.log(n)
            if (n && (n !== '' || n !== o) ) {
                ResultProvider.searchString(n)
                    .then(function (response) {
                        console.log(response);
                        $scope.searchResult = response
                    }, function (error) {
                        console.error(error);
                    })
            } else if(n === '') {
                $scope.searchResult = null;
            }
        });
    }]);