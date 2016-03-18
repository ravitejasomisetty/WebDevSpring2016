/**
 * Created by ravit on 3/17/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        function createFieldForForm(formId, field) {
            var form = $http.post("/api/assignment/form/" + formId + "/field" + field);
            return form;
        }

        function getFieldsForForm(formId) {
            var fields = $http.get("/api/assignment/form/" + formId + "/field");
            return fields;
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            var updatedForm = $http.delete("/api/assignment/form/" + formId + "/field" + fieldId);
            return updatedForm;
        }

        function updateField(formId, fieldId, field) {
            $http.put("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        return {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        }
    }
})();