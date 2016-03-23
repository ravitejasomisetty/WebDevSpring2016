/**
 * Created by ravit on 3/22/2016.
 */
module.exports = function (uuid) {
    var vehicles = [{
        "brand": "Toyota",
        "type": "Economy",
        "model": "Corolla",
        "platenumber": "4HS821",
        "seatquantity": "4",
        "fueltype": "petrol",
        "condition": "GOOD",
        "dailyprice": "30"
    }];
    return {
        viewVehicle: viewVehicle,
        registerVehicle:registerVehicle,
        updateVehicle:updateVehicle,
        findAllVehicles:findAllVehicles,
        deleteVehicle:deleteVehicle
    }

    function findAllVehicles(){
        return vehicles;
    }

    function viewVehicle(plateNum) {
        for (var i = 0; i < vehicles.length; i++) {
            if (vehicles[i].platenumber == plateNum) {
                return vehicles[i];
            }
        }
        return null;
    }

    function registerVehicle(vehicle){
        var duplicateVehicle=viewVehicle(vehicle.platenumber);
        if(!duplicateVehicle)
        {
            vehicles.push(vehicle);
        }
        return vehicles;
    }

    function updateVehicle(vehicle){
        for(var i=0;i<vehicles.length;i++){
            if(vehicles[i].platenumber==vehicle.platenumber)
            {
                vehicles[i]=vehicle;
                return vehicles;
            }
        }
        return null;
    }

    function deleteVehicle(plateNum){
        for(var i=0;i<vehicles.length;i++)
        {
            if(vehicles[i].platenumber==plateNum)
            {
                vehicles.splice(i,1);
            }
        }

        return vehicles;
    }
};