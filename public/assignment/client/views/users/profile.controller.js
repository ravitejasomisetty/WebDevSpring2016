(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.user = {
            "_id": $rootScope.user._id,
            "firstName": $rootScope.user.firstName,
            "lastName": $rootScope.user.lastName,
            "emails": $rootScope.user.emails,
            "roles": $rootScope.user.roles,
            "username": $rootScope.user.username,
            "password": $rootScope.user.password
        };

        $scope.update = function () {
            UserService.updateUser($scope.user._id, $scope.user)
                .then(function (res) {
                    $rootScope.user = res.data;
                    console.log(res.data);
                    alert("Profile information is successfully updated");
                });
        };
    }
})();




