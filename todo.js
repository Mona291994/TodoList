const addTaskBtn = document.getElementById('addtask-btn');
const inputTask = document.getElementById('ip-task');
const addToIncompleted = document.querySelector('.incompleted-list');
const addToCompleted = document.querySelector('.completed-list');
const deleteTaskArray = document.querySelectorAll('.delete-task');
const taskCompleteCB = document.querySelectorAll('.task-complete');
let counter;
let todoTaskArray;
let layout="";
addTaskBtn.addEventListener("click",checkData);
inputTask.addEventListener("keyup",enterClick);


function enterClick(e){
    if(e.keyCode===13){
      checkData();
    }
}
function checkData(){
  const inputValue = inputTask.value;
  if(inputValue){
    const todoTasks = document.querySelectorAll(".task-detail p");
    if(todoTasks.length>0){
      for(let i=0;i< todoTasks.length; i++){
        if(todoTasks[i].innerText.toLowerCase() !== inputValue.toLowerCase()){
            if(i===todoTasks.length-1){
              addTodo(inputValue);
            }
        }
        else{
          document.querySelector(".error").innerText="This ToDo Task is Already Added";
          break;
        }
      }
    }
    else if(todoTasks.length===0){
      addTodo(inputValue);
    }
  }
  else{
    document.querySelector(".error").innerText="Please add ToDo Task";
  }

}

function addTodo(inputValue){
  document.querySelector(".error").innerText="";
  layout = `<div class="todo-task" id="todo-task${counter}">
    <div class="complete-task-sec">
      <input type="checkbox" name="complete-task-cb" value="" class="task-complete" id="task-complete-${counter}">
    </div>
    <div class="task-detail" id ="task-detail-${counter}">
      <p>${inputValue}</p>
    </div>
    <div class="task-delete-sec" id="task-delete-sec-${counter}">
    <a class="delete-task"><i class="fa-solid fa-trash-can iconify" id="iconify${counter}"></i> </a>
    </div>
  </div>`;
  addToIncompleted.insertAdjacentHTML("beforeend",layout);
  addToLocalStorage(inputValue);
}
function addToLocalStorage(inputValue){
  let todoList = {};
  todoList.id=counter;
  todoList.task = inputValue;
  todoList.complete = false;
  todoTaskArray.push(todoList);
  localStorage.setItem("todoList",JSON.stringify(todoTaskArray));
  counter++;
}

function completeTask(myTarget){
  let todoList ={};
  let splitID = myTarget.substr(14, myTarget.length);
  let convertToMainDivId = `todo-task${splitID}`;
    if(document.getElementById(myTarget).checked){
      document.getElementById(convertToMainDivId).classList.toggle("completed");
    }
    else{
      document.getElementById(convertToMainDivId).classList.toggle("completed");
    }
    document.getElementById(convertToMainDivId).remove();
    todoTaskArray.forEach((item, i) => {
      if(item.id==splitID){
        if(item.complete===false){
          item.complete = true;
          layout = `<div class="todo-task completed" id="${convertToMainDivId}">
            <div class="complete-task-sec">
              <input type="checkbox" name="complete-task-cb" value="" class="task-complete" checked="true" id="task-complete-${splitID}">
            </div>
            <div class="task-detail" id ="task-detail-${splitID}">
              <p>${item.task}</p>
            </div>
            <div class="task-delete-sec" id="task-delete-sec-${splitID}">
            <a class="delete-task">
            <i class="fa-solid fa-trash-can iconify" id="iconify${splitID}"></i>
            </a>
            </div>
          </div>`;
          addToCompleted.insertAdjacentHTML("beforeend",layout);
        }
        else{
          item.complete = false;
          layout = `<div class="todo-task" id="${convertToMainDivId}">
            <div class="complete-task-sec">
              <input type="checkbox" name="complete-task-cb" value="" class="task-complete" id="task-complete-${splitID}">
            </div>
            <div class="task-detail" id ="task-detail-${splitID}">
              <p>${item.task}</p>
            </div>
            <div class="task-delete-sec" id="task-delete-sec-${splitID}">
            <a class="delete-task">
            <i class="fa-solid fa-trash-can iconify" id="iconify${splitID}"></i>
            </a>
            </div>
          </div>`;
          addToIncompleted.insertAdjacentHTML("beforeend",layout);
        }
      }
    });
    localStorage.setItem("todoList",JSON.stringify(todoTaskArray));
}

function deleteTodo(myId){
  let splitID = myId.substr(7, myId.length);
  let convertToMainDivId = `todo-task${splitID}`;
  let todoList ={};
  document.getElementById(convertToMainDivId).classList.add("deleted");
  todoTaskArray.forEach((item, i) => {
    if(item.id==splitID){
      todoTaskArray.splice(i,1);
    }
  });
  console.log(splitID);
  localStorage.setItem("todoList",JSON.stringify(todoTaskArray));
  document.getElementById(convertToMainDivId).remove();
}


document.addEventListener('click',function(e){
    if(e.target.classList.contains("iconify")){
      deleteTodo(e.target.getAttribute("id"));
    }
     else if(e.target.classList.contains("task-complete"))
    {
      completeTask(e.target.getAttribute("id"));
    }
  });

(function(){
  // console.log(localStorage.getItem("todoList"));
  // console.log(localStorage.getItem("todoList").length);
  if(localStorage.getItem("todoList")===null){
    todoTaskArray = [];
    counter = 1;
  }
  else{
    todoTaskArray = JSON.parse(localStorage.getItem("todoList"));
    if(todoTaskArray.length===0){
      counter = 1;
    }
    else{
      todoTaskArray.forEach((item, i) => {
        counter = item.id;
        if(item.complete === true){
          layout = `<div class="todo-task completed" id="todo-task${counter}">
            <div class="complete-task-sec">
              <input type="checkbox" name="complete-task-cb" value="" class="task-complete" checked="true" id="task-complete-${counter}">
            </div>
            <div class="task-detail" id ="task-detail-${counter}">
              <p>${item.task}</p>
            </div>
            <div class="task-delete-sec" id="task-delete-sec-${counter}">
            <a class="delete-task">
            <i class="fa-solid fa-trash-can iconify" id="iconify${counter}"></i>
            </a>
            </div>
          </div>`;
          addToCompleted.insertAdjacentHTML("beforeend",layout);
        }
        else{
          layout = `<div class="todo-task" id="todo-task${counter}">
            <div class="complete-task-sec">
              <input type="checkbox" name="complete-task-cb" value="" class="task-complete" id="task-complete-${counter}">
            </div>
            <div class="task-detail" id ="task-detail-${counter}">
              <p>${item.task}</p>
            </div>
            <div class="task-delete-sec" id="task-delete-sec-${counter}">
            <a class="delete-task"> <i class="fa-solid fa-trash-can iconify" id="iconify${counter}"></i></a>
            </div>
          </div>`;
          addToIncompleted.insertAdjacentHTML("beforeend",layout);
        }

      });
      counter++;
    }
  }
})();
