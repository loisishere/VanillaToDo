(function(MakeShift) {
        var data = []
        var app = MakeShift.module("todo");
        app.views('thelist', {
                tags: ['text'],
                data: data
            }

        });


})(MakeShift);