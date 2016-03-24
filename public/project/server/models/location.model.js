/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (uuid) {
    var locations = [{
        "locationid": "10",
        "address": "Logan Airport"
    }];
    return {
        viewLocation: viewLocation,
        newLocation:newLocation,
        updateLocation:updateLocation,
        deleteLocation:deleteLocation,
        findAllLocations:findAllLocations
    }

    function findAllLocations(){
        return locations;
    }

    function viewLocation(locationid) {
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].locationid == locationid) {
                return locations[i];
            }
        }
        return null;
    }

    function newLocation(location){
        var locationid=uuid.v1();
        location.locationid=locationid;
        locations.push(location);
        return locations;
    }

    function updateLocation(location){
        for(var i=0;i<locations.length;i++){
            if(locations[i].locationid==location.locationid)
            {
                locations[i]=location;
                return locations;
            }
        }
        return null;
    }

    function deleteLocation(locationid){
        for(var i=0;i<locations.length;i++)
        {
            if(locations[i].locationid==locationid)
            {
                locations.splice(i,1);
            }
        }
        return locations;
    }
};