(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("RenterService", RenterService);
    function RenterService($http) {

        function findRenterByRentername(rentername) {
            var renter = $http.get("/api/grabacar/renter?rentername=" + rentername);
            return renter;
        }

        function findRenterByCredentials(rentername, password,renter) {
            var renter = $http.get("/api/grabacar/renter?rentername=" + rentername + "&password=" + password);
            return renter;
        };

        function findAllRenters() {
            var renters = $http.get("/api/grabacar/renter");
            return renters;
        };

        function createRenter(renter) {
            var renters = $http.post("/api/grabacar/renter", renter);
            return renters;
        };

        function deleteRenterById(renterId) {
            var renters=$http.delete("/api/grabacar/renter/" + renterId);
            return renters;
        };

        function updateRenter(renterId, renter) {
            var renters = $http.put("/api/grabacar/renter/" + renterId, renter);
            return renters;
        };

        function isYoungDriver(renterId){
            var msg=$http.get("/api/grabacar/renter/isYoungDriver/"+renterId);
            return msg;
        }

        return {
            findRenterByRentername: findRenterByRentername,
            findRenterByCredentials: findRenterByCredentials,
            findAllRenters: findAllRenters,
            createRenter: createRenter,
            deleteRenterById: deleteRenterById,
            updateRenter: updateRenter,
            isYoungDriver:isYoungDriver
        }
    }})();