const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-tasks");

let tasks = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();

  if (!text) {
    showError("Task cannot be empty.");
    return;
  }

  const task = { text, completed: false };
  tasks.push(task);
  renderTasks();
  taskInput.value = "";
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.map((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = task.completed ? "completed" : "";
    li.addEventListener("click", () => toggleTask(index));

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    clearTasksRecursive(tasks.length - 1);
    renderTasks();
  }
});

// Demonstrates recursion
function clearTasksRecursive(index) {
  if (index < 0) return;
  tasks.splice(index, 1);
  clearTasksRecursive(index - 1);
}

// Exception handling demo
function showError(message) {
  try {
    if (!message) throw new Error("Unknown error occurred.");
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }).showToast();
  } catch (err) {
    console.error("Toastify error:", err.message);
    alert(message);
  }
}
