(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("LoginController", LoginController);
    function LoginController(RenterService, $location, $rootScope, TellerService) {
        var vm = this;
        vm.login = login;
        function login() {
            if (vm.user.renter) {
                RenterService.findRenterByCredentials(vm.user.username, vm.user.password)
                    .then(function (res) {
                        if (res.data.length > 0 && res.data.status.indexOf("Declined") < 0) {
                            $rootScope.user = res.data;
                            $location.url("/profile/" + res.data.rentername);
                        }
                        else {
                            alert("Unable to log you in because of the possible reason(s):\n" +
                                "1. Insufficient or invalid credentials\n" +
                                "2. You're not a registered user yet" +
                                "3. Your membership had been declined");
                        }
                    }, function (err) {
                        alert("System cannot log you in at this point of time");
                    });
            }
            else if (vm.user.teller) {
                TellerService.findTellerByCredentials(vm.user.username, vm.user.password)
                    .then(function (res) {
                        if (res.data.length > 0) {
                            $rootScope.user = res.data;
                            $location.url("/admin");
                        }
                        else {
                            alert("Unable to log you in because of the possible reason(s):\n" +
                                "1. Insufficient or invalid credentials\n" +
                                "2. You're not a registered user yet");
                        }
                    });
            }
        }

        function isYoungDriver() {
            var usid = 111;
            RenterService.isYoungDriver(usid)
                .then(function (res) {
                    if (res) {
                        $location.url("/profile");
                    }
                    else {
                        alert("Unable to log you in because of the possible reason(s):\n" +
                            "1. Insufficient or invalid credentials\n" +
                            "2. You're not a registered user yet");
                    }
                });
        }
    }
})();

