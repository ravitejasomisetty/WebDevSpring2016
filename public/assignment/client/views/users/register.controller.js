(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, UserService, $location, $rootScope) {

        $scope.register = function () {
            $scope.user.firstname = "";
            $scope.user.lastname = "";
            $scope.user.roles = "";
            if ($scope.user.password == $scope.user.verifypassword) {
                UserService.createUser($scope.user, function (res) {
                    $rootScope.user = res;
                    alert("Welcome to FormBuilder App");
                });
                $location.url("/profile");
            }
            else {
                alert("Passwords do not match");
            }
        };
    }
})();

