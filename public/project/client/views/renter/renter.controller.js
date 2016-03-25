(function () {
    'use strict';
    angular
        .module("GrabACar")
        .controller("RenterController", RenterController);
    function RenterController(RenterService, DateService) {
        var vm = this;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.addForm = addForm;

        RenterService.findAllRenters()
            .then(function (renters) {
                vm.users = renters.data;
            });

        function addForm(user) {
            if (user)
                RenterService.createRenter(user)
                    .then(function (renters) {
                        vm.users = renters.data;
                        console.log("New user added");
                    })
            else {
                alert("Fields cannot be empty");
            }
        }

        function updateForm(user) {
            if (user) {
                var userCopy = {
                    "email": user.email,
                    "_id": user._id,
                    "firstName": user.firstName,
                    "nationality": user.nationality,
                    "mobilenumber": user.mobilenumber,
                    "rentername": user.rentername,
                    "password": user.password
                };
                userCopy.birthdate=DateService.obtainDate(user.birthdate);
                RenterService.updateRenter(userCopy._id, userCopy)
                    .then(function (renters) {
                        vm.users = renters.data;
                        vm.user=null;
                        console.log("updated successfully");
                    })
            }
            else {
                alert("Select by clicking EDIT to update a record");
            }
        }

        function deleteForm(user) {
            if (user)
                RenterService.deleteRenterById(user._id)
                    .then(function (res) {
                        vm.users = res.data;
                    })
        }

        function selectForm(index) {
            vm.user = {
                "email": vm.users[index].email,
                "_id": vm.users[index]._id,
                "firstName": vm.users[index].firstName,
                "nationality": vm.users[index].nationality,
                "mobilenumber": vm.users[index].mobilenumber,
                "rentername": vm.users[index].rentername,
                "password": vm.users[index].password
            };
        }
    }
})();