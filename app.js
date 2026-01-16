const tasks = [
  {
    id: 1,
    title: "Lên kế hoạch ads tuần 3",
    assignee: "Leader kiêm Ads",
    priority: "Cao",
    due: "2024-09-05",
    description: "Phân bổ ngân sách, xác định nhóm target.",
    status: "todo",
  },
  {
    id: 2,
    title: "Viết content teaser campaign",
    assignee: "Content",
    priority: "Trung bình",
    due: "2024-09-04",
    description: "Chuẩn bị 3 concept caption.",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Storyboard video 15s",
    assignee: "Quay dựng",
    priority: "Cao",
    due: "2024-09-03",
    description: "Shot list và pacing theo brief mới.",
    status: "review",
  },
  {
    id: 4,
    title: "Thiết kế KV campaign 9.9",
    assignee: "Thiết kế",
    priority: "Trung bình",
    due: "2024-09-02",
    description: "Đề xuất 2 hướng màu sắc.",
    status: "done",
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
  todo: "Chờ làm",
  "in-progress": "Đang làm",
  review: "Chờ duyệt",
  done: "Hoàn tất",
};

const priorityClass = (priority) =>
  `priority-${priority.toLowerCase().replace(/\s/g, "-")}`;

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
      <span>${task.assignee}</span>
      <span>Hạn: ${task.due || "--"}</span>
      <span>${statusLabels[task.status]}</span>
    </div>
    <div class="task-actions">
      <button data-action="todo">Chờ làm</button>
      <button data-action="in-progress">Đang làm</button>
      <button data-action="review">Chờ duyệt</button>
      <button data-action="done">Hoàn tất</button>
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
  const progress = tasks.filter((task) => task.status === "in-progress").length;
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

const updateTaskStatus = (id, status) => {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;
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
    addTask({
      title: formData.get("title"),
      assignee: formData.get("assignee"),
      priority: formData.get("priority"),
      due: formData.get("due"),
      description: formData.get("description"),
    });
    taskForm.reset();
  });
}

renderBoard();
