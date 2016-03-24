/**
 * Created by ravit on 3/23/2016.
 */
/**
 * Created by ravit on 3/23/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("VLocationService", VLocationService);
    function VLocationService($http) {
        return {
            viewVLocation: viewVLocation,
            newVLocation:newVLocation,
            updateVLocation:updateVLocation,
            deleteVLocation:deleteVLocation,
            findAllVLocations:findAllVLocations
        }
        function findAllVLocations(){
            var vlocations=$http.get("/api/grabacar/vlocation");
            console.log(vlocations);
            return vlocations;
        };

        function viewVLocation(id) {
            var vlocation=$http.get("/api/grabacar/vlocation/"+id);
            return vlocation;
        }

        function newVLocation(vlocation){
            var vlocations=$http.post("/api/grabacar/vlocation",vlocation);
            return vlocations;
        }

        function updateVLocation(id,vlocation){
            var vlocations=$http.put("/api/grabacar/vlocation/"+id,vlocation);
            return vlocations;
        }

        function deleteVLocation(id){
            var vlocations=$http.delete("/api/grabacar/vlocation/"+id);
            return vlocations;
        }
    }})();