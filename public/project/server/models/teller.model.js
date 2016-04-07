
/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (uuid) {
    var q = require("q");
    var TellerSchema = require('./teller.schema.server.js')(mongoose);
    var TellerModel = mongoose.model("TellerModel", TellerSchema);
    var tellers = [{
        "password": "raviteja",
        "username": "raviteja",
        "fullname": "Somisetty, Raviteja",
        "address": "Boston",
        "employeeid": "10",
        "managerid": "10"
    }];
    return {
        viewTeller: viewTeller,
        newTeller:newTeller,
        updateTeller:updateTeller,
        deleteTeller:deleteTeller,
        findAllTellers:findAllTellers
    }

    function findAllTellers(){
        var deferred = q.defer();
        TellerModel.find(function (err, tellers) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(tellers);
            }
        });
        return deferred.promise;
    }

    function viewTeller(employeeid) {
        var deferred = q.defer();
        TellerModel.findById(employeeid, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function newTeller(teller){
        var deferred = q.defer();

        // insert new user with mongoose renter model's create()
        TellerModel.create(teller, function (err, doc) {

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

    function updateTeller(employeeid,teller){
        var deferred = q.defer();

        // find the reservation
        TellerModel.findById(employeeid, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.password=teller.password;
                doc.username=teller.username;
                doc.fullname=teller.fullname;
                doc.address=teller.address;
                doc.managerid=teller.managerid;
                doc.rentsApproved=teller.rentsApproved;
                doc.vehiclesAdded=teller.vehiclesAdded;
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with renter
                        deferred.resolve(doc);
                    }
                });
            }});
    }

    function deleteTeller(employeeid){
        var deferred = q.defer();
        TellerModel.remove({_id:employeeid}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};