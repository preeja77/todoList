let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton");
let todoUserInputEl = document.getElementById("todoUserInput");
let saveTodoButtonEl = document.getElementById("saveTodoButton");




function getTodoData() {
    let stringfiedList = localStorage.getItem("newTasksToBeDOne");
    let parsedData = JSON.parse(stringfiedList);
    if (parsedData === null) {
        return [];
    } else {
        return parsedData;
    }
}

let newTasks = getTodoData();
let newTasksCount = newTasks.length;


saveTodoButtonEl.onclick = function() {
    localStorage.setItem("newTasksToBeDOne", JSON.stringify(newTasks));
}

function onAddItem() {
    let newItem = todoUserInputEl.value;
    if (todoUserInputEl.value === "") {
        alert("Enter valid input");
        return;
    }

    newTasksCount = newTasksCount + 1;

    let newTask = {
        Subject: newItem,
        uniqueNo: newTasksCount,
        isChecked: false
    };
    newTasks.push(newTask);
    createAndAppendTask(newTask);
    todoUserInputEl.value = "";
}



addTodoButtonEl.onclick = function() {
    onAddItem();
}

function deleteTodoItem(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoElement);

    let deleteItemIndex = newTasks.findIndex(function(eachItem) {
        let eachItemId = "item" + eachItem.uniqueNo;
        if (eachItemId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    newTasks.splice(deleteItemIndex, 1);
}

function addCheckedItem(checkboxId, labelId, todoId) {
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle("checked");

    let todoItemIndex = newTasks.findIndex(function(eachItem) {
        let eachItemId = "item" + eachItem.uniqueNo;
        if (eachItemId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = newTasks[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}


function createAndAppendTask(item) {
    let checkboxId = "checkbox" + item.uniqueNo;
    let labelId = "label" + item.uniqueNo;
    let todoId = "item" + item.uniqueNo;

    //taskContainer
    let taskContainerElement = document.createElement("div");
    taskContainerElement.classList.add("d-flex", "flex-row");
    taskContainerElement.id = todoId;
    todoItemsContainerEl.appendChild(taskContainerElement);

    //inputElement
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.onclick = function() {
        addCheckedItem(checkboxId, labelId, todoId);
    };
    inputElement.checked = item.isChecked;
    inputElement.classList.add("checkbox-input");
    taskContainerElement.appendChild(inputElement);

    //labelContainer 
    let labelContainerEl = document.createElement("div");
    labelContainerEl.classList.add("label-container", "d-flex", "flex-row", "mb-3");
    taskContainerElement.appendChild(labelContainerEl);

    //labelElement
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = item.Subject;
    if (item.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainerEl.appendChild(labelElement);

    //deleteContainer
    let deleteContainerElement = document.createElement("div");
    deleteContainerElement.classList.add("delete-icon-container");
    labelContainerEl.appendChild(deleteContainerElement);

    //deleteIcon
    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconElement.onclick = function() {
        deleteTodoItem(todoId);
    };
    deleteContainerElement.appendChild(deleteIconElement);

}

for (let item of newTasks) {
    createAndAppendTask(item);
}