(function(window) {
    'use strict';
    window.MakeShift = {
        //views
        module: function(tag) {
            this.tag = document.querySelector(tag);
            var self = this;
            return {
                views: function(name, obj) {
                    var name = this.name = self.tag.querySelector(name),
                        obj = this.obj = obj;

                },
                controll: function() {
                    //a list of functions to be excuted, button presses etc
                }

            }
        }
    }


})(window);

/*
module takes in the application tag
component is a function


*/