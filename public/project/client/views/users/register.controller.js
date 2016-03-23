(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("RegisterController", RegisterController);
    function RegisterController(UserService, $location, $rootScope) {
        var vm=this;
        vm.register = function () {
            if (vm.user.password == vm.user.verifypassword) {
                UserService.createUser(vm.user, function (res) {
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

