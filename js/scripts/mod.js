var todo = (function() {
    var todolist = [{ completed: false, todoText: 'Get list ordered' }, { completed: false, todoText: 'finish list' }];
    var elem = document.querySelector('.todoModule');
    var btn = elem.querySelector('button');
    var inputs = elem.querySelector('input[type="text"]');
    var ul = elem.querySelector('ul');
    var template = document.querySelector('#template').innerHTML;
    // var self = this;

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
        pubsub.publish('activeTasks', todolist);
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
        console.log(idx);
        todolist.splice(idx, 1);
        _render();
    }

    btn.addEventListener('click', addToDo);
    ul.addEventListener('click', function(e) {
        var i = Array.from(this.children).indexOf(e.target.parentNode);
        deleteToDo(i);
    })
    _render();

    return {
        addToDo: addToDo,
        deleteToDo: deleteToDo

    };
})();