(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("UserService", UserService);
    function UserService($http) {

        function findUserByUsername(username) {
            var user = $http.get("/api/grabacar/user?username=" + username);
            return user;
        }

        function findUserByCredentials(username, password,user) {
            var user = $http.get("/api/grabacar/user?username=" + username + "&password=" + password);
            return user;
        };

        function findAllUsers() {
            var users = $http.get("/api/grabacar/user");
            return users;
        };

        function createUser(user) {
            var users = $http.post("/api/grabacar/user", user);
            return users;
        };

        function deleteUserById(userId) {
            var users=$http.delete("/api/grabacar/user/" + userId);
            return users;
        };

        function updateUser(userId, user) {
            var users = $http.put("/api/grabacar/user/" + userId, user);
            return users;
        };

        function isYoungDriver(userId){
            var msg=$http.get("/api/grabacar/user/isYoungDriver/"+userId);
            return msg;
        }

        return {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            isYoungDriver:isYoungDriver
        }
    }})();