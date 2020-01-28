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
    .factory('QuestionDialogService', ['$q', 'QuestionService', function ($q, QuestionService) {
        var service = {};
        service.isDialogVisible = false;
        service.selectedGadget = null;
        self.question = {};

        service.buildQuestion = (question) => {
            var defer = $q.defer();

            self.question = question;
            self.question.gadget = service.selectedGadget;
            QuestionService.createQuestion(self.question)
            .then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });
            return defer.promise;
        };

        return service;
    }])
    .factory('AnswerService', ['$http', '$q', function ($http, $q) {
        var service = {};

        service.updateQuestion = function(answer) {
            return $http.post('http://localhost:3000/answers', answer)
                .then(function (response) {
                    return $q.resolve(response);
                }, function (error) {
                    return $q.reject(error);
                })
        };

        return service;
    }])
    .factory('AnswerDialogService', ['$q', 'AnswerService', function ($q, AnswerService) {
        var service = {};
        service.answer = {};
        service.isDialogVisible = false;

        service.buildAnswer = function (answer) {
            var defer = $q.defer();
            service.answer.content = answer.content;
            AnswerService.updateQuestion(service.answer)
            .then(function(response) {
                service.isDialogVisible = false;
                defer.resolve(response);
                // return response;
            },
            function(error) {
                // service.isDialogVisible = false;
                // return $q.reject(error);
                defer.reject(error);
            })
            return defer.promise;
        };

        return service;
    }])
