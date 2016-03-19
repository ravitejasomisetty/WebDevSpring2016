

module.exports = function (app) {
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();

    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
}