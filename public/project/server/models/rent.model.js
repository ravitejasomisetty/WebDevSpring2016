/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (mongoose, db, uuid) {
    var q = require("q");
    var RentSchema = require('./rent.schema.server.js')(mongoose);
    var RentModel = mongoose.model("RentModel", RentSchema);
    var rents = [{
        "platenumber": "4HS821",
        "rentdate": "3/19/2016",
        "returndate": "3/21/2016",
        "totalrentday": "30",
        "dailyrentfee": "10",
        "pickuptime": "09:00",
        "returntime": "18:30",
        "carimage": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/compact.png",
        "subtotal": "101.34",
        "taxesandfees": "20",
        "totalprice": "121.34",
        "cartypecode": "CCAR",
        "cartypename": "Compact Car",
        "locationdescription": "Boston Airport",
        "mileagedescription": "21",
        "pickupairport": "LOGAN",
        "fuelprovidedby": "RENTER",
        "fuelcharge": "10.10",
        "downpayment": "20",
        "totalpaid": "30",
        "refund": "10",
        "status": "SUCCESS",
        "rentid": "123",
        "renterid": "123",
        "employeeid": "111"
    },
        {
            "platenumber": "F62BGM",
            "rentdate": "3/31/2016",
            "returndate": "4/6/2016",
            "totalrentday": "30",
            "dailyrentfee": "19",
            "pickuptime": "09:00",
            "returntime": "18:30",
            "carimage": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/compact.png",
            "subtotal": "101.34",
            "taxesandfees": "20",
            "totalprice": "121.34",
            "cartypecode": "CCAR",
            "cartypename": "Compact Car",
            "locationdescription": "Boston Airport",
            "mileagedescription": "21",
            "pickupairport": "LOGAN",
            "fuelprovidedby": "RENTER",
            "fuelcharge": "10.10",
            "downpayment": "20",
            "totalpaid": "30",
            "refund": "10",
            "status": "RESERVED",
            "rentid": "345",
            "renterid": "123",
            "employeeid": "111"
        },
        {
            "platenumber": "AHEIWP",
            "rentdate": "3/29/2016",
            "returndate": "4/2/2016",
            "totalrentday": "30",
            "dailyrentfee": "10",
            "pickuptime": "09:00",
            "returntime": "18:30",
            "carimage": "https://ak-secure.hotwirestatic.com/x/static/images/car/cartypes/181x82/US/compact.png",
            "subtotal": "101.34",
            "taxesandfees": "20",
            "totalprice": "121.34",
            "cartypecode": "CCAR",
            "cartypename": "Compact Car",
            "locationdescription": "SFO Airport",
            "mileagedescription": "21",
            "pickupairport": "LOGAN",
            "fuelprovidedby": "RENTER",
            "fuelcharge": "10.10",
            "downpayment": "20",
            "totalpaid": "30",
            "refund": "10",
            "status": "CANCEL",
            "rentid": "567",
            "renterid": "123",
            "employeeid": "111"
        }];
    var recentRentJSON;
    return {
        viewRent: viewRent,
        rentVehicle: rentVehicle,
        updateRent: updateRent,
        deleteRent: deleteRent,
        findAllRents: findAllRents,
        findAllRentsByTeller: findAllRentsByTeller,
        findAllRentsByRenter: findAllRentsByRenter,
        approveRent: approveRent,
        recentRent: recentRent,
        cancelRent: cancelRent
    }

    function cancelRent(rentid) {
        var deferred = q.defer();

        // find the reservation
        RentModel.findById(rentid, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.status = "CANCEL";
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

    function recentRent() {
        return recentRentJSON;
    }

    function approveRent(rentid, employeeid) {
        for (var i = 0; i < rents.length; i++) {
            if (rents[i].rentid == rentid) {
                rents[i].employeeid = employeeid;
                return "APPROVED";
            }
        }
        return "ERROR";
    }

    function findAllRentsByTeller(employeeid) {
        var rentsByTeller = [];
        for (var i = 0; i < rents.length; i++) {
            if (rents[i].employeeid == employeeid)
                rentsByTeller.push(rents[i]);
        }
        return rentsByTeller;
    }

    function findAllRentsByRenter(renterid) {
        var rentsByRenter = [];
        for (var i = 0; i < rents.length; i++) {
            if (rents[i].renterid == renterid)
                rentsByRenter.push(rents[i]);
        }
        return rentsByRenter;
    }

    function findAllRents() {
        var deferred = q.defer();
        RentModel.find(function (err, rents) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rents);
            }
        });
        return deferred.promise;
    }

    function viewRent(rentid) {
        var deferred = q.defer();
        RentModel.findById(rentid, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function rentVehicle(rent) {
        var deferred = q.defer();

        // insert new user with mongoose renter model's create()
        RentModel.create(rent, function (err, doc) {

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

    function updateRent(rent) {
        var deferred = q.defer();

        // find the reservation
        RentModel.findById(rent._id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.platenumber = rent.platenumber;
                doc.rentdate = rent.rentdate;
                doc.returndate = rent.returndate;
                doc.totalrentday = rent.totalrentday;
                doc.dailyrentfee = rent.dailyrentfee;
                doc.pickuptime = rent.pickuptime;
                doc.returntime = rent.returntime;
                doc.carimage = rent.carimage;
                doc.subtotal = rent.subtotal;
                doc.taxesandfees = rent.taxesandfees;
                doc.totalprice = rent.totalprice;
                doc.cartypecode = rent.cartypecode;
                doc.locationdescription = rent.locationdescription;
                doc.mileagedescription = rent.mileagedescription;
                doc.pickupairport = rent.pickupairport;
                doc.fuelprovidedby = rent.fuelprovidedby;
                doc.fuelcharge = rent.fuelcharge;
                doc.downpayment = rent.downpayment;
                doc.totalpaid = rent.totalpaid;
                doc.refund = rent.refund;
                doc.status = rent.status;
                doc.renterid = rent.renterid;
                doc.employeeid = rent.employeeid;
                doc.updatedby=rent.updatedby;
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

    function deleteRent(rentid) {
        var deferred = q.defer();
        RentModel.remove({_id: rentid}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};