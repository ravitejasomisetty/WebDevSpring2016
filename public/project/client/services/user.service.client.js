(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {
                "id": 123, "fullName": "Alice Wonderland","nationality":"Indian",
                "city":"Hyderabad","mobilenumber":"999999999","birthdate":"9/9/1999",
                "username": "alice", "password": "alice", "email": "alicewonderland@gmail.com"
            },
            {
                "id": 234, "fullName": "Bob Hope","nationality":"Indian",
                "city":"Hyderabad","mobilenumber":"999999999","birthdate":"9/9/1999",
                "username": "bob", "password": "bob", "email": "bobhope@gmail.com"
            },
            {
                "id": 345, "fullName": "Charlie Brown","nationality":"Indian",
                "city":"Hyderabad","mobilenumber":"999999999","birthdate":"9/9/1999",
                "username": "charlie", "password": "charlie", "email": "charliebrown@gmail.com"
            },
            {
                "id": 456, "fullName": "Dan Craig","nationality":"Indian",
                "city":"Hyderabad","mobilenumber":"999999999","birthdate":"9/9/1999",
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
            var userId=user.id;
            for (var i = 0; i < users.length; i++) {
                if (userId == users[i].id) {
                    users[i] = user;
                    return callback(user);
                }
            }
        };
        return {
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser
        }
    }
})();