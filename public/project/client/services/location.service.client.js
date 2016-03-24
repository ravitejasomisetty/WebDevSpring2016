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
        .factory("LocationService", LocationService);
    function LocationService($http) {
        return {
            viewLocation: viewLocation,
            newLocation:newLocation,
            updateLocation:updateLocation,
            deleteLocation:deleteLocation,
            findAllLocations:findAllLocations
        }
        function findAllLocations(){
            var locations=$http.get("/api/grabacar/location");
            console.log(locations);
            return locations;
        };

        function viewLocation(locationid) {
            var location=$http.get("/api/grabacar/location/"+locationid);
            return location;
        }

        function newLocation(location){
            var locations=$http.post("/api/grabacar/location",location);
            return locations;
        }

        function updateLocation(locationid,location){
            var locations=$http.put("/api/grabacar/location/"+locationid,location);
            return locations;
        }

        function deleteLocation(locationid){
            var locations=$http.delete("/api/grabacar/location/"+locationid);
            return locations;
        }
    }})();