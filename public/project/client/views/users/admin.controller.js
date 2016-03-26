(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("AdminController", AdminController);
    function AdminController(RenterService) {
        var vm = this;
        vm.approve = approve;
        vm.decline=decline;
        vm.isYoungDriver=isYoungDriver;

        RenterService.findAllRenters()
            .then(function (renters) {
                vm.users = renters.data;
            });

        function approve(user) {
            user.status = "Approved";
            user.approved = true;
            user.declined = false;
            RenterService.updateRenter(user._id, user)
                .then(function (renters) {
                    vm.users = renters.data;
                })
        }

        function decline(user) {
            user.status = "Declined";
            user.declined = true;
            user.approved = false;
            RenterService.updateRenter(user._id, user)
                .then(function (renters) {
                    vm.users = renters.data;
                })
        }
    }
})();