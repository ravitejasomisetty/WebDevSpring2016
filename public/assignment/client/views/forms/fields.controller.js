(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController(FieldService, $routeParams,$scope) {
        var formId = $routeParams.formId;

        FieldService.getFieldsForForm(formId)
            .then(function (res) {
                console.log("controller:"+res.data);
                $scope.fields = res.data;
            })

        function addField(fieldType) {
            FieldService.createFieldForForm(formId, fieldType)
                .then(function (res) {
                    $scope.fields = res.data;
                });
        }
    }
})();
