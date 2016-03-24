/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("TellerService", TellerService);
    function TellerService($http) {
        return {
            viewTeller: viewTeller,
            newTeller:newTeller,
            updateTeller:updateTeller,
            deleteTeller:deleteTeller,
            findAllTellers:findAllTellers
        }
        function findAllTellers(){
            var tellers=$http.get("/api/grabacar/teller");
            console.log(tellers);
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