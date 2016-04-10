/**
 * Created by ravit on 4/9/2016.
 */
(function () {
    angular
        .module("GrabACar")
        .controller("NewVehicleController", NewVehicleController);
    function NewVehicleController(VehicleService) {
        var vm=this;
        VehicleService.registerVehicle(vm.vehicle)
            .then(function(res){
                console.log(res);
            })

    }})();