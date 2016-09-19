(function(MakeShift) {
    /*

    */
    var app = MakeShift.module("todo");
    app.component('thelist', {
        ctrl: function($scope) {
            $scope.title = "title";
        }
    });


})(MakeShift);