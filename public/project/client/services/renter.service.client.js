(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("RenterService", RenterService);
    function RenterService($http,$rootScope) {

        function findRenterById(renterid){
            var renter = $http.get("/api/grabacar/renter/" + renterid);
            return renter;
        }
        function findRenterByRentername(rentername) {
            var renter = $http.get("/api/grabacar/renter?rentername=" + rentername);
            return renter;
        }

        function findRenterByCredentials(rentername, password, renter) {
            //var renter = $http.get("/api/grabacar/renter?username=" + rentername + "&password=" + password);
            var renter = $http.post("/api/grabacar/renter/login",renter);
            return renter;
        }

        function findAllRenters() {
            var renters = $http.get("/api/grabacar/renters");
            return renters;
        }

        function findRentersByFirstName(searchRenterName) {
            var renters = $http.get("/api/grabacar/renterByFirstName/"+searchRenterName);
            return renters;
        }

        function createRenter(renter) {
            var renters = $http.post("/api/grabacar/renter", renter);
            return renters;
        }

        function deleteRenterById(renterId) {
            var renters = $http.delete("/api/grabacar/renter/" + renterId);
            return renters;
        }

        function updateRenter(renterId, renter) {
            var renters = $http.put("/api/grabacar/renter/" + renterId, renter);
            return renters;
        };

        function isYoungDriver(renterId) {
            var msg = $http.get("/api/grabacar/renter/isYoungDriver/" + renterId);
            return msg;
        }

        function logout() {
            return $http.post("/api/grabacar/rentersession/logout");
        }
        function refresh() {
            return $http.get("/api/grabacar/rentersession/refresh");
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $http.get("/api/grabacar/rentersession/loggedin");
        }

        return {
            findRentersByFirstName:findRentersByFirstName,
            findRenterByRentername: findRenterByRentername,
            findRenterById: findRenterById,
            findRenterByCredentials: findRenterByCredentials,
            findAllRenters: findAllRenters,
            createRenter: createRenter,
            deleteRenterById: deleteRenterById,
            updateRenter: updateRenter,
            isYoungDriver: isYoungDriver,
            logout: logout,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            refresh:refresh
        }
    }
})();