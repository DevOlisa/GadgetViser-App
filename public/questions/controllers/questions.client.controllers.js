angular.module('Questions')
    .controller('QuestionsTabController', ['$scope', 'QuestionDialogService', 'QuestionService', 
    function ($scope, QuestionDialogService, QuestionService) {
        let self = this;
        QuestionService.getGadgetQuestions().then(function(data) {
            $scope.gadgetQuestions = data;
        })

        self.openDialog = () => {
            QuestionDialogService.isDialogVisible = true;
        };
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