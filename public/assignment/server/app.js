

module.exports = function (app) {
    var userModel = require("./models/test.model.js");
    console.log(userModel);
    //var formModel = require("./models/form.model.js");
    //var fieldModel = require("./models/field.model.js")(formModel);

    require("./services/test.service.server.js")(app, userModel);
    //var formService = require("./services/form.service.server.js")(app, formModel, userModel);
    //var fieldService = require("./services/field.service.server.js")(app, formModel, fieldModel);
}