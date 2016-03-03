(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("TellerService", TellerService);
    function TellerService() {
        var tellers = [
            {
                "empid": 123, "fullName": "Alice Wonderland", "mgrid": "Indian",
                "username": "Hyderabad", "password": "999999999", "address": "9/9/1999"
            }
        ];

        var findAlltellers = function (callback) {
            callback(tellers);
        };

        var createteller = function (teller, callback) {
            teller = {
                "empid": (new Date).getTime(),
                "fullName": teller.fullName,
                "mgrid": teller.mgrid,
                "username": teller.username,
                "password": teller.password,
                "address": teller.address
            };
            tellers.push(teller);
            callback(teller);
        };

        var updateteller = function (teller, callback) {
            var tellerId = teller.empid;
            for (var i = 0; i < tellers.length; i++) {
                if (tellerId == tellers[i].empid) {
                    tellers[i].fullName = teller.fullName;
                    tellers[i].mgrid = teller.mgrid;
                    tellers[i].username = teller.username;
                    tellers[i].password = teller.password;
                    tellers[i].address = teller.address;
                    return callback(teller);
                }
            }
        };
        return {
            findAlltellers: findAlltellers,
            createteller: createteller,
            updateteller: updateteller
        }
    }
})();