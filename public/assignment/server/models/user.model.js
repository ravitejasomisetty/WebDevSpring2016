module.exports = function (mongoose, db, uuid) {
    var q = require("q");
    var users = require("./user.mock.json");
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function Create(user) {
        user._id = uuid.v1();
        if (users) {
            users.push(user);
        }
        else users = [user];
        return users;
    }

    function FindAll() {
        var deferred = q.defer();
        UserModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
                console.log(users);
            }
        });
        return deferred.promise;
    }

    function FindById(id) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id)
                return users[i];
        }
        return null;
    }

    function Update(id, user) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].username = user.username;
                users[i].password = user.password;
                users[i].email = user.email;
                users[i].roles = user.roles;
            }
        }
        return users;
    }

    function Delete(id) {
        var usersCopy = users;
        for (var i = 0; i < usersCopy.length; i++) {
            if (usersCopy[i]._id == id) {
                users.splice(i, 1);
            }
        }
        return users;
    }

    function findUserByUsername(username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username)
                return users[i];
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
};