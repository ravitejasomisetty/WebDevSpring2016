/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (uuid) {
    var rents = [{
        "platenumber": "4HS821",
        "rentdate": "3/23/2016",
        "returndate": "3/25/2016",
        "totalrentday": "30",
        "dailyrentfee": "10",
        "fuelprovidedby": "RENTER",
        "fuelcharge": "10.10",
        "downpayment": "20",
        "totalpaid": "30",
        "refund": "10",
        "rentid": "123",
        "renterid": "123",
        "employeeid": "111"
    }];
    return {
        viewRent: viewRent,
        rentVehicle: rentVehicle,
        updateRent: updateRent,
        deleteRent: deleteRent,
        findAllRents: findAllRents,
        findAllRentsByTeller: findAllRentsByTeller,
        findAllRentsByRenter: findAllRentsByRenter,
        approveRent: approveRent
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
        return rents;
    }

    function viewRent(rentid) {
        for (var i = 0; i < rents.length; i++) {
            if (rents[i].rentid == rentid) {
                return rents[i];
            }
        }
        return null;
    }

    function rentVehicle(rent) {
        var rentid = uuid.v1();
        rent.rentid = rentid;
        rents.push(rent);
        return rents;
    }

    function updateRent(rent) {
        for (var i = 0; i < rents.length; i++) {
            if (rents[i].rentid == rent.rentid) {
                rents[i] = rent;
                return rents;
            }
        }
        return null;
    }

    function deleteRent(rentid) {
        for (var i = 0; i < rents.length; i++) {
            if (rents[i].rentid == rentid) {
                rents.splice(i, 1);
            }
        }
        return rents;
    }
};