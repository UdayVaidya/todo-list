function addTodoItem() {
    let todoInput = document.getElementById("todoInput");
    let todoList = document.getElementById("todoList");

    if (todoInput.value.trim() !== "") {
        let listItem = document.createElement("li");

        listItem.className = "todo-item";
        listItem.draggable = true;

        let itemText = document.createElement("span");
        itemText.textContent = todoInput.value;

        let checkButton = document.createElement("input");
        checkButton.type = "checkbox";
        checkButton.addEventListener("change", function () {
            if (this.checked) {
                itemText.style.textDecoration = "line-through";
            } else {
                itemText.style.textDecoration = "none";
            }
        });

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute('id',"deleteButton");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            listItem.remove();
        });

        let editButton = document.createElement("button");
        editButton.setAttribute('id',"editButton");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            let editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = itemText.textContent.trim();
            listItem.textContent = "";
            listItem.appendChild(editInput);

            editInput.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    itemText.textContent = editInput.value;
                    listItem.textContent = "";
                    listItem.appendChild(checkButton);
                    listItem.appendChild(itemText);
                    listItem.appendChild(editButton);
                    listItem.appendChild(deleteButton);
                }
            });
        });

        listItem.appendChild(checkButton);
        listItem.appendChild(itemText)
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        
        listItem.addEventListener("dragstart",function(){
            listItem.classList.add("dragging")
        });

        listItem.addEventListener("dragend",function(){
            listItem.classList.remove("dragging")
        });

        listItem.addEventListener("dragover",function(e){
            e.preventDefault();
        });

        listItem.addEventListener("dragenter",function(e){
            e.preventDefault();
            let draggingItem = document.querySelector(".dragging");
            if(draggingItem!== listItem){
                todoList.insertBefore(draggingItem,listItem)
            }

        })

        todoInput.value = "";
    }else{
        alert("PLEASE ENTER SOME TEXT")
    }
}

document
    .getElementById("addButton")
    .addEventListener("click",addTodoItem);

document
    .getElementById("deleteAllbutton")
    .addEventListener("click",function(){
        let todoList = document.getElementById("todoList");
        todoList.innerHTML = "";
    });

document
    .getElementById("todoInput")
    .addEventListener("keypress", function (){
      if (Event.key === "Enter") {
        addTodoItem();
      }
    });