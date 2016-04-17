(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("HeaderController", HeaderController);
    function HeaderController($location, RenterService) {
        var vm = this;
        vm.redirectToRenters = redirectToRenters;
        vm.$location = $location;
        vm.logout = logout;

        function logout() {
            RenterService.logout()
                .then(function () {
                    RenterService.setCurrentUser(null);
                    $location.url("/home");
                });
        }

        function redirectToRenters(searchRenterName) {
            if (searchRenterName)
                $location.url("/admin/" + searchRenterName);
        }
    }
})();