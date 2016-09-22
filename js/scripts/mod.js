var todo = (function() {
    var todolist = [{ completed: false, todoText: 'Get list ordered' }, { completed: false, todoText: 'finish list' }];
    var elem = document.querySelector('.todoModule');
    var btn = elem.querySelector('button');
    var inputs = elem.querySelector('input[type="text"]');
    var ul = elem.querySelector('ul');
    var template = document.querySelector('#template').innerHTML;
    var self = this;

    function render() {
        var i = 0,
            len = todolist.length,
            data = todolist;
        ul.innerHTML = '';
        for (; i < len; i++) {
            ul.innerHTML += template
                .replace(/{{completed}}/g, data[i].completed)
                .replace(/{{todoText}}/g, data[i].todoText)
        }
        // del = ul.querySelectorAll('i.del');
        // del.forEach(function(data) {
        //     data.addEventListener('click', function() {
        //         deleteToDo(this);
        //     })
        // })
    };


    function addToDo(val) {
        val = (typeof val === 'string') ? val : inputs.value;
        console.log(val);
        if (val === "") {
            return;
        } else {
            todolist.push({ completed: false, todoText: val });
            render();
            inputs.value = '';
        }
    };

    function deleteToDo(self) {
        var i = Array.from(self.parentNode.parentNode.children).indexOf(self.parentNode);
        todolist.splice(i, 1);
        render();
    }

    btn.addEventListener('click', addToDo);
    ul.addEventListener('click', function(e) {
        deleteToDo(e.target.parentNode.querySelector('i.del'));
    })
    render();

    return {
        addToDo: addToDo,
        deleteToDo: deleteToDo

    };
})();