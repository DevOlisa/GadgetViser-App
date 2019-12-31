angular.module('Questions')
    .controller('QuestionsTabController', ['$scope', 'QuestionDialogService', 'QuestionService', 
    function ($scope, QuestionDialogService, QuestionService) {
        let self = this;
        QuestionService.getGadgetQuestions().then(function(data) {
            $scope.gadgetQuestions = data;
        })

        self.openDialog = function() {
            QuestionDialogService.isDialogVisible = true;
        };

        // Default filter
        self.questionFilter = 'none';

        // FilterOptions
        self.filterOption = {
            'none': '',
            'unanswered': function(question) {
                return question.answers.length === 0;
            }
        }
        
    }])
    .controller('QuestionController', ['AnswerDialogService', '$log', function (AnswerDialogService, $log) {

    }])
    .controller('QuestionDialogController', ['$scope', 'QuestionDialogService', 'QuestionService', 
        function($scope, QuestionDialogService, QuestionService) {
            var self =  this;

            self.submit = () => {
                if (!$scope.QuestionForm.$invalid) {
                    QuestionDialogService.buildQuestion($scope.question);
                }
            };
    }])
    .controller('AnswerDialogController', ['$scope', 'AnswerDialogService', 'AnswerService', 
        function($scope, AnswerDialogService, AnswerService) {
            var self =  this;

            self.submit = () => {
                if (!$scope.AnswerForm.$invalid) {
                    AnswerDialogService.buildAnswer($scope.answer);
                }
            };
    }])