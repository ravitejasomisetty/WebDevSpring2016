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

        function createFieldForForm(formId, field) {
            var fields = $http.post("/api/assignment/form/" + formId + "/field", field);
            return fields;
        }

        function updateField(formId,fieldId,field)
        {
            var fields=$http.put("/api/assignment/form/"+formId+"/field/"+fieldId,field);
            console.log(fields);
            return fields;
        }

        function deleteFieldFromForm(formId,fieldId){
            var fields=$http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
            console.log(fields);
            return fields;
        }

        return {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            updateField:updateField,
            deleteFieldFromForm:deleteFieldFromForm
        }
    }
})();