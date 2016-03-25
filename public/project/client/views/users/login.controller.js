(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("LoginController", LoginController);
    function LoginController(RenterService, $location, $rootScope) {
        var vm=this;
        vm.login = login;
        function login () {
            RenterService.findRenterByCredentials(vm.user.username, vm.user.password)
                .then(function (res) {
                if (res.data) {
                    $rootScope.user=res.data;
                    $location.url("/profile");
                }
                else {
                    alert("Unable to log you in because of the possible reason(s):\n" +
                        "1. Insufficient or invalid credentials\n" +
                        "2. You're not a registered user yet");
                }
            });
        };

        function isYoungDriver(){
            var usid=111;
            RenterService.isYoungDriver(usid)
                .then(function (res) {
                    if (res) {
                        console.log(res.data+" :id:"+usid);
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

