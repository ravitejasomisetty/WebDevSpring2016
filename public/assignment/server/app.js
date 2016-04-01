

module.exports = function (app,mongoose,db,uuid) {
    var userModel = require("./models/user.model.js")(mongoose,db,uuid);
    var formModel = require("./models/form.model.js")(mongoose,db,uuid);
    var fieldModel = require("./models/field.model.js")(mongoose,db,uuid);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel,fieldModel);
}