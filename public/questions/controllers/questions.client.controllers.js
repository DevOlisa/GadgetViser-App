angular.module('Questions')
    .controller('QuestionsTabController', ['$scope', 'QuestionDialogService', 'QuestionService',
        function ($scope, QuestionDialogService, QuestionService) {
            let self = this;
            QuestionService.getGadgetQuestions().then(function (data) {
                $scope.gadgetQuestions = data;
            })

            self.openDialog = function () {
                QuestionDialogService.isDialogVisible = true;
            };

            // Default filter
            self.questionFilter = 'none';

            // FilterOptions
            self.filterOption = {
                'none': '',
                'unanswered': function (question) {
                    return question.answers.length === 0;
                }
            }

        }])
    .controller('QuestionController', ['AnswerDialogService', '$log', function (AnswerDialogService, $log) {

    }])
    .controller('QuestionDialogController', ['$scope', 'QuestionDialogService', 'NotificationDialog',
        function ($scope, QuestionDialogService, NotificationDialog) {
            var self = this;

            self.submit = () => {
                if (!$scope.QuestionForm.$invalid) {
                    QuestionDialogService.buildQuestion($scope.question)
                        .then(function (response) {
                            QuestionDialogService.isDialogVisible = false;
                            NotificationDialog.alertUser({ type: 'success', message: 'Question was posted' });
                            console.log(response);
                        }, function (error) {
                            QuestionDialogService.isDialogVisible = false;
                            error.status == -1 ? NotificationDialog.alertUser({type: 'warning', message: 'No internet connection'}) : NotificationDialog.alertUser('Error Creating Question')
                        });

                }
            };
        }])
    .controller('AnswerDialogController', ['$scope', 'AnswerDialogService', 'NotificationDialog',
        function ($scope, AnswerDialogService, NotificationDialog) {
            var self = this;

            self.submit = () => {
                if (!$scope.AnswerForm.$invalid) {
                    AnswerDialogService.buildAnswer($scope.answer)
                        .then(function (response) {
                            NotificationDialog.alertUser({ type: 'success', message: 'Reply has been successfully posted!' });
                            console.log(response);
                        }, function (error) {
                            console.log(error)
                            error.status == -1 ? NotificationDialog.alertUser({type: 'warning', message: 'No internet connection'}) : 
                            NotificationDialog.alertUser({ type: 'warning', message: 'Error Posting Reply' });
                        });
                }
            };
        }])