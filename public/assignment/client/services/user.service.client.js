(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($http) {
        function findUserByCredentials(username, password) {
            console.log("change");
            //console.log($http.get("/api/assignment/user?username=" + username + "&password=" + password));
            var user = $http.get("/api/assignment/user?username=" + username + "&password=" + password);
            return user;
        };

        return {
            findUserByCredentials: findUserByCredentials
        }
    }
})();