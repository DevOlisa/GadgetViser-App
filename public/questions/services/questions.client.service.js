angular.module('Questions')
    .factory('QuestionService', ['$http', '$q', function ($http, $q) {
        var service = {};
        service.selectedGadget = null;

        service.createQuestion = (question) => {
            return $http.post('http://localhost:3000/questions', question)
                .then(function (response) {
                    return response;
                }, function (error) {
                    return $q.reject(error);
                })
        };

        service.getGadgetQuestions = function () {
            return $http.get('http://localhost:3000/questions', { params: { gadget: service.selectedGadget } })
                .then(function (response) {
                    if (response.status === 200) {
                        return response.data;
                    }
                }, function (error) {
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
            QuestionService.createQuestion(self.question)
            .then(function(response) {
                console.log(response);
                service.isDialogVisible = false;
            }, function(error) {
                // service.isDialogVisible = false;
                console.log(error);
            })
        }

        return service;
    }])
    .factory('AnswerService', ['$http', function ($http) {
        var service = {};

        service.updateQuestion = function(answer) {
            return $http.post('http://localhost:3000/answers', answer)
                .then(function (response) {
                    return response;
                }, function (error) {
                    console.error(error);
                })
        };

        return service;
    }])
    .factory('AnswerDialogService', ['AnswerService', function (AnswerService) {
        var service = {};
        service.answer = {};
        service.isDialogVisible = false;

        service.buildAnswer = function (answer) {
            service.answer.content = answer.content;
            AnswerService.updateQuestion(service.answer)
            .then(function(response) {
                alert('Message Posted')
                service.isDialogVisible = false;
            }) 
        };

        return service;
    }])
