

module.exports = function (app,mongoose,db,uuid) {
    var userModel = require("./models/user.model.js")(mongoose,db,uuid);
    var formModel = require("./models/form.model.js")(mongoose,db,uuid);
    var fieldModel = require("./models/field.model.js")(mongoose,db,uuid);
    var renterModel=require("../../project/server/models/renter.model.js")(mongoose,db,uuid);

    var vehicleModel = require("../../project/server/models/vehicle.model.js")(mongoose,db,uuid);
    var rentModel = require("../../project/server/models/rent.model.js")(mongoose,db,uuid);
    var tellerModel = require("../../project/server/models/teller.model.js")(mongoose,db,uuid);
    var reservationModel = require("../../project/server/models/reservation.model.js")(mongoose,db,uuid);
    var vlocationModel = require("../../project/server/models/vlocation.model.js")(uuid);
    var locationModel = require("../../project/server/models/location.model.js")(mongoose,db,uuid);

    require("./services/user.service.server.js")(app, userModel,renterModel,tellerModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel,fieldModel);


    //var formModel = require("./models/form.model.js")(uuid);

    require("../../project/server/services/renter.service.server.js")(app, renterModel);
    require("../../project/server/services/vehicle.service.server.js")(app, vehicleModel);
    require("../../project/server/services/rent.service.server.js")(app, rentModel);
    require("../../project/server/services/teller.service.server.js")(app, tellerModel);
    require("../../project/server/services/reservation.service.server.js")(app, reservationModel);
    require("../../project/server/services/vlocation.service.server.js")(app, vlocationModel);
    require("../../project/server/services/location.service.server.js")(app, locationModel);
}   