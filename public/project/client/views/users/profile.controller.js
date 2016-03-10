(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.user = {
            "_id": $rootScope.user._id,
            "firstName": $rootScope.user.firstName,
            "lastName": $rootScope.user.lastName,
            "email": $rootScope.user.email,
            "roles": $rootScope.user.roles,
            "username": $rootScope.user.username,
            "password": $rootScope.user.password
        };

        $scope.update = function () {
            UserService.updateUser($scope.user._id, $scope.user, function (res) {
                $rootScope.user=res;
                alert("Profile information is successfully updated");
            });
        };
    }
})();




