angular.module('Questions')
    .factory('QuestionService', ['$http', function ($http, BgMask,) {
        var service = {};
        service.selectedGadget = null;

        service.createQuestion = (question) => {
            return $http.post('http://localhost:3000/questions', question)
            .then(function(response) {
                console.log(response);
            }, function(error) {
                console.error(error);
            })
        };

        service.getGadgetQuestions = function() {
            return $http.get('http://localhost:3000/questions', {params: {gadget: service.selectedGadget}})
            .then(function(response) {
                if (response.status === 200) {
                    return response.data;
                }
            }, function(error) {
                console.error(error);
            });
        };

        return service;
    }])
    .factory('QuestionDialogService', ['QuestionService', function (QuestionService) {
        var service = {};
        service.isDialogVisible = false;
        service.selectedGadget = null;
        self.question = {};

        service.buildQuestion = (question) => {
            self.question = question;
            self.question.gadget = service.selectedGadget;
            QuestionService.createQuestion(self.question);
        }
        
        return service;
    }])
