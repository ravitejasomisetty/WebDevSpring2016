/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (uuid) {
    var vlocations = [{
        "id": "10",
        "platenumber": "4HS821",
        "locationid": "123456qsdnao"
    }];
    return {
        viewVLocation: viewVLocation,
        newVLocation:newVLocation,
        updateVLocation:updateVLocation,
        deleteVLocation:deleteVLocation,
        findAllVLocations:findAllVLocations
    }

    function findAllVLocations(){
        return vlocations;
    }

    function viewVLocation(id) {
        for (var i = 0; i < vlocations.length; i++) {
            if (vlocations[i].id == id) {
                return vlocations[i];
            }
        }
        return null;
    }

    function newVLocation(vlocation){
        var id=uuid.v1();
        vlocation.id=id;
        vlocations.push(vlocation);
        return vlocations;
    }

    function updateVLocation(vlocation){
        for(var i=0;i<vlocations.length;i++){
            if(vlocations[i].id==vlocation.id)
            {
                vlocations[i]=vlocation;
                return vlocations;
            }
        }
        return null;
    }

    function deleteVLocation(id){
        for(var i=0;i<vlocations.length;i++)
        {
            if(vlocations[i].id==id)
            {
                vlocations.splice(i,1);
            }
        }
        return vlocations;
    }
};