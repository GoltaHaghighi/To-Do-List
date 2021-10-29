const todoInput = document.querySelector("#my-input");
const addTaskBtn = document.querySelector(".addTaskBtn");
const ulList = document.querySelector(".ul-list");
const filterToDo = document.querySelector(".filter-todo");
const situationClass = document.querySelector(".situation");
let x = "";

todoInput.addEventListener("keyup", takeInputValue);
addTaskBtn.addEventListener("click", addTask);
filterToDo.addEventListener("click" , filter);
document.addEventListener("DOMContentLoaded" , getTodo);

function takeInputValue(event) {
    x = event.target.value;
}

function addTask(event) {
    event.preventDefault();
    if (x === "") {
        alert("Enter a task please");
    }
    else {
        saveInLS(x);
        event.preventDefault();
        const liList = document.createElement("div");
        liList.classList.add("li-list");
        liList.classList.add("row");
        liList.classList.add("justify-content-between");
        liList.classList.add("align-items-center");
        ulList.appendChild(liList);
        todoInput.value = "";

        const listTodo = document.createElement("li");
        listTodo.innerText = x;
        liList.appendChild(listTodo);
        const buttonSec = document.createElement("div");
        buttonSec.classList.add("row");
        buttonSec.classList.add("button-sec");
        liList.appendChild(buttonSec);
        const checkBut = document.createElement("button");
        checkBut.classList.add("check-but");
        const iCheckBut = document.createElement("i");
        iCheckBut.classList.add("fa");
        iCheckBut.classList.add("fa-check");
        checkBut.appendChild(iCheckBut);
        buttonSec.appendChild(checkBut);
        const trashBut = document.createElement("button");
        trashBut.classList.add("trash-but");
        const iTrashBut = document.createElement("i");
        iTrashBut.classList.add("fa");
        iTrashBut.classList.add("fa-trash");
        trashBut.appendChild(iTrashBut);
        buttonSec.appendChild(trashBut);

        checkBut.addEventListener("click", checkButClick);
        trashBut.addEventListener("click", trashButClick);

        function checkButClick() {
            liList.classList.toggle("complited");
        }

        function trashButClick(event) {
            const item = event.target.parentElement;
            item.parentElement.remove();
            removeFromLS(item.parentElement);
        }

    }
}

function saveInLS(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
    // localStorage.getItem("todos");
}

function removeFromLS(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.splice(todos.indexOf(todo.children[0].innerText),1);
    localStorage.setItem("todos" , JSON.stringify(todos));
    
}
function getTodo() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const liList = document.createElement("div");
        liList.classList.add("li-list");
        liList.classList.add("row");
        liList.classList.add("justify-content-between");
        liList.classList.add("align-items-center");
        ulList.appendChild(liList);
        todoInput.value = "";
        const listTodo = document.createElement("li");
        listTodo.innerText = todo;
        liList.appendChild(listTodo);
        const buttonSec = document.createElement("div");
        buttonSec.classList.add("row");
        buttonSec.classList.add("button-sec");
        liList.appendChild(buttonSec);
        const checkBut = document.createElement("button");
        checkBut.classList.add("check-but");
        const iCheckBut = document.createElement("i");
        iCheckBut.classList.add("fa");
        iCheckBut.classList.add("fa-check");
        checkBut.appendChild(iCheckBut);
        buttonSec.appendChild(checkBut);
        const trashBut = document.createElement("button");
        trashBut.classList.add("trash-but");
        const iTrashBut = document.createElement("i");
        iTrashBut.classList.add("fa");
        iTrashBut.classList.add("fa-trash");
        trashBut.appendChild(iTrashBut);
        buttonSec.appendChild(trashBut);
        checkBut.addEventListener("click", checkButClick);
        trashBut.addEventListener("click", trashButClick);
        function checkButClick() {
            liList.classList.toggle("complited");
        }
        function trashButClick(event) {
            const item = event.target.parentElement;
            item.parentElement.remove();
            removeFromLS(item.parentElement);
        }
    }
    );
}

function filter(event) {
    for (let index = 1; index < ulList.childNodes.length; index++) {
        filterSec(ulList.childNodes[index]);
        function filterSec(todo) {
            if(event.target.value === "All"){
                todo.classList.add("flex");  
            } else if (event.target.value === "Complited"){
                if (todo.classList.contains("complited")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            } else if (event.target.value === "Not Complited"){
                if (todo.classList.contains("complited")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
            }
        }  
    }
}
