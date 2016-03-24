(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, RenterService) {
        var vm=this;
        vm.user = {
            "_id": $rootScope.user._id,
            "firstName": $rootScope.user.firstName,
            "lastName": $rootScope.user.lastName,
            "email": $rootScope.user.email,
            "roles": $rootScope.user.roles,
            "username": $rootScope.user.username,
            "password": $rootScope.user.password
        };

        vm.update = update;

        function update() {
            RenterService.updateUser(vm.user._id, vm.user, function (res) {
                $rootScope.user=res;
                alert("Profile information is successfully updated");
            });
        };
    }
})();




