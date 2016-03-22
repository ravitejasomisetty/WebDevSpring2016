(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);
    function FieldService($http) {

        function createFieldForForm(formId, field) {
            var fields = $http.post("/api/assignment/form/" + formId + "/field", field);
            return fields;
        }

        function getFieldsForForm(formId) {
            var fields = $http.get("/api/assignment/form/" + formId + "/field");
            return fields;
        }

        function getFieldForForm(formId, fieldId){
            var field=$http.get(" /api/assignment/form/"+formId+"/field/"+fieldId);
            return field;
        }

        function updateField(formId, fieldId, field) {
            var updatedFields=$http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
            return updatedFields;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var fields = $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
            return fields;
        }

        function updateFieldsOrder(formId, fields) {
            var fields = $http.put("/api/assignment/form/" + formId + "/fields", fields);
            return fields;
        }

        return {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm:getFieldForForm,
            updateField: updateField,
            deleteFieldFromForm: deleteFieldFromForm,
            updateFieldsOrder: updateFieldsOrder
        }
    }
})();