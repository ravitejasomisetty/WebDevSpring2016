(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("LoginController", LoginController);
    function LoginController($scope, UserService, $location, $rootScope) {
        $scope.login = function () {
            UserService.findUserByCredentials($scope.user.username, $scope.user.password, function (res) {
                if (res) {
                    $rootScope.user=res;
                    $location.url("/profile");
                }
                else {
                    alert("Unable to log you in because of the possible reason(s):\n" +
                        "1. Insufficient or invalid credentials\n" +
                        "2. You're not a registered user yet");
                }
            });
        };
    }
})();

