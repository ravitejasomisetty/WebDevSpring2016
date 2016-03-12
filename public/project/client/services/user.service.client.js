(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {
                "id": 123, "fullName": "Alice Wonderland", "nationality": "Indian",
                "city": "Boston", "mobilenumber": "999999999", "birthdate": new Date("6/8/1992"),
                "username": "alice", "password": "alice", "email": "alicewonderland@gmail.com","roles":"admin"
            },
            {
                "id": 234, "fullName": "Bob Hope", "nationality": "American",
                "city": "Phoenix", "mobilenumber": "999999999", "birthdate": new Date("4/25/1992"),
                "username": "bob", "password": "bob", "email": "bobhope@gmail.com"
            },
            {
                "id": 345, "fullName": "Charlie Brown", "nationality": "African",
                "city": "New Jersey", "mobilenumber": "999999999", "birthdate": new Date("7/6/1992"),
                "username": "charlie", "password": "charlie", "email": "charliebrown@gmail.com","roles":"admin"
            },
            {
                "id": 456, "fullName": "Dan Craig", "nationality": "African",
                "city": "San Diego", "mobilenumber": "999999999", "birthdate": new Date("2/22/1992"),
                "username": "dan", "password": "dan", "email": "dancraig@gmail.com"
            }
        ];

        var findAllUsers = function (callback) {
            callback(users);
        };

        var createUser = function (user, callback) {
            user = {
                "email": user.email,
                "id": (new Date).getTime(),
                "fullName": user.fullName,
                "nationality": user.nationality,
                "city": user.city,
                "mobilenumber": user.mobilenumber,
                "birthdate": user.birthdate,
                "username": user.username,
                "password": user.password
            };
            users.push(user);
            callback(user);
        };

        var updateUser = function (user, callback) {
            var userId = user.id;
            for (var i = 0; i < users.length; i++) {
                if (userId == users[i].id) {
                    users[i] = user;
                    return callback(user);
                }
            }
        };
        var findUserByCredentials = function (username, password, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password)
                    return callback(users[i]);
            }
            callback(null);
        };
        return {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser
        }
    }
})();