(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("RegisterController", RegisterController);
    function RegisterController(RenterService, $location, $rootScope) {
        var vm = this;
        vm.register = function () {
            if (vm.user.password == vm.user.verifypassword) {
                vm.user.status="Waiting for approval";
                RenterService.createRenter(vm.user)
                    .then(function (res) {
                        RenterService.findRenterByCredentials(vm.user.username, vm.user.password,vm.user)
                            .then(function (loginRes) {
                                if (loginRes.data) {
                                    $rootScope.user = loginRes.data;
                                    alert("Welcome to GrabACar");
                                    $location.url("/profile/"+loginRes.data._id);
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

