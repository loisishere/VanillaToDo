(function(window) {
    'use strict';
    window.MakeShift = {

        module: function(tag) {
            this.tag = document.querySelector(tag);
            var self = this;
            return {
                component: function(name, obj) {
                    var name = this.name = self.tag.querySelector(name),
                        obj = this.obj = obj;

                    return name;
                }
            }
        }
    }


})(window);

/*
module takes in the application tag
component is a function


*/