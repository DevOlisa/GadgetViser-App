angular.module('Search').filter('highlight', ['$sce', function($sce) {

    return function(string, substring) {
        let replacement = $sce.trustAsHtml('<span class="highlight-string">' + substring + '</span>');
        return string.replace(new RegExp(substring, 'i'), replacement);
    };
}])