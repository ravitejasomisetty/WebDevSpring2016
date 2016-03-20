(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);
    function FieldService($http) {

        function getFieldsForForm(formId) {
            var fields = $http.get("/api/assignment/form/" + formId + "/field");
            return fields;
        }

        function createFieldForForm(formId, fieldType) {
            var forms = $http.post("/api/assignment/form/" + formId + "/field", fieldType);
            return forms;
        }

        return {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm
        }
    }
})();