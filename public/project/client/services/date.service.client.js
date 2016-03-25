/**
 * Created by ravit on 3/25/2016.
 */
(function () {
    'use strict';
    angular
        .module("GrabACar")
        .factory("DateService", DateService);
    function DateService() {
        return {
            obtainDate: obtainDate,
            diffInDays: diffInDays
        }
        function obtainDate(myDate) {
            if (myDate) {
                var dd = myDate.getDate();
                var mm = myDate.getMonth() + 1;
                var yyyy = myDate.getFullYear();

                if (dd < 10) dd = "0" + dd;
                if (mm < 10) mm = "0" + mm;
                var returnDate = mm + "/" + dd + "/" + yyyy;
                return returnDate;
            }
        }

        function diffInDays(aDate, bDate) {
            var constant = 1000 * 60 * 60 * 24;
            var days = Math.round((bDate - aDate) / constant);
            return days;
        }
    }
})();