"use strict";
module.exports = function (app, model) {
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllUsers);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    var createFormForUser = function (req, res) {
        var userId=req.params.userId;
        var form=req.query.form;
        form.userId=userId;
        form._id=new Date().getTime();
        var forms = model.Create(form);
        res.send(forms);
    }

    var findFormById = function (req, res) {
        var form = model.FindById(req.params.formId);
        res.send(form);
    }

    var updateForm = function (req, res) {
        model.Update(req.params.formId, req.body);
    }

    var deleteFormById = function (req, res) {
        model.Delete(req.params.formId);
    }
};