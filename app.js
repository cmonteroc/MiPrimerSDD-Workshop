import { createTask, filterTasks, toggleStatus, updateTask } from "./src/task-service.js";
import { loadTasks, saveTasks } from "./src/task-store.js";

const app = document.querySelector("#app");
const announcement = document.querySelector("#announcement");
let tasks = [];
let view = "list";
let activeFilter = "all";
let selectedId = null;

function announce(message, error = false) {
  announcement.textContent = message;
  announcement.className = error ? "announcement error" : "announcement";
}

function persist(nextTasks) {
  const result = saveTasks(nextTasks);
  if (!result.ok) {
    announce(result.error, true);
    return false;
  }
  tasks = nextTasks;
  return true;
}

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function renderList() {
  view = "list";
  const visibleTasks = filterTasks(tasks, activeFilter);
  app.className = "app";
  app.innerHTML = `
    <header class="app-header">
      <h1>Curso-PSWE-07</h1>
      <button class="button" id="add-task" type="button">Add task</button>
    </header>
    <nav class="filters" aria-label="Task filters">
      ${["all", "pending", "done"].map((filter) =>
        `<button class="filter ${activeFilter === filter ? "active" : ""}" type="button" data-filter="${filter}">
          ${filter[0].toUpperCase() + filter.slice(1)}
        </button>`).join("")}
    </nav>
    ${visibleTasks.length ? `<ul class="task-list">${visibleTasks.map((task) => `
      <li><button class="task-row ${task.status}" type="button" data-task-id="${task.id}">
        <span class="task-title">${escapeHtml(task.title)}</span>
      </button></li>`).join("")}</ul>` :
      `<p class="empty">${tasks.length ? "No tasks match this filter." : "No tasks yet. Add your first task."}</p>`}
  `;
  document.querySelector("#add-task").addEventListener("click", () => renderForm());
  document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    renderList();
  }));
  document.querySelectorAll("[data-task-id]").forEach((button) => button.addEventListener("click", () => {
    selectedId = button.dataset.taskId;
    renderDetail();
  }));
}

function renderDetail() {
  view = "detail";
  const task = tasks.find((item) => item.id === selectedId);
  if (!task) {
    renderList();
    return;
  }
  app.innerHTML = `
    <header class="app-header"><h1>Curso-PSWE-07</h1></header>
    <section class="detail">
      <h2>${escapeHtml(task.title)}</h2>
      <p class="description">${task.description ? escapeHtml(task.description) : "No description"}</p>
      <p class="status">Status: ${task.status === "done" ? "Done" : "Pending"}</p>
      <div class="actions">
        <button class="button" id="edit-task" type="button">Edit</button>
        <button class="button secondary" id="toggle-status" type="button">
          ${task.status === "done" ? "Mark as not done" : "Mark as done"}
        </button>
        <button class="button warning" id="delete-task" type="button">Delete</button>
        <button class="button secondary" id="back-list" type="button">Back</button>
      </div>
    </section>
  `;
  document.querySelector("#edit-task").addEventListener("click", () => renderForm(task));
  document.querySelector("#toggle-status").addEventListener("click", () => {
    const nextTask = toggleStatus(task);
    const nextTasks = tasks.map((item) => item.id === task.id ? nextTask : item);
    if (persist(nextTasks)) renderDetail();
  });
  document.querySelector("#delete-task").addEventListener("click", () => {
    if (!confirm(`Delete "${task.title}"?`)) {
      renderDetail();
      return;
    }
    if (persist(tasks.filter((item) => item.id !== task.id))) {
      selectedId = null;
      renderList();
      announce("Task deleted.");
    }
  });
  document.querySelector("#back-list").addEventListener("click", renderList);
}

function renderForm(task = null) {
  view = "form";
  app.innerHTML = `
    <header class="app-header"><h1>Curso-PSWE-07</h1></header>
    <form class="form" id="task-form" novalidate>
      <div class="field">
        <label for="task-title">Title (required)</label>
        <input id="task-title" name="title" value="${task ? escapeHtml(task.title) : ""}" required>
        <span class="error" id="title-error"></span>
      </div>
      <div class="field">
        <label for="task-description">Description (optional)</label>
        <textarea id="task-description" name="description">${task ? escapeHtml(task.description) : ""}</textarea>
      </div>
      <div class="actions">
        <button class="button" type="submit">Save</button>
        <button class="button secondary" id="cancel-form" type="button">Cancel</button>
      </div>
    </form>
  `;
  document.querySelector("#task-title").focus();
  document.querySelector("#cancel-form").addEventListener("click", () => task ? renderDetail() : renderList());
  document.querySelector("#task-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = { title: formData.get("title"), description: formData.get("description") };
    try {
      const nextTasks = task
        ? tasks.map((item) => item.id === task.id ? updateTask(task, values) : item)
        : [...tasks, createTask(values)];
      if (persist(nextTasks)) {
        selectedId = task?.id ?? tasks.at(-1)?.id;
        task ? renderDetail() : renderList();
        announce("Task saved.");
      }
    } catch (error) {
      document.querySelector("#title-error").textContent = error.message;
    }
  });
}

const initialLoad = loadTasks();
if (initialLoad.ok) {
  tasks = initialLoad.value;
} else {
  announce(initialLoad.error, true);
}
renderList();
