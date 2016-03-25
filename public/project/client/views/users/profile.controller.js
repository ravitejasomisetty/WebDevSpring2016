(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, RenterService, ReservationService,$location) {
        var vm = this;
        vm.update = update;
        vm.open=open;
        /*/!* var testData={};
         testData.user = {
         "_id": 123, "firstName": "Alice", "lastName": "Wonderland", "nationality": "Indian",
         "city": "Boston", "mobilenumber": "999999999", "birthdate": new Date("6/8/1992"),
         "rentername": "alice", "password": "alice", "email": "alicewonderland@gmail.com", "roles": "admin",
         "licenseNumber": "ADPHHSPE12",
         "licenseCountry": "United States",
         "status": "Waiting for approval"
         };
         testData.instance = {
         "CurrencyCode": "USD",
         "DeepLink": "https://www.hotwire.com/car/deeplink-details.jsp?resultId=OTI3MTQ0NTUyMDo0NzIyNTU4MTUzNjU-&useCluster=4&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=4",
         "ResultId": "OTI3MTQ0NTUyMDo0NzIyNTU4MTUzNjU-&useCluster=4",
         "HWRefNumber": "3913959853",
         "SubTotal": "91.96",
         "TaxesAndFees": "43.08",
         "TotalPrice": "135.04",
         "CarTypeCode": "ICAR",
         "DailyRate": "22.99",
         "DropoffDay": "04/23/2016",
         "DropoffTime": "13:30",
         "PickupDay": "04/20/2016",
         "PickupTime": "10:00",
         "LocationDescription": "Counter in airport; Shuttle to car",
         "MileageDescription": "Unlimited",
         "PickupAirport": "LAX",
         "RentalDays": "4"
         };*!/
         $rootScope.user=testData.user;*/
        vm.user = {
            "_id": $rootScope.user._id,
            "firstName": $rootScope.user.firstName,
            "lastName": $rootScope.user.lastName,
            "email": $rootScope.user.email,
            "roles": $rootScope.user.roles,
            "username": $rootScope.user.rentername,
            "password": $rootScope.user.password
        };

        if (vm.user) {
            vm.myReservations = function () {
                ReservationService.findAllReservationsByRenter(vm.user._id)
                    .then(function (res) {
                        vm.reservations = res.data;
                        console.log(vm.reservations);
                    })
            }
        }
        function update() {
            RenterService.updateRenter(vm.user._id, vm.user, function (res) {
                $rootScope.user = res;
                alert("Profile information is successfully updated");
            });
        }

        function open(path){
            $location.url(path);
        }
    }
})();




