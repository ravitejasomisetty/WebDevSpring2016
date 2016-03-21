(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController(FieldService, $routeParams, $scope, $route) {
        var vm = this;
        var formId = $routeParams.formId;
        $scope.updated = {};
        $scope.modalFieldType = {};

        FieldService.getFieldsForForm(formId)
            .then(function (res) {
                $scope.fields = res.data;
            });

        $scope.addField = function (fieldType) {

            var field = "";
            if (fieldType == "Single Line Text")
                field = {"_id": null, "label": "Text Field", "type": "TEXT", "placeholder": "New Field"};

            else if (fieldType == "DropDown")
                field = {
                    "_id": null, "label": "Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "Option 1"},
                        {"label": "Option 2", "value": "Option 2"},
                        {"label": "Option 3", "value": "Option 3"}
                    ]
                };

            else if (fieldType == "Date")
                field = {"_id": null, "label": "Date Field", "type": "DATE"};

            else if (fieldType == "Checkboxes")
                field = {
                    "_id": null, "label": "Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option 1", "value": "Option 1"},
                        {"label": "Option 2", "value": "Option 2"},
                        {"label": "Option 3", "value": "Option 3"}
                    ]
                };

            else if (fieldType == "Radio buttons")
                field = {
                    "_id": null, "label": "Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option 1", "value": "Option 1"},
                        {"label": "Option 2", "value": "Option 2"},
                        {"label": "Option 3", "value": "Option 3"}
                    ]
                };

            FieldService.createFieldForForm(formId, field)
                .then(function (res) {
                    $scope.fields = res.data;
                });
        }


        $scope.selectField = function (fieldType) {
            $scope.modalFieldType._id = fieldType._id;
            $scope.modalFieldType.label = fieldType.label;
            $scope.modalFieldType.type = fieldType.type;
            $scope.modalFieldType.placeholder = fieldType.placeholder;

            var optionsStr = "";
            for (var i = 0; i < fieldType.options.length; i++) {
                optionsStr = optionsStr + fieldType.options[i].label + ":" + fieldType.options[i].value + "\n";
            }

            $scope.modalFieldType.options = optionsStr;

        };

        $scope.removeField=function(field){
            FieldService.deleteFieldFromForm(formId,field._id)
                .then(function(res){
                    $scope.fields=res.data;
                    console.log($scope.fields);
                });
        }

        $scope.updateField = function (fieldType) {
            $scope.modalFieldType.label = fieldType.txtLabel;

            var arrayOfObj = []
            if ($scope.modalFieldType.options) {
                var lines = $scope.modalFieldType.options.split("\n");
                for (var i in lines) {
                    var obj = {
                        "label": lines[i].split(":")[0],
                        "value": lines[i].split(":")[1]
                    };

                    arrayOfObj.push(obj);
                }
            }

            $scope.modalFieldType.options = arrayOfObj;

            FieldService.updateField(formId, $scope.modalFieldType._id, $scope.modalFieldType)
                .then(
                    function (res) {
                        $scope.fields = res.data;
                        console.log($scope.fields);
                    }
                );
        };
    }
})();
