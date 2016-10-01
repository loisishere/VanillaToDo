var todo = (function() {
    'use strict;'
    var todolist = [];
    var elem = document.querySelector('.todoModule');
    var addBtn = elem.querySelector('#addToDo');
    var toggleBtn = elem.querySelector('#completeAll');
    var deleteCompleteBtn = elem.querySelector('#deleteCompleted');
    var inputs = elem.querySelector('input[type="text"]');
    var ul = elem.querySelector('ul');
    var template = document.querySelector('#todoTemplate').innerHTML;
    addBtn.addEventListener('click', addToDo);
    ul.addEventListener('click', function(e) {
        if (e.target.className === 'del') {
            var i = Array.from(this.children).indexOf(e.target.parentNode);
            deleteToDo(i);
        }
        if (e.target.id === "toggle") {
            var i = Array.from(this.children).indexOf(e.target.parentNode);
            toggleTaskComplete(i);
        }
        if (e.target.nodeName === "INPUT") {
            var i = Array.from(this.children).indexOf(e.target.parentNode);
            if (e.target.disabled) {
                e.target.disabled = false;
                console.log(e.target.onchange);
            } else {
                e.target.onblur = changeToDo(i, e.target.value);

            };
            //toggleTaskComplete(i);
        }
    });
    toggleBtn.addEventListener('click', toggleAllCompleted);
    deleteCompleteBtn.addEventListener('click', deleteCompleted);
    _render();

    function _render() {
        var i = 0,
            len = todolist.length,
            data = todolist;
        ul.innerHTML = '';
        for (; i < len; i++) {
            ul.innerHTML += template
                .replace(/{{completed}}/g, data[i].completed)
                .replace(/{{id}}/g, i)
                .replace(/{{todoText}}/g, data[i].todoText);
        }
        events.emit('activeTasks', todolist.length);
    };

    function addToDo(val) {
        val = (typeof val === 'string') ? val : inputs.value;
        console.log(val);
        if (val === "") {
            return;
        } else {
            todolist.push({ completed: "todo--uncompleted", todoText: val });
            _render();
            inputs.value = '';
        }
    };

    function deleteToDo(idx) {
        todolist.splice(idx, 1);
        _render();
    }

    function toggleAllCompleted() {
        var taskCompleted = todolist.filter(function(a) { return a["completed"] === "todo--completed" ? a : "" }).length;
        var totalTasks = todolist.length;
        console.log(taskCompleted, totalTasks);
        if (taskCompleted < totalTasks) {
            for (var i = 0; i < totalTasks; i++) {
                todolist[i].completed = "todo--completed";
            }
        }
        if (taskCompleted === totalTasks) {
            for (var i = 0; i < totalTasks; i++) {
                todolist[i].completed = "todo--uncompleted";
            }

        }
        _render();
    }

    function changeToDo(idx, txt) {
        todolist[idx].todoText = txt;
        _render();
    }

    function toggleTaskComplete(idx) {
        if (todolist[idx].completed === "todo--uncompleted") {
            todolist[idx].completed = "todo--completed";
        } else {
            todolist[idx].completed = "todo--uncompleted";
        }
        _render();
    }

    function deleteCompleted() {
        todolist = todolist.filter(function(a) { return a["completed"] === "todo--uncompleted" ? a : "" });
        _render();
    }
})();