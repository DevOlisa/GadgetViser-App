angular.module('Questions')
    .controller('QuestionsTabController', ['$scope', 'QuestionDialogService', function ($scope, QuestionDialogService) {
        let self = this;
        self.openDialog = () => {
            QuestionDialogService.isDialogVisible = true;
        };
    }]) 