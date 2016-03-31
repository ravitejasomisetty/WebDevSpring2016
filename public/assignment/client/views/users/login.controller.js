(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, UserService, $location) {
        $scope.login = function () {
            UserService.findUserByCredentials($scope.user.username, $scope.user.password)
                .then(function (res) {
                    console.log(res);
                if (res.data) {
                    UserService.setCurrentUser(res.data);
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

