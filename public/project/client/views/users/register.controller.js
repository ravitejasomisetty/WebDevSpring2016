(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("RegisterController", RegisterController);
    function RegisterController(RenterService, $location, $rootScope) {
        var vm = this;
        vm.register = function () {
            if (vm.user.password == vm.user.verifypassword) {
                RenterService.createRenter(vm.user)
                    .then(function (res) {
                        RenterService.findRenterByCredentials(vm.user.rentername, vm.user.password)
                            .then(function (loginRes) {
                                console.log(loginRes.data);
                                if (loginRes.data) {
                                    $rootScope.user = loginRes.data;
                                    console.log($rootScope.user);
                                    alert("Welcome to GrabACar");
                                    $location.url("/profile");
                                }
                                else {
                                    alert("Registration corrupted");
                                }
                            })
                    });
            }
            else {
                alert("Passwords do not match");
            }
        };
    }
})();

