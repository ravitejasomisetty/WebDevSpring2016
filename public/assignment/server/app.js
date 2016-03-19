

module.exports = function (app) {
    var userModel = require("./models/user.model.js");
    console.log(userModel.findUserByCredentials);

    require("./services/user.service.server.js")(app, userModel);
}