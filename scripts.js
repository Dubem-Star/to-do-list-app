// Get references to the HTML elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const deleteCompletedBtn = document.getElementById("deleteCompletedBtn");
const searchInput = document.getElementById("searchInput");
const pendingBtn = document.getElementById("pendingBtn");
const taskDate = document.getElementById("taskDate");
let draggedTask = null;
const dateBtn = document.getElementById("dateBtn");
const themeBtn = document.getElementById("themeBtn");
const body = document.getElementById("body");
const navbar = document.getElementById("navbar");

//Function to save tasks to Local Storage
function saveTaskToLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const span =
      li.querySelector(".taskSpan") || li.querySelector(".clonedTaskSpan");
    const taskText = span ? span.textContent.trim() : "";
    tasks.push({
      text: taskText,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Tasks saved to localStorage:", tasks);
}

//DATE ICON DISPLAY
dateBtn.addEventListener("click", () => {
  dateBtn.remove();
  taskDate.style.display = "block";
});

//THEME FUNCTION
themeBtn.addEventListener("click", () => {
  if (themeBtn.textContent === "light") {
    body.style.backgroundColor = "#948979";
    navbar.style.backgroundColor = "#543A14";
    themeBtn.textContent = "dark";
    themeBtn.style.backgroundColor = "#333446";
    themeBtn.style.border = "1px solid #90b3ba";
    themeBtn.style.color = "white";
  } else if (themeBtn.textContent === "dark") {
    body.style.backgroundColor = "#7f8caa";
    navbar.style.backgroundColor = "#333446";
    themeBtn.textContent = "light";
    themeBtn.style.backgroundColor = "#d8c4b6";
    themeBtn.style.color = "black";
    themeBtn.style.border = "1px solid black";
  }
});

//SEARCH ICON DISPLAY
const searchIconBtn = document.getElementById("searchIconBtn");
searchIconBtn.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput");
  searchIconBtn.remove();
  searchInput.style.display = "block";
});

//CODE FOR THE SEARCHING
searchInput.addEventListener("input", () => {
  const search = searchInput.value.trim().toLowerCase();
  const allTasks = document.querySelectorAll("#taskList li");

  for (task of allTasks) {
    const span =
      task.querySelector(".taskSpan") || task.querySelector(".clonedTaskSpan");
    const taskText = span.textContent.toLowerCase();

    if (taskText.includes(search)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  }
});

//PENDING BUTTON DISPLAY
function pendingBtnDisplay() {
  const task = document.querySelectorAll("#taskList li");
  if (task.length >= 1) {
    const taskStat = document.getElementById("taskStat");

    pendingBtn.style.display = "block";
  } else {
    pendingBtn.style.display = "none";
  }
}

//FUNCTION FOR PENDINGBTN
pendingBtn.addEventListener("click", () => {
  const tasks = document.querySelectorAll("#taskList li");
  if (pendingBtn.textContent === "Pending") {
    for (task of tasks) {
      if (task.classList.contains("completed")) {
        task.style.display = "none";
        pendingBtn.textContent = "Tasks";
        pendingBtn.style.backgroundColor = "green";
      } else {
        // alert("No Pending Tasks");
        task.style.display = "flex";
      }
    }
  } else {
    for (task of tasks) {
      task.style.display = "flex";
    }
    pendingBtn.textContent = "Pending";
    pendingBtn.style.backgroundColor = "orange";
  }
});

//Function for clearAllBtn Display
function clearAllBtnDisplay() {
  const task = document.querySelectorAll("#taskList li");
  if (task.length >= 2) {
    clearAllBtn.style.display = "block";
  } else {
    clearAllBtn.style.display = "none";
  }
}

// Function to update deleteCompletedBtn visibility
function deleteCompletedBtnShow() {
  const completedTask = document.querySelectorAll("#taskList li.completed");
  if (completedTask.length > 0) {
    deleteCompletedBtn.style.display = "block";
  } else {
    deleteCompletedBtn.style.display = "none";
  }
}

//Button to delete completed tasks
deleteCompletedBtn.addEventListener("click", () => {
  const completedTasks = document.querySelectorAll("#taskList li.completed");
  completedTasks.forEach((task) => task.remove());
  clearAllBtnDisplay();
  updateTaskStats();
  deleteCompletedBtnShow();
  saveTaskToLocalStorage();
  pendingBtnDisplay();
});

// Function to update taskStat
function updateTaskStats() {
  const allTask = document.querySelectorAll("#taskList li");
  const completedTask = document.querySelectorAll("#taskList li.completed");

  document.getElementById("taskStat").textContent = `${allTask.length} task${
    allTask.length !== 1 ? "s" : ""
  } | ${completedTask.length} completed `;
}

// FUNCTION TO ADD A TASK TO TASKLIST
function addTask() {
  const taskText = taskInput.value.trim(); // Get the task text
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create a new list item for the task
  const li = document.createElement("li");
  li.draggable = "true";
  const textSpan = document.createElement("span");
  textSpan.classList.add("taskSpan");
  textSpan.textContent = taskText;

  li.addEventListener("dragstart", (e) => {
    draggedTask = li;
    li.classList.add("dragging");
  });

  li.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  li.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedTask && draggedTask !== li) {
      const ul = li.parentNode;
      ul.insertBefore(draggedTask, li);
      console.log("Dropped!", draggedTask.textContent, "on", li.textContent);
      saveTaskToLocalStorage();
    }
  });

  li.addEventListener("dragend", () => {
    li.classList.remove("dragging");
  });

  //DATE SECTION
  const dateInput = taskDate.value;
  const dueDate = new Date(dateInput);
  const today = new Date();
  const space = " ";

  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const dateSpan = document.createElement("span");
  dateSpan.textContent = `${space}(Due ${dateInput})`;
  dateSpan.style.fontSize = "12px";
  dateSpan.style.color = "gray";

  if (dueDate < today) {
    dateSpan.style.color = "red";
    dateSpan.textContent = "(Overdue)";
  } else if (dueDate.getTime() === today.getTime()) {
    dateSpan.style.color = "orange";
    dateSpan.textContent = "(Due Today)";
  } else {
    dateSpan.style.color = "gray";
  }

  //TASK TEXT CONTAINER CREATION
  const taskTextContainer = document.createElement("div");
  taskTextContainer.style.display = "flex";
  taskTextContainer.classList.add("taskTextContainer");
  taskTextContainer.style.flexDirection = "column";
  taskTextContainer.appendChild(textSpan);
  taskTextContainer.appendChild(dateSpan);

  li.append(taskTextContainer);

  //CREATE EDIT BUTTON
  const editButton = document.createElement("button");
  editButton.textContent = "Edit🖉";
  editButton.classList.add("editBtn");

  //EDIT FUNCTIONALITY
  editButton.addEventListener("click", (event) => {
    const existingSpan = taskTextContainer.querySelector(".taskSpan");
    event.stopPropagation(); // 🛑 Prevent toggle

    if (editButton.textContent === "Edit🖉") {
      const input = document.createElement("input");
      input.classList.add("taskInput");
      input.type = "text";
      input.value = existingSpan.textContent.trim();
      taskTextContainer.replaceChild(input, existingSpan);
      editButton.textContent = "Save💾";
    } else {
      const input = li.querySelector("input");
      const newTask = input.value.trim();
      const newSpan = document.createElement("span");
      newSpan.classList.add("taskSpan");
      newSpan.textContent = newTask;
      taskTextContainer.replaceChild(newSpan, input);
      editButton.textContent = "Edit🖉";
      saveTaskToLocalStorage();
      updateTaskStats();
      pendingBtnDisplay();
    }
  });

  // Create a remove button for each task
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove🗑️";
  removeBtn.classList.add("remove-btn");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btnContainer");
  btnContainer.style.display = "flex";
  btnContainer.style.gap = "5px";
  btnContainer.appendChild(editButton);
  btnContainer.appendChild(removeBtn);
  li.appendChild(btnContainer);

  taskList.appendChild(li); //Add new task to task list
  clearAllBtnDisplay();
  updateTaskStats();
  deleteCompletedBtnShow();
  saveTaskToLocalStorage();
  pendingBtnDisplay();
  taskInput.value = ""; //Clear the input field after adding the task

  //Remove task item when removeBtn is clicked
  removeBtn.addEventListener("click", () => {
    li.remove();
    clearAllBtnDisplay();
    deleteCompletedBtnShow();
    updateTaskStats();
    saveTaskToLocalStorage();
    pendingBtnDisplay();
  });

  //Clear all task when button is clicked
  clearAllBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
    updateTaskStats();
    deleteCompletedBtnShow();
    clearAllBtnDisplay();
    pendingBtnDisplay();
  });

  //COMPLETED TASKS
  li.addEventListener("click", (event) => {
    if (event.target.tagName === "INPUT") return;
    if (li.querySelector(".taskInput")) return;
    if (event.target.tagName === "BUTTON") return;

    editButton.disabled = true;
    editButton.style.opacity = "0.5";
    editButton.style.cursor = "not-allowed";

    li.classList.toggle("completed");

    const existingLine = taskTextContainer.querySelector(".taskLineContainer");
    const taskSpan = taskTextContainer.querySelector(".taskSpan");
    const clonedTaskSpan = taskSpan.cloneNode(true);
    clonedTaskSpan.classList.add("clonedTaskSpan");
    if (li.classList.contains("completed")) {
      //create new elements
      editButton.classList.add("editBtnDisabled");

      const doneSpan = document.createElement("span");
      doneSpan.textContent = "✅";
      doneSpan.classList.add("doneEmoji");

      const taskLineContainer = document.createElement("div");
      taskLineContainer.classList.add("taskLineContainer");
      taskLineContainer.style.display = "flex";
      taskLineContainer.style.alignItems = "center";
      taskLineContainer.style.width = "350px";
      taskLineContainer.appendChild(doneSpan);
      taskLineContainer.appendChild(clonedTaskSpan);
      taskTextContainer.replaceChild(taskLineContainer, taskSpan);
    } else {
      if (existingLine) {
        editButton.disabled = false;
        editButton.style.opacity = "1";
        editButton.style.cursor = "pointer";
        existingLine.remove();
        taskTextContainer.insertBefore(taskSpan, taskTextContainer.firstChild);
      }
    }
    updateTaskStats();
    deleteCompletedBtnShow();
    saveTaskToLocalStorage();
    pendingBtnDisplay();
  });

  saveTaskToLocalStorage();
}

addTaskBtn.addEventListener("click", addTask);
