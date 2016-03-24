/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (uuid) {
    var reservations = [{
        "platenumber": "4HS821",
        "pickupdate": "3/23/2016",
        "returndate": "3/26/2016",
        "reservationdate": "3/19/2016",
        "reservationid": "10",
        "userid": "10"
    }];
    return {
        viewReservation: viewReservation,
        newReservation:newReservation,
        updateReservation:updateReservation,
        deleteReservation:deleteReservation,
        findAllReservations:findAllReservations
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