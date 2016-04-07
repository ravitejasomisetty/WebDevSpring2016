/**
 * Created by ravit on 4/6/2016.
 */
module.exports = function(mongoose) {
    var TellerSchema = mongoose.Schema({
        "password": String,
        "username": String,
        "fullname": String,
        "address": String,
        "managerid": String,
        "rentsApproved":[String],
        "vehiclesAdded":[String]
    }, {collection: "grabacar.teller"});

    return TellerSchema;
};