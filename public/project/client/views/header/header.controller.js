(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("HeaderController", HeaderController);
    function HeaderController($location, RenterService) {
        var vm = this;
        vm.$location = $location;
        vm.logout = logout;

        function logout() {
            RenterService.logout()
                .then(function () {
                    RenterService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();