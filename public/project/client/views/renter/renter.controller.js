/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("RenterController", RenterController);
    function RenterController(RenterService,RentService) {
        var vm = this;
        vm.renters = [];

        vm.init = function init() {
            RenterService.findAllRenters().then(function (res) {

                vm.renters = res.data;

            });
            console.log(vm.renters + "responed");
        }
        vm.init();

        vm.getMyRents=getMyRents;

        function getMyRents(renterid){
            RentService.findAllRentsByRenter(renterid)
                .then(function(res){
                    vm.rents=res.data;
                })
        }
    }
})();