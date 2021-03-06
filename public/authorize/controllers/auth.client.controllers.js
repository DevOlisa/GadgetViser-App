angular.module('Auth')
    .controller('AuthController', ['$scope', function ($scope) {
        var self = this;
    }])
    .controller('AccountDialogController', ['$scope', 'BgMask', 'AccountPageService', 
        function ($scope, BgMask, AccountPageService) {
            var self = this;
            self.currentTab = function () {
                return AccountPageService.getTab() || 'signUp';
            };
        }])
    .controller('SignInController', ['$scope', 'BgMask', 'AccountPageService','UserService',
        function ($scope, BgMask, AccountPageService, UserService) {
            var self = this;

            self.tab = 'signIn';
            self.switchTab = function () {
                AccountPageService.setTab('signUp');
            };

            $scope.togglePasswordVisibilty = function () {
                if ($scope.passwordVisible === true) {
                    $scope.signInForm.password.$$attr.$set('type', 'password');
                    $scope.passwordVisible = false;
                    return;
                }
                $scope.signInForm.password.$$attr.$set('type', 'text');
                $scope.passwordVisible = true;
            };

            $scope.submit = function () {
                if (!$scope.signInForm.$invalid) {
                    UserService.localSignIn($scope.user).then(function(user) {
                        console.log('Signing in');
                    });
                }
            };
        }])
    .controller('SignUpController', ['$scope', 'BgMask', 'AccountPageService', 'AuthService', 'UserService',
        function ($scope, BgMask, AccountPageService, AuthService, UserService) {
            var self = this;
            self.tab = 'signUp';
            self.switchTab = function () {
                AccountPageService.setTab('signIn');
            };

            $scope.togglePasswordVisibilty = function () {
                if ($scope.passwordVisible === true) {
                    $scope.signUpForm.password.$$attr.$set('type', 'password');
                    $scope.passwordVisible = false;
                    return;
                }
                $scope.signUpForm.password.$$attr.$set('type', 'text');
                $scope.passwordVisible = true;
            };

            $scope.submit = function () {
                if ($scope.signUpForm.$invalid) return;
                AuthService.login();
                // UserService.localSignUp($scope.user);
                console.log($scope.signUpForm);
            };
        }])