/**
 * Created by ravit on 3/22/2016.
 */


module.exports = function (mongoose, db, uuid) {
    var q = require("q");
    var RenterSchema = require('./renter.schema.server.js')(mongoose);
    var RenterModel = mongoose.model("RenterModel", RenterSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findRenterByRentername: findRenterByRentername,
        findRenterByCredentials: findRenterByCredentials,
        isYoungDriver: isYoungDriver,
        findRentersByFirstName: findRentersByFirstName
    };
    return api;

    function findRentersByFirstName(firstName) {
        var deferred = q.defer();
        RenterModel.find({"firstName": new RegExp('.*' + firstName + '.*', "i")}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function isYoungDriver(renterId) {
        for (var i = 0; i < renters.length; i++) {
            if (renterId == renters[i]._id) {
                var age = _calculateAge(renters[i].birthdate);
                if (15 <= age && age <= 18) {
                    return true;
                }
            }
        }
        return false;
    }

    function _calculateAge(birthdate) {
        var ageDifMs = Date.now() - birthdate.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function Create(renter) {
        var deferred = q.defer();

        // insert new user with mongoose renter model's create()
        RenterModel.create(renter, function (err, doc) {

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

    function FindAll() {
        var deferred = q.defer();
        RenterModel.find(function (err, renters) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(renters);
            }
        });
        return deferred.promise;
    }

    function FindById(id) {
        var deferred = q.defer();
        RenterModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Update(id, renter) {
        var deferred = q.defer();

        // find the user
        RenterModel.findById(id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.firstName = renter.firstName;
                doc.lastName = renter.lastName;
                doc.rentername = renter.rentername;
                doc.city = renter.city;
                doc.nationality = renter.nationality;
                doc.mobilenumber = renter.mobilenumber;
                doc.birthdate = renter.birthdate;
                doc.licenseNumber = renter.licenseNumber;
                doc.licenseCountry = renter.licenseCountry;
                doc.password = renter.password;
                doc.status = renter.status;
                doc.email = renter.email;
                doc.roles = renter.roles;
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with renter
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function Delete(id) {
        var deferred = q.defer();
        RenterModel.remove({_id: id}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findRenterByRentername(rentername) {
        var deferred = q.defer();
        RenterModel.findOne({rentername: rentername}, function (err, renter) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(renter);
            }
        });
        return deferred.promise;
    }

    function findRenterByCredentials(credentials) {
        var deferred = q.defer();
        RenterModel.findOne({
            rentername: credentials.rentername,
            password: credentials.password
        }, function (err, renter) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(renter);
            }
        });
        return deferred.promise;
    }
};