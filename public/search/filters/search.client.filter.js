angular.module('Search').filter('highlight', ['$sce', function ($sce) {

    return function (string, substring) {
        return string.replace(new RegExp(substring, 'i'),
            $sce.trustAsHtml('<span class="highlight-string">' + substring + '</span>'));
    };
}])