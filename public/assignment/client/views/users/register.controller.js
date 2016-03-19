(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, UserService, $location, $rootScope) {

        $scope.register = function () {
            $scope.user.firstName = "";
            $scope.user.lastName = "";
            $scope.user.roles = "";
            if ($scope.user.password == $scope.user.verifypassword) {
                UserService.createUser($scope.user)
                    .then(function (res) {
                        $rootScope.user = res.data;
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

