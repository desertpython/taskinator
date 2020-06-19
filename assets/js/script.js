var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskFormHandler = function(event) {
  console.log("inside taskFormHandler")
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
  alert("You need to fill out the task form!");
  return false;
}

  var isEdit = formEl.hasAttribute("data-task-id");
  
  // PUT THIS BELOW `var isEdit = ...` in `taskFormHandler()`

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
  var taskId = formEl.getAttribute("data-task-id");
  completeEditTask(taskNameInput, taskTypeInput, taskId);
} 
// no data attribute, so create object as normal and pass to createTaskEl function
else {
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  var completeEditTask = function(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
  };
  createTaskEl(taskDataObj);
}

// not sure where this goes yet directions unclear...
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  return actionContainerEl

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);
  actionContainerEl.appendChild(deleteButtonEl);

};
  //not sure where this goes either...
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("div");
  listItemEl.className = "task-item";
  console.log(taskDataObj);



  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  listItemEl.setAttribute("draggable", "true");
 

}
formEl.addEventListener("click", taskFormHandler); {
  //event.preventDefault();
  //var taskNameInput = document.querySelector("input[name='task-name']").value;
  //var taskTypeInput = document.querySelector("select[name='task-type']").value;
  // console.dir(taskNameInput);
  // var listItemEl = document.createElement("li");
  // listItemEl.className = "task-item";
  // listItemEl.textContent = taskNameInput;
  // tasksToDoEl.appendChild(listItemEl);
  console.log("clicked line 77")
};
pageContentEl.addEventListener("click", taskButtonHandler);

var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};
  if (event.target.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }

  var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
      tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
      tasksCompletedEl.appendChild(taskSelected);
    }
  };


  var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
  
    // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
};
}
// find the matching task list item
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

alert("Task Updated!");

formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";

pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("dragstart", dragTaskHandler);
var dragTaskHandler = function(event) {
  var taskId = event.target.getAttribute("data-task-id");
  event.dataTransfer.setData("text/plain", taskId);
  var getId = event.dataTransfer.getData("text/plain");
  console.log("getId:", getId, typeof getId);
}
var dropZoneDragHandler = function(event) {
  console.log("Dragover Event Target:", event.target);
  event.preventDefault();
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    event.preventDefault();
  if (event.target.closest(".task-list"));
};

pageContentEl.addEventListener("dragover", dropZoneDragHandler);

pageContentEl.addEventListener("drop", dropTaskHandler);

var dropTaskHandler = function(event) {
  var id = event.dataTransfer.getData("text/plain");
  console.log("Drop Event Target:", event.target, event.dataTransfer, id);
  var draggableElement = document.querySelector("[data-task-id='" + id + "']");
  var dropZoneEl = event.target.closest(".task-list");
  var statusType = dropZoneEl.id;
  // set status of task based on dropZone id
  var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
  if (statusType === "tasks-to-do") {
    statusSelectEl.selectedIndex = 0;
  } 
  else if (statusType === "tasks-in-progress") {
    statusSelectEl.selectedIndex = 1;
  } 
  else if (statusType === "tasks-completed") {
    statusSelectEl.selectedIndex = 2;
    dropZoneEl.appendChild(draggableElement);
  };
