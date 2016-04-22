(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);
    function AdminController(UserService, $scope, $rootScope, $location) {
        var vm=this;
        $scope.sortType='username';
        $scope.sortReverse='false';
        if ($rootScope.user) {
            UserService.findAllUsers()
                .then(function (res) {
                    $scope.users = res.data;
                })
        }
        else {
            alert("Please log in and continue");
            $location.path("/login");
        }
        $scope.addUser = function (newUser) {
            if (newUser) {
                //newUser.roles = convertToArrOfJSON(newUser.roles);
                UserService.addUser(newUser)
                    .then(function (res) {
                        $scope.users = res.data;
                        newUser = null;
                    }, function (err) {

                    });
            }
            else {
                alert("Please enter values");
            }
        }

        $scope.deleteUser = function (user) {
            UserService.deleteUserById(user._id)
                .then(function (res) {
                    UserService.findAllUsers()
                        .then(function (users) {
                            $scope.users = users.data;
                        }, function (err) {

                        });
                });
        }

        $scope.selectUser = function (index) {
            $scope.newUser = {
                "_id": $scope.users[index]._id,
                "username": $scope.users[index].username,
                "password": $scope.users[index].password,
                "roles": convertToCSV($scope.users[index].roles)
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

        $scope.updateUser = function (newUser) {
            if (newUser) {
                newUser.roles = convertToArrOfJSON(newUser.roles);
                UserService.updateUser(newUser._id, newUser)
                    .then(function (res) {
                        newUser = null;
                        UserService.findAllUsers()
                            .then(function (users) {
                                $scope.users = users.data;
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
