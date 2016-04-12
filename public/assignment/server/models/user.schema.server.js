/**
 * Created by ravit on 3/29/2016.
 */
module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "emails": [String],
        "phones":[String],
        "roles":[String]
    }, {collection: "assignment.user"});

    return UserSchema;
};