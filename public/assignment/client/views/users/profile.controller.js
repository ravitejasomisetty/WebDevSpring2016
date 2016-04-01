(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var vm=this;
        vm.user = {
            "_id": $rootScope.user._id,
            "firstName": $rootScope.user.firstName,
            "lastName": $rootScope.user.lastName,
            "emails": $rootScope.user.emails,
            "roles": $rootScope.user.roles,
            "username": $rootScope.user.username,
            "password": $rootScope.user.password
        };

        vm.update = function () {
            UserService.updateUser(vm.user._id, vm.user)
                .then(function (res) {
                    $rootScope.user = res.data;
                    alert("Profile information is successfully updated");
                });
        };
    }
})();




