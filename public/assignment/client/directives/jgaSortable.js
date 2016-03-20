(function () {
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
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
                    scope.$apply();
                }
            }).disableSelection();
        }

        return {
            link: link
        }
    }
})();