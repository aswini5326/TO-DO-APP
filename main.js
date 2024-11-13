document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

let tasksData = JSON.parse(localStorage.getItem("tasks")) || [];
let congratulationShown = false; // To track if the congratulations message has already been shown.

function openForm() {
  document.getElementById("taskForm").style.display = "flex";
}

function closeForm() {
  document.getElementById("taskForm").style.display = "none";
}

function resetForm() {
  document.getElementById("textInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("textarea").value = "";
}

function addTask() {
  let task = {
    title: document.getElementById("textInput").value,
    date: document.getElementById("dateInput").value,
    description: document.getElementById("textarea").value,
    completed: false
  };

  tasksData.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasksData));
  renderTasks();
  closeForm();
  resetForm();
}

function renderTasks() {
  let tasksContainer = document.getElementById("tasks");
  tasksContainer.innerHTML = "";

  tasksData.forEach((task, index) => {
    let taskElement = document.createElement("div");
    taskElement.className = `task ${task.completed ? "completed" : ""}`;
    taskElement.innerHTML = `
      <span class="task-title"><strong>${task.title}</strong></span>
      <span class="task-date">${task.date}</span>
      <p class="task-desc">${task.description}</p>
      <div class="task-actions">
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTaskComplete(${index})">
        <button class="edit" onclick="editTask(${index})" ${task.completed ? "disabled" : ""}>Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    tasksContainer.appendChild(taskElement);
  });

  checkAllTasksCompleted();
}

function toggleTaskComplete(index) {
  tasksData[index].completed = !tasksData[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasksData));
  renderTasks();
}

function editTask(index) {
  let task = tasksData[index];
  document.getElementById("textInput").value = task.title;
  document.getElementById("dateInput").value = task.date;
  document.getElementById("textarea").value = task.description;
  deleteTask(index);
  openForm();
}

function deleteTask(index) {
  tasksData.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksData));
  renderTasks();
}

function checkAllTasksCompleted() {
  if (tasksData.length > 0 && tasksData.every(task => task.completed) && !congratulationShown) {
    congratulationShown = true; // Mark that the congratulations message has been shown
    setTimeout(() => alert("Congratulations! You completed all tasks!"), 0);
  }
}

// Initial render of tasks from localStorage
renderTasks();

