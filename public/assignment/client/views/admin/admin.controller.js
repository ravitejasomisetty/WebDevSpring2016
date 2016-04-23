(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);
    function AdminController(UserService, $rootScope, $location) {
        var vm = this;
        vm.usernameAsc = true;
        if ($rootScope.user) {
            UserService.findAllUsers()
                .then(function (res) {
                    vm.users = res.data;
                    return sortUsername();
                })
        }
        else {
            alert("Please log in and continue");
            $location.path("/login");
        }
        vm.addUser = function (newUser) {
            if (newUser) {
                //newUser.roles = convertToArrOfJSON(newUser.roles);
                UserService.addUser(newUser)
                    .then(function (res) {
                        vm.users = res.data;
                        newUser = null;
                    }, function (err) {

                    });
            }
            else {
                alert("Please enter values");
            }
        }

        vm.sortUsername = sortUsername;
        vm.sortFirstName = sortFirstName;
        vm.sortLastName = sortLastName;

        function sortUsername() {
            vm.usernameAsc = !vm.usernameAsc;
            vm.users.sort(function (a, b) {
                var sortOrder;
                if (a.username > b.username) {
                    if (vm.usernameAsc)
                        sortOrder = 1;
                    else
                        sortOrder = -1
                }
                else if (a.username === b.username) {
                    sortOrder = 0;
                }
                else {
                    if (vm.usernameAsc)
                        sortOrder = -1;
                    else
                        sortOrder = 1;
                }
                return sortOrder;
            });
        }


        function sortFirstName() {
            vm.fNameAsc = !vm.fNameAsc;
            vm.users.sort(function (a, b) {
                var sortOrder;
                if (a.firstName > b.firstName) {
                    if (vm.fNameAsc)
                        sortOrder = 1;
                    else
                        sortOrder = -1
                }
                else if (a.firstName === b.firstName) {
                    sortOrder = 0;
                }
                else {
                    if (vm.fNameAsc)
                        sortOrder = -1;
                    else
                        sortOrder = 1;
                }
                return sortOrder;
            });
        }
        function sortLastName() {
            vm.lNameAsc = !vm.lNameAsc;
            vm.users.sort(function (a, b) {
                var sortOrder;
                if (a.lastName > b.lastName) {
                    if (vm.lNameAsc)
                        sortOrder = 1;
                    else
                        sortOrder = -1
                }
                else if (a.lastName === b.lastName) {
                    sortOrder = 0;
                }
                else {
                    if (vm.lNameAsc)
                        sortOrder = -1;
                    else
                        sortOrder = 1;
                }
                return sortOrder;
            });
        }

        vm.deleteUser = function (user) {
            UserService.deleteUserById(user._id)
                .then(function (res) {
                    UserService.findAllUsers()
                        .then(function (users) {
                            vm.users = users.data;
                        }, function (err) {

                        });
                });
        }

        vm.selectUser = function (index) {
            vm.newUser = {
                "_id": vm.users[index]._id,
                "username": vm.users[index].username,
                "password": vm.users[index].password,
                "roles": convertToCSV(vm.users[index].roles)
            };
        }

        function convertToCSV(arrOfJson) {
            var returnString = "";
            for (var i = 0; i < arrOfJson.length - 1; i++) {
                returnString += arrOfJson[i].trim() + ",";
            }
            returnString += arrOfJson[arrOfJson.length - 1].trim();
            return returnString;
        }

        function convertToArrOfJSON(rolesString) {
            var strSplit = rolesString.split(',');
            for (var i = 0; i < strSplit.length; i++) {
                strSplit[i] = strSplit[i].replace(/^\s*/, "").replace(/\s*$/, "");
            }
            return strSplit;
        }

        vm.updateUser = function (newUser) {
            if (newUser) {
                newUser.roles = convertToArrOfJSON(newUser.roles);
                UserService.updateUser(newUser._id, newUser)
                    .then(function (res) {
                        newUser = null;
                        UserService.findAllUsers()
                            .then(function (users) {
                                vm.users = users.data;
                            }, function (err) {

                            });
                    })
            }
            else {
                alert("Please enter values");
            }
        }
    }
})();
