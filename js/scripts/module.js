(function() {
    'use strict;'
    var todo = {
        todoList: [{ completed: false, todoText: 'Get list ordered' }, { completed: false, todoText: 'finish list' }],
        init: function() {
            this.cacheDom();
            this.render();
            this.bindEvents();
        },
        cacheDom: function() {
            this.elem = document.querySelector('.todoModule');
            this.btn = this.elem.querySelector('button');
            this.inputs = this.elem.querySelector('input[type="text"]');
            this.ul = this.elem.querySelector('ul');
            this.template = document.querySelector('#template').innerHTML;
        },
        render: function() {
            var i = 0,
                len = this.todoList.length,
                data = this.todoList;
            this.ul.innerHTML = '';
            for (; i < len; i++) {
                this.ul.innerHTML += this.template
                    .replace(/{{completed}}/g, data[i].completed)
                    .replace(/{{todoText}}/g, data[i].todoText)
            }
            //end of render function
        },
        bindEvents: function() {
            this.btn.addEventListener('click', this.addToDo.bind(this));
            var self = this,
                li = '';
            del = Array.from(this.ul.querySelectorAll('i.del'));
            del.forEach(function(data) {
                li = this;

                data.addEventListener('click', function() {
                    self.deleteToDo(this)
                });
            });
        },
        addToDo: function() {
            // var self = this;
            if (this.inputs.value === "") {
                return;
            } else {
                this.todoList.push({ completed: false, todoText: this.inputs.value });
                this.render();
                this.inputs.value = '';
            }
        },
        deleteToDo: function(self) {
            var i = Array.from(self.parentNode.parentNode.children).indexOf(self.parentNode);
            this.todoList.splice(i, 1);
            //.indexOf(self);
            this.render();
        }

    };

    todo.init();
})();