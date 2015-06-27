(function(){

	//building to-do application using constructor pattern
	var _id = function(_id){
		return document.getElementById(_id);
	}
	var _class = function(_class){
		return document.getElementsByClassName(_class)[0];
	}

	var _createElement = function(_element){
		return document.createElement(_element);
	}

	var _classes = function(_classes) {
		return document.getElementsByClassName(_classes);
	}

	//Global object
	var elements = {
		input:_id('input'),
		button:_id('submit'),
		container:_class('container'),
		ul:_createElement("ul")
	}

	//Constructor function
	function Todo(elements){
		this.input = elements.input;
		this.button = elements.button;
		this.container = elements.container;
		this.ul = elements.ul;
	}

	//Events prototype
	Todo.prototype.events = function(){
		this.button.onclick = function(){
			 mytoDo.validate();
		}
		document.onkeydown = function(event){
			if(event.keyCode == 13){
				mytoDo.validate();
			}
			//elements.input.focus()
		}
	}
	
	//Validation prototype
	Todo.prototype.validate = function(){
		if(this.input.value == ""){
			console.log('please input the to do');
		}
		else{
			mytoDo.storeValue(this.input.value);
		}
	}

	//Store value prototype
	Todo.prototype.storeValue = function(value){

		this.input.value = '';
		this.container.appendChild(this.ul);
		this.ul.setAttribute("class","list-container");

		//Creating list
		var li = _createElement("li");
		li.setAttribute("class","list");
		this.ul.appendChild(li);
		var oldLi  = _class('list');
		this.ul.insertBefore(li,oldLi);

		//Creating span
		var content = _createElement("span");
		li.appendChild(content);
		content.setAttribute("class","content");
		content.innerHTML = value;


		//Creating drag icon
		var dragIcon = _createElement("span");
		li.appendChild(dragIcon);
		dragIcon.setAttribute("class","handle");
		dragIcon.innerHTML = "::";
		
		//Setting the ui for list
		mytoDo.setUiControls(li);
		mytoDo.storage();
	}


	Todo.prototype.storage = function(){
		//Storing data into local storage
		var elements = this.ul.innerHTML;
		var setData = localStorage.setItem('id', elements);		
	}
	 
	//Get value on load
	Todo.prototype.getValueOnLoad = function(){

		this.container.appendChild(this.ul);
		this.ul.setAttribute("class","list-container");
		
		var items = localStorage.getItem("id");
		this.ul.innerHTML = items;
	}


	//Creating UI controls
	Todo.prototype.setUiControls = function(li){

		//List ui controls UL
		var uiControls = _createElement('ul');
		uiControls.setAttribute('class','ui-controls');
		li.appendChild(uiControls);

		//List ui controls li
		var edit = _createElement('li');
		edit.setAttribute('class','edit');
		uiControls.appendChild(edit);

		var remove = _createElement('li');
		remove.setAttribute('class','remove');
		uiControls.appendChild(remove);

		//UI controls events
 	 	 mytoDo.edit();
	  	 mytoDo.remove();
	}
	 
	//Edit list
	Todo.prototype.edit = function(edit){

		var edit = _classes('edit');
		for(var i = 0;i<edit.length;i++){
		 	edit[i].onclick = function(event){

				var list = this.parentNode.parentNode;
				var content = list.childNodes[0];
				content.setAttribute("contenteditable","true");
				content.focus();
					 
				if(this.classList.contains("save")){
					 this.removeAttribute('class');
					 this.setAttribute('class','edit');
					 content.blur();

					 mytoDo.storage();
				}
				else{
					this.removeAttribute('class');
					this.setAttribute('class','save');
				}

			}
		}		 
	}

	//remove list
	Todo.prototype.remove = function(remove){
		var remove = _classes('remove');
		 for(var i = 0;i<remove.length;i++){
			remove[i].onclick = function(){
				var list = this.parentNode.parentNode;
				list.remove();
				mytoDo.storage();
			}
		 }
		
	}

	 var mytoDo = new Todo(elements);
	  //initialize functions
	  mytoDo.events();
	  mytoDo.getValueOnLoad();
	  mytoDo.edit();
	  mytoDo.remove();
   
	//drag and drop
    $('.list-container').sortable();

    
	 
})();