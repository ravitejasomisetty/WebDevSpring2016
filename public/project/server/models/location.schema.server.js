/**
 * Created by ravit on 4/8/2016.
 */
module.exports = function (mongoose) {
    var LocationSchema = mongoose.Schema({
        "address": String
    }, {collection: "grabacar.location"});

    return LocationSchema;
};