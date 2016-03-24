/**
 * Created by ravit on 3/22/2016.
 */


module.exports = function (app,uuid) {
    var userModel = require("./models/renter.model.js")(uuid);
    var vehicleModel = require("./models/vehicle.model.js")(uuid);
    var rentModel = require("./models/rent.model.js")(uuid);
    var tellerModel = require("./models/teller.model.js")(uuid);
    var reservationModel = require("./models/reservation.model.js")(uuid);
    var vlocationModel = require("./models/vlocation.model.js")(uuid);
    var locationModel = require("./models/location.model.js")(uuid);
    //var formModel = require("./models/form.model.js")(uuid);

    require("./services/renter.service.server.js")(app, userModel);
    require("./services/vehicle.service.server.js")(app, vehicleModel);
    require("./services/rent.service.server.js")(app, rentModel);
    require("./services/teller.service.server.js")(app, tellerModel);
    require("./services/reservation.service.server.js")(app, reservationModel);
    require("./services/vlocation.service.server.js")(app, vlocationModel);
    require("./services/location.service.server.js")(app, locationModel);
    //require("./services/form.service.server.js")(app, formModel);
    //require("./services/field.service.server.js")(app, formModel);
}