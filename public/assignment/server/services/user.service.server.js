"use strict";
module.exports = function (app, userModel) {
    app.get("/api/assignment/user", function (req, res) {
            var credentials = {
                "username": req.query.username,
                "password": req.query.password
            };
        console.log(credentials.username);
        console.log(userModel);
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        }
    );
};
