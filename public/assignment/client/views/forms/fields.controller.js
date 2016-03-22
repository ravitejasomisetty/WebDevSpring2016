(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController(FieldService, $rootScope,$routeParams, $scope) {
        var vm = this;
        $scope.formId = $routeParams.formId;
        var formId = $scope.formId;
        $scope.updated = {};
        $scope.modalFieldType = {};

        if($rootScope.user) {
            FieldService.getFieldsForForm(formId)
                .then(function (res) {
                    $scope.fields = res.data;
                });
        }

        $scope.addField = function (fieldType) {
            var field = "";
            if (fieldType == "Single Line Text")
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            else if (fieldType == "DropDown")
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};

            else if (fieldType == "Date")
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};

            else if (fieldType == "Checkboxes")
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};

            else if (fieldType == "Radio buttons")
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};


            if (fieldType == "Paragraph Text Field")
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};

            if (field!="") {
                FieldService.createFieldForForm(formId, field)
                    .then(function (res) {
                        $scope.fields = res.data;
                    });
            }
        }

        $scope.selectField = function (fieldType) {
            $scope.modalFieldType._id = fieldType._id;
            $scope.modalFieldType.label = fieldType.label;
            $scope.modalFieldType.type = fieldType.type;
            $scope.modalFieldType.placeholder = fieldType.placeholder;
            if (fieldType.options != null) {
                var optionsStr = "";
                for (var i = 0; i < fieldType.options.length; i++) {
                    optionsStr = optionsStr + fieldType.options[i].label + ":" + fieldType.options[i].value + "\n";
                }

                $scope.modalFieldType.options = optionsStr;
            }

        };

        $scope.removeField = function (field) {
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function (res) {
                    $scope.fields = res.data;
                    console.log($scope.fields);
                });
        }

        $scope.updateField = function (fieldType) {
            $scope.modalFieldType.label = fieldType.txtLabel;
            fieldType.txtLabel="";
            if(fieldType.txtPlaceholder)
            {
                $scope.modalFieldType.placeholder = fieldType.txtPlaceholder;
                fieldType.txtPlaceholder="";

            }
            var arrayOfObj = [];
            if ($scope.modalFieldType.options.length!=0) {
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
            arrayOfObj=[];
            FieldService.updateField(formId, $scope.modalFieldType._id, $scope.modalFieldType)
                .then(
                    function (res) {
                        $scope.fields = res.data;
                    }
                );
        };
    }
})();
