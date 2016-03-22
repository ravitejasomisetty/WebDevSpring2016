

module.exports = function (app,uuid) {
    var userModel = require("./models/user.model.js")(uuid);
    var formModel = require("./models/form.model.js")(uuid);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);
}