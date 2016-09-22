(function(window) {
    window.todo = {
        toDoList: [],
        addToDo: function(toDoText) {
            this.toDoList.push({ completed: false, toDoText: toDoText });
        },
        changeToDo: function(position, toDoText) {
            this.toDoList[position].toDoText = toDoText;
        },
        deleteToDo: function(position) {
            this.toDoList.splice(position, 1);
        },
        toggleCompleted: function(position) {
            var val = this.toDoList[position];
            val.completed = !val.completed;
        }
    };
    //create a handler object to hold all the button events!
    window.e = {
        displayToDo: function() {
            var todo_list = document.querySelector("ul");
            var total_todo = document.querySelector('.info').querySelectorAll('span')[0];
            todo_list.innerHTML = '';
            for (var i = 0; i < todo.toDoList.length; i++) {
                var newToDo = document.createElement("li");
                newToDo.className = "item";
                newToDo.innerHTML = "<div><input type='checkbox' onclick='e.onComplete(" + i + ",this)'/><span onclick = 'e.changeToDo(" + i + ")'>" +
                    todo.toDoList[i].toDoText + "</span><input id ='inputToDoText' type='text' onkeypress='e.changeMade(" + i + ",event)'></input>" +
                    "<button onclick='e.deleteToDo(" + i + ")'>Delete</button></div>";
                newToDo.id = i;

                todo_list.appendChild(newToDo);
            }
            total_todo.innerHTML = todo.toDoList.length + "To Dos";
        },
        addToDo: function() {
            var todo_text = document.getElementById("addToDoText");
            if (todo_text.value) {
                todo.addToDo(todo_text.value);
                todo_text.value = "";
            } else {
                alert("Please add a To Do");
            }
            this.displayToDo();
        },
        changeToDo: function(position) {
            //onblur='this.disabled =true'
            //document.getElementById('textId').disabled = false; document.getElementById('textId').value=this.innerHTML;this.style.display='none'
            var todoElem = document.getElementById(position.toString());
            var spanText = todoElem.parentNode.querySelector('span');
            var inputText = todoElem.parentNode.querySelector('#inputToDoText');
            inputText.value = spanText.innerHTML;
            spanText.zIndex = 1;
            inputText.zIndex = 2;
            spanText.disabled = true;
            inputText.disabled = false;
            spanText.style.visibility = 'hidden';
            inputText.style.visibility = 'visible';
            inputText.focus();
            inputText.addEventListener('blur', function() {
                spanText.innerHTML = inputText.value;
                todo.toDoList[position].toDoText = inputText.value;
                spanText.zIndex = 2;
                inputText.zIndex = 1;
                spanText.disabled = false;
                inputText.disabled = true;
                spanText.style.visibility = 'visible';
                inputText.style.visibility = 'hidden';
            });

        },
        changeMade: function(position, event) {
            var todoElem = document.getElementById(position.toString());
            var spanText = todoElem.parentNode.querySelector('span');
            var inputText = todoElem.parentNode.querySelector('#inputToDoText');
            if (event.key === "Enter") {
                spanText.innerHTML = inputText.value;
                //todoElem.toDoList[position].toDoText = inputText.value;
                spanText.zIndex = 2;
                inputText.zIndex = 1;
                spanText.disabled = false;
                inputText.disabled = true;
                spanText.style.visibility = 'visible';
                inputText.style.visibility = 'hidden';
            }

        },
        toggleAll: function() {
            todo.toggleAll();
            var completedToDo = document.querySelectorAll("input[type='checkbox']");
            var totalToDos = document.querySelectorAll("li");
            var completed = 0;
            for (var i = 0; i < totalToDos.length; i++) {
                if (completedToDo[i].checked) {
                    completed++;
                }
            }
            if (completed < totalToDos.length) {
                for (var i = 0; i < totalToDos.length; i++) {
                    completedToDo[i].checked = true;
                }
            } else {
                for (var i = 0; i < totalToDos.length; i++) {
                    completedToDo[i].checked = false;
                }
            }
            todo.displayToDo();
        },
        deleteToDo: function(position) {
            var element = document.getElementById(position.toString());
            todo.deleteToDo(position);
            element.parentNode.removeChild(element);
            this.displayToDo();
        },
        toggleCompleted: function() {
            var completedToDo = document.querySelectorAll("input[checked=true]");
            var totalToDos = document.querySelectorAll("li");
            var total_todo_completed = document.querySelector('.info').querySelectorAll('span')[2];
            console.log(todo.toDoList, "before Delete");
            for (var i = 0; i < completedToDo.length; i++) {
                //object position needs to be fixed on delete
                todo.toDoList[i].completed = completedToDo[i].checked;
                todo.deleteToDo(completedToDo[i].parentNode.parentNode.id);
                completedToDo[i].parentNode.parentNode.parentNode.removeChild(completedToDo[i].parentNode.parentNode);
            }

            total_todo_completed.textContent = "0 completed";
            console.log(todo.toDoList, "After Delete");
            this.displayToDo();
            //console.log(todo.toDoList, "After Delete");
        },
        addInputText: function(event) {
            if (event.keyCode === 13) {
                this.addToDo();
            }
        },
        onComplete: function(position, ckd) {
            var total_todo = document.querySelector('.info').querySelectorAll('span')[2];
            var counter = 0;
            console.log(todo.toDoList);
            todo.toDoList[position].completed = ckd.checked;
            ckd.setAttribute('checked', ckd.checked);
            for (var i = 0; i < todo.toDoList.length; i++) {
                if (todo.toDoList[i].completed) {
                    counter += 1;
                }
            }
            total_todo.innerHTML = counter + "completed";
        }
    };
})(window);