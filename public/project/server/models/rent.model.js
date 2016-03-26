/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (uuid) {
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
        var rent = viewRent(rentid);
        if (rent) {
            rent.status = "CANCEL";
            updateRent(rent);
            return true;
        }
        return false;
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
        recentRentJSON = rent;
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