(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController( UserService, $location, $rootScope) {
        var vm=this;
        vm.register = function () {
            vm.user.firstName = "";
            vm.user.lastName = "";
            vm.user.roles = "";
            if (vm.user.password == vm.user.verifypassword) {
                UserService.createUser(vm.user)
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

