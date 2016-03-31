module.exports = function (mongoose, db, uuid) {
    var q = require("q");
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
        //user._id = uuid.v1();
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        UserModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function FindById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Update(id, user) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                doc.firstName = user.firstName;
                doc.lastName = user.lastName;
                doc.username = user.username;
                doc.password = user.password;
                doc.email = user.email;
                doc.roles = user.roles;

                // save user
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function Delete(id) {
        var deferred = q.defer();
        UserModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;

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