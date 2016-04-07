/**
 * Created by ravit on 4/6/2016.
 */
module.exports = function(mongoose) {
    var ReservationSchema = mongoose.Schema({
        "platenumber": String,
        "pickupdate": Date,
        "returndate": Date,
        "reservationdate": Date,
        "status":String,
        "renterid": String,
        "rentid":String
    }, {collection: "grabacar.reservation"});

    return ReservationSchema;
};