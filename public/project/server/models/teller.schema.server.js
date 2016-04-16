/**
 * Created by ravit on 4/6/2016.
 */
module.exports = function (mongoose) {
    var RenterSchema = require("./renter.schema.server.js")(mongoose);
    var TellerSchema = mongoose.Schema({
        "password": String,
        "username": String,
        "fullname": String,
        "address": String,
        "managerid": String,
        "rentsApproved": [{_id: false, platenumber: String}],
        "vehiclesAdded": [String],
        "rentersEvaluated": [RenterSchema]
    }, {collection: "grabacar.teller"});

    return TellerSchema;
};