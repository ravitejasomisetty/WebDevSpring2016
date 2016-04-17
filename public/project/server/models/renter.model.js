/**
 * Created by ravit on 3/22/2016.
 */


module.exports = function (mongoose, db, uuid) {
    var q = require("q");
    var RenterSchema = require('./renter.schema.server.js')(mongoose);
    var RenterModel = mongoose.model("RenterModel", RenterSchema);
    var renters = [
        {
            "_id": 123, "firstName": "Alice", "lastName": "Wonderland", "nationality": "Indian",
            "city": "Boston", "mobilenumber": "999999999", "birthdate": "6/8/1992",
            "rentername": "alice", "password": "alice", "email": "alicewonderland@gmail.com", "roles": "admin",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status": "Waiting for approval"
        },
        {
            "_id": 234, "firstName": "Bob", "lastName": "Hope", "nationality": "American",
            "city": "Phoenix", "mobilenumber": "999999999", "birthdate": "4/25/1992",
            "rentername": "bob", "password": "bob", "email": "bobhope@gmail.com",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status": "Waiting for approval"
        },
        {
            "_id": 345, "firstName": "Charlie", "lastName": "Brown", "nationality": "African",
            "city": "New Jersey", "mobilenumber": "999999999", "birthdate": "7/6/1992",
            "rentername": "charlie", "password": "charlie", "email": "charliebrown@gmail.com", "roles": "admin",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status": "Approved"
        },
        {
            "_id": 456, "firstName": "Dan", "lastName": "Craig", "nationality": "African",
            "city": "San Diego", "mobilenumber": "999999999", "birthdate": "2/22/1992",
            "rentername": "dan", "password": "dan", "email": "dancraig@gmail.com",
            "licenseNumber": "ADPHHSPE12",
            "licenseCountry": "United States",
            "status": "Declined"
        }
    ];
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