// ========================================
// To-Do List Application
// Author: Erik Burton
// Description: A web-based task manager that lets users
// add, mark, delete and clear tasks. Includes recurssion,
// ES6 array functions, exception handling and Toastify.js.
// =============================================

// Select DOM Elements
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-tasks");

// Store task in memory
let tasks = [];

// Handles form submission to add a new task.
// Reads input value
// Validates non-empty task
// Pushes task object into tasks array
// Re-renders task list.
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

// Renders all tasks in the task list.
// Uses Array.map() to iterate and build each <li>.
// Attaches click handlers for toggleing and deleting.
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

// Toggles a task's completed state.
// Flips task.completed boolean
// Re-renders tasks
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Deletes a single task at given index.
// Removes using Array.splice()
// Re-renders tasks
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Handles "Clear All Tasks" button click.
// Confirms with user
// Calls recursive function to remove tasks
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    clearTasksRecursive(tasks.length - 1);
    renderTasks();
  }
});

// Demonstrates recursion
// Base case: index < 0
// Recursive case: remove task, call again
function clearTasksRecursive(index) {
  if (index < 0) return;
  tasks.splice(index, 1);
  clearTasksRecursive(index - 1);
}

// Exception handling demo
// Shows an error message to user using Toastify.
// Demonstrates excption handling with try/catch
// Falls back to alert() if Toastify fails
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
