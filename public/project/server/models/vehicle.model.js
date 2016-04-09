/**
 * Created by ravit on 3/22/2016.
 */
module.exports = function (mongoose,db,uuid) {
    var q = require("q");
    var VehicleSchema = require('./vehicle.schema.server.js')(mongoose);
    var VehicleModel = mongoose.model("VehicleModel", VehicleSchema);
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
        var deferred = q.defer();
        VehicleModel.find(function (err, vehicles) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(vehicles);
            }
        });
        return deferred.promise;
    }

    function viewVehicle(plateNum) {
        var deferred = q.defer();
        VehicleModel.findById(plateNum, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function registerVehicle(vehicle){
        var deferred = q.defer();

        // insert new user with mongoose renter model's create()
        VehicleModel.create(vehicle, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function updateVehicle(vehicle){
        var deferred = q.defer();

        // find the reservation
        VehicleModel.findById(vehicle._id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.brand=vehicle.brand;
                doc.type=vehicle.type;
                doc.platenumber=vehicle.platenumber;
                doc.seatquantity=vehicle.seatquantity;
                doc.fueltype=vehicle.fueltype;
                doc.condition=vehicle.condition;
                doc.dailyprice=vehicle.dailyprice;
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with renter
                        deferred.resolve(doc);
                    }
                });
            }})
    }

    function deleteVehicle(plateNum){
        var deferred = q.defer();
        VehicleModel.remove({platenumber:plateNum}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};