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
                        UserService.findUserByCredentials(res.data.username,res.data.password)
                        .then(function (res) {
                                if (res.data) {
                                    $rootScope.user = res.data;
                                    alert("Welcome to FormBuilder App");
                                    $location.url("/profile");
                                }
                                else {
                                    alert("Unable to log you in because of the possible reason(s):\n" +
                                        "1. Insufficient or invalid credentials\n" +
                                        "2. You're not a registered user yet");
                                }
                            });

                    });
            }
            else {
                alert("Passwords do not match");
            }
        };
    }
})();

