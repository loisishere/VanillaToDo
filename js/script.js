var todo = {
	toDoList:[],
	addToDo:function(toDoText){
		this.toDoList.push({completed:false, toDoText:toDoText});
		this.displayToDo();
	},
	displayToDo:function(){
		
		if(this.toDoList.length === 0){
				console.log("You have no to dos")
				}else{
					console.log("To Do:");
					for(var i=0; i< this.toDoList.length;i++){
					if(this.toDoList[i].completed){
						console.log("(X)", this.toDoList[i].toDoText);
					}else{
						console.log("( )", this.toDoList[i].toDoText);
					}
				}
			}
	},
	changeToDo:function(position,toDoText){
		this.toDoList[position].toDoText = toDoText;
		this.displayToDo();
	},
	deleteToDo:function(position){
		this.toDoList.splice(position,1);
		this.displayToDo();
	},
	toggleCompleted:function(position){
		var val = this.toDoList[position];
		val.completed = !val.completed;
		this.displayToDo();
	},
	toggleAll:function(){
		var completedToDo = 0;
		var totalToDos = this.toDoList.length;
		for (var i = 0; i< totalToDos; i++) {
			if(this.toDoList[i].completed){
				completedToDo++;
			}
		}if(completedToDo < totalToDos){
			for (var i = 0; i < totalToDos; i++) {
				this.toDoList[i].completed = true;
			}
		}else{
			for (var i = 0; i < totalToDos; i++) {
				this.toDoList[i].completed = false;
			}
		}
		this.displayToDo();
	}

};
//create a handler object to hold all the button events!
var e ={
	displayToDo:function(){
		var todo_list = document.querySelector("ul");
		todo_list.innerHTML ='';	
		for(var i=0;i<todo.toDoList.length;i++){
			var newToDo = document.createElement("li");
			newToDo.className ="item";
			newToDo.innerHTML=  "<div><input type='checkbox'/><span onclick = 'e.changeToDo("+ i +")'>" 
				+ todo.toDoList[i].toDoText + "</span><input id ='inputToDoText' type='text' onkeypress='e.changeMade("+i+",event)'></input>"
				 +"<button onclick='e.deleteToDo("+i+")'>Delete</button></div>";
			newToDo.id = i;

			todo_list.appendChild(newToDo);
		}
	
	},
	addToDo:function(){
		var todo_text = document.getElementById("addToDoText");
		
		if(todo_text.value){
		todo.addToDo(todo_text.value);
		
		todo_text.value ="";
	}else{
		alert("Please add a To Do");
	}
	this.displayToDo();
	},
	changeToDo:function(position){
		//onblur='this.disabled =true'
		//document.getElementById('textId').disabled = false; document.getElementById('textId').value=this.innerHTML;this.style.display='none'
		var todoElem = document.getElementById(position.toString());
		var spanText = todoElem.parentNode.querySelector('span');
		var inputText = todoElem.parentNode.querySelector('#inputToDoText');
		inputText.value = spanText.innerHTML;
		spanText.zIndex =1;
		inputText.zIndex =2;
		spanText.disabled = true;
		inputText.disabled=false;
		spanText.style.visibility = 'hidden';	
		inputText.style.visibility ='visible';
		inputText.focus();
		//todo.disabled = false;
		inputText.addEventListener('blur',function(){
			spanText.innerHTML = inputText.value;
			console.log(todo);
			todo.toDoList[position].toDoText = inputText.value;
		spanText.zIndex =2;
		inputText.zIndex =1;
		spanText.disabled = false;
		inputText.disabled=true;
		spanText.style.visibility = 'visible';	
		inputText.style.visibility ='hidden';
		});
	
	},
	changeMade:function(position, event){
		var todoElem = document.getElementById(position.toString());
		var spanText = todoElem.parentNode.querySelector('span');
		var inputText = todoElem.parentNode.querySelector('#inputToDoText');
			
			if(event.key === "Enter"){
			spanText.innerHTML = inputText.value;
			//todoElem.toDoList[position].toDoText = inputText.value;
		spanText.zIndex =2;
		inputText.zIndex =1;
		spanText.disabled = false;
		inputText.disabled=true;
		spanText.style.visibility = 'visible';	
		inputText.style.visibility ='hidden';
			console.log(inputText.onfocusout());

		}

	},
	toggleAll:function(){
		todo.toggleAll();
		var completedToDo = document.querySelectorAll("input[type='checkbox']");
		var totalToDos = document.querySelectorAll("li");
		var completed =0;
		for (var i = 0; i< totalToDos.length; i++) {
			if(completedToDo[i].checked){
				completed++;
			}
		}
		if(completed < totalToDos.length){
			for (var i = 0; i < totalToDos.length; i++) {
				completedToDo[i].checked = true;
			}
		}else{
			for (var i = 0; i < totalToDos.length; i++) {
				completedToDo[i].checked = false;
			}
		}
		todo.displayToDo();
	},
	deleteToDo:function(position){
		var element = document.getElementById(position.toString());
		element.parentNode.removeChild(element);
		todo.deleteToDo(position);
	},
	toggleCompleted:function(){
		var completedToDo = document.querySelectorAll("input[type='checkbox']");
		var totalToDos = document.querySelectorAll("li");
		for(var i=0;i<completedToDo.length;i++){
			if(completedToDo[i].checked){
				todo.toDoList[i].completed = completedToDo[i].checked;
				var element = document.getElementById(i.toString());
			element.parentNode.removeChild(element);
			todo.deleteToDo(i);
			
			}
		}
	},
	addInputText:function(event){
	if(event.keyCode === 13){
		this.addToDo();
	}
}
}
;