"use strict";
module.exports = function (app) {
    function createField(form, field) {
        form.fields.push(field);
        return form.fields;
    }

    return {createField: createField}
}