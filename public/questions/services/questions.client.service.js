angular.module('Questions')
    .factory('QuestionService', ['$http', function ($http) {
        var service = {};
        service.selectedGadget = null;

        service.createQuestion = (question) => {
            return $http.post('http://localhost:3000/questions', question)
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.error(error);
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
            QuestionService.createQuestion(self.question);
        }

        return service;
    }])
    .factory('AnswerService', ['$http', function ($http) {
        var service = {};
        service.createAnswer = function (question, answer) {
            return $http.post('http://localhost:3000/answers', answer)
                .then(function (response) {
                    return response;
                }, function (error) {
                    console.error(error);
                })
                .then(function(response) {
                    console.log(response.data);
                    return $http.put('http://localhost:3000/questions')
                }, function(error) {

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
            AnswerService.createAnswer(service.answer)
            .then(function(response) {
                alert('Message Posted')
                service.isDialogVisible = false;
            }) 
        };

        return service;
    }])
