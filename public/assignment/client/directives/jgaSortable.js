(function () {
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable(FieldService) {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                handle: '.sortingHandle',
                start: function (event, ui) {
                    start = ui.item.index();
                    console.log("start" + start);
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;

                    FieldService.updateFieldsOrder(scope.formId,scope.fields)
                        .then(function(res){
                            scope.fields=res.data;
                        })
                }
            }).disableSelection();
        }

        return {
            link: link
        }
    }
})();