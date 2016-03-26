/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (uuid) {
    var reservations = [{
        "platenumber": "4HS821",
        "pickupdate": "3/19/2016",
        "returndate": "3/21/2016",
        "reservationdate": "3/19/2016",
        "status":"SUCCESS",
        "reservationid": "10",
        "renterid": "123",
        "rentid":"123"
    },
        {
            "platenumber": "F62BGM",
            "pickupdate": "3/31/2016",
            "returndate": "4/6/2016",
            "reservationdate": "3/19/2016",
            "status":"RESERVED",
            "reservationid": "10",
            "renterid": "123",
            "rentid":"345"
        },
        {
            "platenumber": "AHEIWP",
            "pickupdate": "3/29/2016",
            "returndate": "4/2/2016",
            "reservationdate": "3/19/2016",
            "status":"CANCEL",
            "reservationid": "10",
            "renterid": "123",
            "rentid":"456"
        }];
    var recentReservationJSON;
    return {
        viewReservation: viewReservation,
        newReservation:newReservation,
        updateReservation:updateReservation,
        deleteReservation:deleteReservation,
        recentReservation:recentReservation,
        findAllReservations:findAllReservations,
        findAllReservationsByRenter:findAllReservationsByRenter,
        findReservationByRentId:findReservationByRentId
    }

    function findReservationByRentId(rentid){
        for(var i=0;i<reservations.length;i++){
            if(reservations[i].rentid=rentid){
                return reservations[i];
            }
        }
        return null;
    }

    function recentReservation(){
        return recentReservationJSON;
    }

    function findAllReservationsByRenter(renterid){
        var renterReservations=[];
        for(var i=0;i<reservations.length;i++){
            if(reservations[i].renterid==renterid){
                renterReservations.push(reservations[i]);
            }
        }
        return renterReservations;
    }

    function findAllReservations(){
        return reservations;
    }

    function viewReservation(reservationid) {
        for (var i = 0; i < reservations.length; i++) {
            if (reservations[i].reservationid == reservationid) {
                return reservations[i];
            }
        }
        return null;
    }

    function newReservation(reservation){
        var reservationid=uuid.v1();
        reservation.reservationid=reservationid;
        reservations.push(reservation);
        recentReservationJSON=reservation;
        return reservations;
    }

    function updateReservation(reservation){
        for(var i=0;i<reservations.length;i++){
            if(reservations[i].reservationid==reservation.reservationid)
            {
                reservations[i]=reservation;
                return reservations;
            }
        }
        return null;
    }

    function deleteReservation(reservationid){
        for(var i=0;i<reservations.length;i++)
        {
            if(reservations[i].reservationid==reservationid)
            {
                reservations.splice(i,1);
            }
        }
        return reservations;
    }
};