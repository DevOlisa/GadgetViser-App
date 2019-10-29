angular.module('Search').controller('SearchController', ['$scope', 'ResultProvider', 'SearchBarState', 'NavState', 'BgMask',

    function ($scope, ResultProvider, SearchBarState, NavState, BgMask) {
        var self = this;
        $scope.searchText = '';
        $scope.searchResult = null;
        $scope.searching = false;

        $scope.clearText = () => {
            $scope.searchText = '';
        };

        $scope.$watch('searchText', function (n, o) {
            console.log(n)
            if (n && (n !== '' || n !== o) ) {
                $scope.searching = true;
                ResultProvider.searchString(n)
                    .then(function (response) {
                        console.log(response);
                        $scope.searchResult = response;
                        $scope.searching = false;
                    }, function (error) {
                        $scope.searching = false;
                        console.error(error);
                    })
            } else if(n === '') {
                $scope.searchResult = null;
            }
        });
    }]);