(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("LoginController", LoginController);
    function LoginController(RenterService, $location, $rootScope, TellerService) {
        var vm = this;
        vm.login = login;
        function login(userString) {
            if (userString=="renter") {
                RenterService.findRenterByCredentials(vm.user.username, vm.user.password,vm.user)
                    .then(function (res) {
                        if (res.data.status && res.data.status.indexOf("Declined") < 0) {
                            $rootScope.user = res.data;
                            $location.url("/profile/" + res.data._id);
                        }
                        else {
                            alert("Unable to log you in because of the possible reason(s):\n" +
                                "1. Insufficient or invalid credentials\n" +
                                "2. You're not a registered user yet\n" +
                                "3. Your membership had been declined");
                        }
                    }, function (err) {
                        alert("Unable to log you in because of the possible reason(s):\n" +
                            "1. Insufficient or invalid credentials\n" +
                            "2. You're not a registered user yet\n" +
                            "3. Your membership had been declined");
                    });
            }
            else if (userString=="teller") {
                TellerService.findTellerByCredentials(vm.user.username, vm.user.password,vm.user)
                    .then(function (res) {
                        if (res.data) {
                            $rootScope.user = res.data;
                            $location.url("/admin");
                        }
                        else {
                            alert("Invalid credentials for teller login" );

                        }
                    }, function (err) {
                        alert("Invalid credentials for teller login" );
                    });
            }
        }
    }
})();

