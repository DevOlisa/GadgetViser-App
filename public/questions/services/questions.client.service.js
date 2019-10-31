angular.module('Questions')
    .factory('QuestionService', ['$BgMask', function ($BgMask) {
        var self = this;
    }])
    .factory('QuestionDialogService', [function () {
        var service = {};
        service.isDialogVisible = false;
        return service;
    }])