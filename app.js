const tasks = [
  {
    id: 1,
  },
];

const columns = document.querySelectorAll(".column");
const filterRole = document.querySelector("#filter-role");
const filterStatus = document.querySelector("#filter-status");
const taskForm = document.querySelector("#task-form");
const metrics = {
  total: document.querySelector("#metric-total"),
  progress: document.querySelector("#metric-progress"),
  done: document.querySelector("#metric-done"),
};

const statusLabels = {


const buildTaskCard = (task) => {
  const card = document.createElement("article");
  card.className = "task";
  card.dataset.status = task.status;
  card.dataset.assignee = task.assignee;


  card.innerHTML = `
    <div class="task-header">
      <h4>${task.title}</h4>
      <span class="tag ${priorityClass(task.priority)}">${task.priority}</span>
    </div>
    <p>${task.description || "Chưa có mô tả."}</p>
    <div class="task-meta">

    </div>
  `;

  card.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateTaskStatus(task.id, btn.dataset.action);
    });
  });


  return card;
};

const renderBoard = () => {
  const roleFilter = filterRole.value;
  const statusFilter = filterStatus.value;

  columns.forEach((column) => {
    const list = column.querySelector(".task-list");
    list.innerHTML = "";
  });

  const filtered = tasks.filter((task) => {
    const matchRole = roleFilter === "all" || task.assignee === roleFilter;
    const matchStatus = statusFilter === "all" || task.status === statusFilter;
    return matchRole && matchStatus;
  });

  filtered.forEach((task) => {
    const column = document.querySelector(`.column[data-status="${task.status}"]`);
    if (column) {
      const list = column.querySelector(".task-list");
      list.appendChild(buildTaskCard(task));
    }
  });

  updateMetrics();

};

const updateMetrics = () => {
  const total = tasks.length;

  const done = tasks.filter((task) => task.status === "done").length;

  if (metrics.total) metrics.total.textContent = total;
  if (metrics.progress) metrics.progress.textContent = progress;
  if (metrics.done) metrics.done.textContent = done;

  document.querySelectorAll("[data-count]").forEach((countEl) => {
    const status = countEl.dataset.count;
    const count = tasks.filter((task) => task.status === status).length;
    countEl.textContent = count;
  });
};


  task.status = status;
  renderBoard();
};


const addTask = (data) => {
  tasks.unshift({
    id: Date.now(),
    title: data.title,
    assignee: data.assignee,

    priority: data.priority,
    due: data.due,
    description: data.description,
    status: "todo",

  });
  renderBoard();
};

filterRole.addEventListener("change", renderBoard);
filterStatus.addEventListener("change", renderBoard);

if (taskForm) {
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(taskForm);

    });
    taskForm.reset();
  });
}

renderBoard();
