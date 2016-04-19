(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("DetailsController", DetailsController);
    function DetailsController($rootScope, $routeParams, ReservationService, RentService, DateService, $location) {
        var vm = this;
        vm.HWRefNumber = $routeParams.HWRefNumber;
        vm.instance = $rootScope.instance;

        vm.reserve = function () {
            if ($rootScope.user) {
                $rootScope.user.instance = vm.instance;
                var rent = {
                    "platenumber": vm.HWRefNumber,
                    "rentdate": vm.instance.PickupDay,
                    "returndate": vm.instance.DropoffDay,
                    "totalrentday": vm.instance.RentalDays,
                    "dailyrentfee": vm.instance.DailyRate,
                    "pickuptime": vm.instance.PickupTime,
                    "returntime": vm.instance.DropoffTime,
                    "carimage": vm.instance.carImage,
                    "subtotal": vm.instance.SubTotal,
                    "taxesandfees": vm.instance.TaxesAndFees,
                    "totalprice": vm.instance.TotalPrice,
                    "cartypecode": vm.instance.CarTypeCode,
                    "locationdescription": vm.instance.LocationDescription,
                    "mileagedescription": vm.instance.MileageDescription,
                    "pickupairport": vm.instance.PickupAirport,
                    "fuelprovidedby": null,
                    "fuelcharge": "2.10",
                    "downpayment": null,
                    "totalpaid": null,
                    "refund": null,
                    "status": "RESERVED",
                    "rentid": null,
                    "renterid": $rootScope.user._id,
                    "employeeid": null
                };


                RentService.rentVehicle(rent)
                    .then(function (res) {

                        var today = DateService.obtainDate(new Date());
                        var reservation = {
                            "platenumber": vm.HWRefNumber,
                            "pickupdate": vm.instance.PickupDay,
                            "returndate": vm.instance.DropoffDay,
                            "reservationdate": today,
                            "status": "RESERVED",
                            "reservationid": null,
                            "renterid": $rootScope.user._id,
                            "rentid": res.data._id
                        };
                        ReservationService.newReservation(reservation)
                            .then(function (reservationRes) {
                                console.log("Reservation successful");
                            });
                    });


                if ($rootScope.user.rentername)
                    $location.url("/profile/" + $rootScope.user._id);
                else if ($rootScope.user.username)
                    $location.url("/telleraccount/" + $rootScope.user._id);
            }
        };
    }
})();
