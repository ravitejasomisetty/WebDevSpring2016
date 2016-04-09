/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (mongoose,db,uuid) {
    var q = require("q");
    var LocationSchema = require('./vehicle.schema.server.js')(mongoose);
    var LocationModel = mongoose.model("LocationModel", LocationSchema);
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
        var deferred = q.defer();
        LocationModel.find(function (err, locations) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(locations);
            }
        });
        return deferred.promise;
    }

    function viewLocation(locationid) {
        var deferred = q.defer();
        LocationModel.findById(locationid, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function newLocation(location){
        var deferred = q.defer();

        // insert new user with mongoose renter model's create()
        LocationModel.create(location, function (err, doc) {

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

    function updateLocation(location){
        var deferred = q.defer();

        // find the reservation
        LocationModel.findById(location._id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.address=location.address;
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

    function deleteLocation(locationid){
        var deferred = q.defer();
        LocationModel.remove({_id:locationid}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};