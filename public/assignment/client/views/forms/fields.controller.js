(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController(FieldService, $routeParams,$scope) {
        var vm=this;
        var formId = $routeParams.formId;
        $scope.modalFieldType={};

        FieldService.getFieldsForForm(formId)
            .then(function (res) {
                $scope.fields = res.data;
            });

        function addField(fieldType) {
            FieldService.createFieldForForm(formId, fieldType)
                .then(function (res) {
                    $scope.fields = res.data;
                });
        }


        $scope.selectField=function  (fieldType) {
            $scope.modalFieldType = fieldType;
        }

        $scope.updated=function(fieldType){

        };
    }
})();
