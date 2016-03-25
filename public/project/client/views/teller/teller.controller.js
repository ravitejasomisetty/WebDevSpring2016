(function () {
    angular
        .module("GrabACar")
        .controller("TellerController", TellerController);
    function TellerController(TellerService) {
        'use strict';
        var vm = this;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        TellerService.findAllTellers()
            .then(function (tellers) {
                vm.tellers = tellers.data;
            });

        function addForm(teller) {
            if (teller) {
                TellerService.newTeller(teller)
                    .then(function (tellers) {
                        vm.tellers = tellers.data;
                        vm.teller=null;
                        console.log("Added user");
                    })
            }
            else {
                alert("Fields cannot be empty");
            }
        }

        function updateForm(teller) {
            if (teller) {
                TellerService.updateTeller(teller.employeeid, teller)
                    .then(function (tellers) {
                        vm.tellers = tellers.data;
                        vm.teller=null;
                        console.log("Updated successfully");
                    })
            }
            else {
                alert("Select by clicking EDIT to update a record");
            }
        }

        function deleteForm(teller) {
            TellerService.deleteTeller(teller.employeeid)
                .then(function (tellers) {
                    vm.tellers = tellers.data;
                })
        }

        function selectForm(index) {
            vm.teller = {
                "fullname": vm.tellers[index].fullname,
                "address": vm.tellers[index].address,
                "employeeid": vm.tellers[index].employeeid,
                "managerid": vm.tellers[index].managerid,
                "username": vm.tellers[index].username,
                "password": vm.tellers[index].password
            };
        }
    }
})();