var todo = (function() {
    'use strict;'
    var todolist = [{ completed: true, todoText: 'Get list ordered' }, { completed: false, todoText: 'finish list' }];
    var elem = document.querySelector('.todoModule');
    var btn = elem.querySelector('button');
    var inputs = elem.querySelector('input[type="text"]');
    var ul = elem.querySelector('ul');
    var template = document.querySelector('#template').innerHTML;
    // var self = this;
    btn.addEventListener('click', addToDo);
    ul.addEventListener('click', function(e) {
        if (e.target.nodeName === 'I') {
            var i = Array.from(this.children).indexOf(e.target.parentNode);
            deleteToDo(i);
        }
    })
    _render();

    function _render() {
        var i = 0,
            len = todolist.length,
            data = todolist;
        ul.innerHTML = '';
        for (; i < len; i++) {
            ul.innerHTML += template
                .replace(/{{completed}}/g, data[i].completed)
                .replace(/{{todoText}}/g, data[i].todoText)
        }
        events.emit('activeTasks', todolist.length);
    };

    function addToDo(val) {
        val = (typeof val === 'string') ? val : inputs.value;
        console.log(val);
        if (val === "") {
            return;
        } else {
            todolist.push({ completed: false, todoText: val });
            _render();
            inputs.value = '';
        }
    };

    function deleteToDo(idx) {
        todolist.splice(idx, 1);
        _render();
    }

    function toggleAllCompleted() {
        var taskCompleted = todolist.filter(function(a) { return a["completed"] === true ? a : "" }).length;
        var totalTasks = todolist.length;

    }
    toggleAllCompleted();
    return {
        addToDo: addToDo,
        deleteToDo: deleteToDo

    };
})();