/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("TellerService", TellerService);
    function TellerService($http,$rootScope) {
        return {
            viewTeller: viewTeller,
            newTeller:newTeller,
            updateTeller:updateTeller,
            deleteTeller:deleteTeller,
            findAllTellers:findAllTellers,
            findTellerByCredentials:findTellerByCredentials,
            logout: logout,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        }
        function logout() {
            return $http.post("/api/grabacar/tellersession/logout");
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $http.get("/api/grabacar/tellersession/loggedin");
        }

        function findTellerByCredentials(username, password, teller) {
            var teller = $http.get("/api/grabacar/teller?username=" + username + "&password=" + password);
            return teller;
        };

        function findAllTellers(){
            var tellers=$http.get("/api/grabacar/teller");
            return tellers;
        };

        function viewTeller(employeeid) {
            var teller=$http.get("/api/grabacar/teller/"+employeeid);
            return teller;
        }

        function newTeller(teller){
            var tellers=$http.post("/api/grabacar/teller",teller);
            return tellers;
        }

        function updateTeller(employeeid,teller){
            var tellers=$http.put("/api/grabacar/teller/"+employeeid,teller);
            return tellers;
        }

        function deleteTeller(employeeid){
            var tellers=$http.delete("/api/grabacar/teller/"+employeeid);
            return tellers;
        }
    }})();