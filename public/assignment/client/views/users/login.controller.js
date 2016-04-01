(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController(UserService, $location) {
        var vm=this;
        vm.login = function () {
            UserService.findUserByCredentials(vm.user.username, vm.user.password)
                .then(function (res) {
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

