/**
 * Created by ravit on 3/22/2016.
 */


module.exports = function (app,uuid) {
    var userModel = require("./models/user.model.js")(uuid);
    var vehicleModel = require("./models/vehicle.model.js")(uuid);
    //var formModel = require("./models/form.model.js")(uuid);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/vehicle.service.server.js")(app, vehicleModel);
    //require("./services/form.service.server.js")(app, formModel);
    //require("./services/field.service.server.js")(app, formModel);
}