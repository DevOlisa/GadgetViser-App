angular.module('Auth')
    .service('AccountPageService', ['$resource', function ($resource) {
        var self = this;
        self.tab = 'signIn';
        self.setTab = function (arg) {
            self.tab = arg;
        };
        self.getTab = function () {
            return self.tab;
        };
    }])
    .factory('AuthService', ['$rootScope', '$state', 'angularAuth0', '$timeout',
  function ( $rootScope, $state, angularAuth0, $timeout) {

    console.log('in AuthService');
    var service = {};
    var accessToken;
    var idToken;
    var expiresAt;

    service.getIdToken = function() {
      return idToken;
    }

    service.getAccessToken = function() {
      return accessToken;
    }

    service.login = function() {
      angularAuth0.authorize();
    }

    service.handleAuthentication = function() {
      angularAuth0.parseHash(function (err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          service.localLogin(authResult);
          $state.go('home');
        } else if (err) {
          $timeout(function () {
            $state.go('home');
          });
          console.log(err);
          alert('Error: ' + err.error + '. Check the console for further details.');
        }
      });
    }

    service.localLogin = function(authResult) {
      // Set isLoggedIn flag in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // Set the time that the access token will expire at
      expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
      accessToken = authResult.accessToken;
      idToken = authResult.idToken;
      $rootScope.$broadcast('userLoggedIn');
    }

    service.renewTokens = function() {
      angularAuth0.checkSession({},
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            localLogin(result);
          }
        }
      );
    }

    service.logout = function() {
      // Remove isLoggedIn flag from localStorage
      localStorage.removeItem('isLoggedIn');
      // Remove tokens and expiry time
      accessToken = '';
      idToken = '';
      expiresAt = 0;

      angularAuth0.logout({
        returnTo: window.location.origin
      });

      $state.go('home');
    }

    service.isAuthenticated = function() {
      // Check whether the current time is past the 
      // access token's expiry time
      return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiresAt;
    }

    return service;
  }]);
