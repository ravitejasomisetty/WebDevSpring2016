
/**
 * Created by ravit on 3/23/2016.
 */
module.exports = function (uuid) {
    var tellers = [{
        "password": "raviteja",
        "username": "raviteja",
        "fullname": "Somisetty, Raviteja",
        "address": "Boston",
        "employeeid": "10",
        "managerid": "10"
    }];
    return {
        viewTeller: viewTeller,
        newTeller:newTeller,
        updateTeller:updateTeller,
        deleteTeller:deleteTeller,
        findAllTellers:findAllTellers
    }

    function findAllTellers(){
        return tellers;
    }

    function viewTeller(employeeid) {
        for (var i = 0; i < tellers.length; i++) {
            if (tellers[i].employeeid == employeeid) {
                return tellers[i];
            }
        }
        return null;
    }

    function newTeller(teller){
        var tellerid=uuid.v1();
        teller.employeeid=employeeid;
        tellers.push(teller);
        return tellers;
    }

    function updateTeller(teller){
        for(var i=0;i<tellers.length;i++){
            if(tellers[i].employeeid==teller.employeeid)
            {
                tellers[i]=teller;
                return tellers;
            }
        }
        return null;
    }

    function deleteTeller(employeeid){
        for(var i=0;i<tellers.length;i++)
        {
            if(tellers[i].employeeid==employeeid)
            {
                tellers.splice(i,1);
            }
        }
        return tellers;
    }
};