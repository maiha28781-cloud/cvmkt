const tasks = [
  {
    id: 1,
    title: "Thiết kế KV campaign 9.9",
    assignee: "Thiết kế",
    reviewer: "Leader kiêm Ads",
    priority: "High",
    due: "2024-09-02",
    description: "Đề xuất 2 hướng màu sắc và layout.",
    status: "doing",
    checklist: [
      { text: "Lên moodboard", done: true },
      { text: "Thiết kế key visual", done: false },
      { text: "Xuất file bàn giao", done: false },
    ],
    dependsOn: null,
  },
  {
    id: 2,
    title: "Lên kế hoạch ads tuần 3",
    assignee: "Leader kiêm Ads",
    reviewer: "Content",
    priority: "Medium",
    due: "2024-09-05",
    description: "Phân bổ ngân sách, xác định nhóm target.",
    status: "todo",
    checklist: [
      { text: "Tổng hợp dữ liệu tuần trước", done: false },
      { text: "Xác định nhóm target", done: false },
      { text: "Phân bổ ngân sách", done: false },
    ],
    dependsOn: null,
  },
  {
    id: 3,
    title: "Quay & dựng video 15s",
    assignee: "Quay dựng",
    reviewer: "Leader kiêm Ads",
    priority: "High",
    due: "2024-09-07",
    description: "Dựng video dựa trên KV đã chốt.",
    status: "todo",
    checklist: [
      { text: "Quay footage", done: false },
      { text: "Dựng rough cut", done: false },
      { text: "Chèn subtitle", done: false },
    ],
    dependsOn: 1,
  },
  {
    id: 4,
    title: "Viết caption social",
    assignee: "Content",
    reviewer: "Leader kiêm Ads",
    priority: "Low",
    due: "2024-09-04",
    description: "Viết 3 caption theo tone mới.",
    status: "review",
    checklist: [
      { text: "Draft 3 phiên bản", done: true },
      { text: "Kiểm tra chính tả", done: true },
      { text: "Gửi leader duyệt", done: false },
    ],
    dependsOn: null,
  },
];

const columns = document.querySelectorAll(".column");
const filterRole = document.querySelector("#filter-role");
const filterStatus = document.querySelector("#filter-status");
const taskForm = document.querySelector("#task-form");
const dependencySelect = document.querySelector("#dependency-select");
const metrics = {
  total: document.querySelector("#metric-total"),
  progress: document.querySelector("#metric-progress"),
  done: document.querySelector("#metric-done"),
};

const statusLabels = {
  todo: "To do",
  doing: "Doing",
  review: "Review",
  done: "Done",
};

const priorityClass = (priority) => `priority-${priority.toLowerCase()}`;

const formatDate = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("vi-VN");
};

const daysUntil = (value) => {
  if (!value) return null;
  const due = new Date(value);
  const today = new Date();
  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diff = due - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getReminderTag = (task) => {
  if (!task.due) return null;
  if (task.status === "done") {
    return { label: "Đã hoàn tất", className: "reminder-ok" };
  }
  const diff = daysUntil(task.due);
  if (diff === null) return null;
  if (diff < 0) {
    return { label: `Quá hạn ${Math.abs(diff)} ngày`, className: "reminder-danger" };
  }
  if (diff <= 2) {
    return { label: `Còn ${diff} ngày`, className: "reminder-warning" };
  }
  return { label: `Còn ${diff} ngày`, className: "reminder-ok" };
};

const getDependencyInfo = (task) => {
  if (!task.dependsOn) return null;
  const dependency = tasks.find((item) => item.id === task.dependsOn);
  if (!dependency) return { label: "Dependency không tồn tại", status: "--" };
  return { label: dependency.title, status: statusLabels[dependency.status] };
};

const buildChecklist = (task) => {
  if (!task.checklist || task.checklist.length === 0) {
    return "<p>Chưa có checklist.</p>";
  }

  const items = task.checklist
    .map(
      (item, index) => `
        <li>
          <label>
            <input type="checkbox" data-task-id="${task.id}" data-check-index="${index}" ${
              item.done ? "checked" : ""
            } />
            <span>${item.text}</span>
          </label>
        </li>
      `
    )
    .join("");

  return `<ul class="checklist">${items}</ul>`;
};

const buildTaskCard = (task) => {
  const card = document.createElement("article");
  card.className = "task";
  card.dataset.status = task.status;
  card.dataset.assignee = task.assignee;

  const reminder = getReminderTag(task);
  const dependency = getDependencyInfo(task);
  const checklistDone = task.checklist?.filter((item) => item.done).length ?? 0;
  const checklistTotal = task.checklist?.length ?? 0;

  card.innerHTML = `
    <div class="task-header">
      <h4>${task.title}</h4>
      <span class="tag ${priorityClass(task.priority)}">${task.priority}</span>
    </div>
    <p>${task.description || "Chưa có mô tả."}</p>
    <div class="task-meta">
      <span>Phụ trách: ${task.assignee}</span>
      <span>Review: ${task.reviewer}</span>
      <span>Deadline: ${formatDate(task.due)}</span>
      <span>${statusLabels[task.status]}</span>
    </div>
    <div class="task-meta">
      <span class="tag">Checklist ${checklistDone}/${checklistTotal}</span>
      ${
        reminder
          ? `<span class="tag ${reminder.className}">${reminder.label}</span>`
          : ""
      }
      ${dependency ? `<span class="dependency">Phụ thuộc: ${dependency.label} (${dependency.status})</span>` : ""}
    </div>
    ${buildChecklist(task)}
    <div class="task-actions">
      <button data-action="todo">To do</button>
      <button data-action="doing">Doing</button>
      <button data-action="review">Review</button>
      <button data-action="done">Done</button>
    </div>
  `;

  card.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateTaskStatus(task.id, btn.dataset.action);
    });
  });

  card.querySelectorAll("input[data-task-id]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const taskId = Number(checkbox.dataset.taskId);
      const index = Number(checkbox.dataset.checkIndex);
      const target = tasks.find((item) => item.id === taskId);
      if (!target || !target.checklist?.[index]) return;
      target.checklist[index].done = checkbox.checked;
      renderBoard();
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
  updateDependencyOptions();
};

const updateMetrics = () => {
  const total = tasks.length;
  const progress = tasks.filter((task) => task.status === "doing").length;
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

const updateDependencyOptions = () => {
  if (!dependencySelect) return;
  const current = dependencySelect.value || "none";
  dependencySelect.innerHTML = '<option value="none">Không có</option>';
  tasks.forEach((task) => {
    const option = document.createElement("option");
    option.value = String(task.id);
    option.textContent = `${task.title} (${statusLabels[task.status]})`;
    dependencySelect.appendChild(option);
  });
  dependencySelect.value = current;
};

const updateTaskStatus = (id, status) => {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;

  if (task.dependsOn && status !== "todo") {
    const dependency = tasks.find((item) => item.id === task.dependsOn);
    if (dependency && dependency.status !== "done") {
      alert(`Chưa thể chuyển trạng thái vì phụ thuộc "${dependency.title}" chưa hoàn tất.`);
      return;
    }
  }

  task.status = status;
  renderBoard();
};

const parseChecklist = (value) => {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((text) => ({ text, done: false }));
};

const addTask = (data) => {
  tasks.unshift({
    id: Date.now(),
    title: data.title,
    assignee: data.assignee,
    reviewer: data.reviewer,
    priority: data.priority,
    due: data.due,
    description: data.description,
    status: "todo",
    checklist: parseChecklist(data.checklist),
    dependsOn: data.dependsOn,
  });
  renderBoard();
};

filterRole.addEventListener("change", renderBoard);
filterStatus.addEventListener("change", renderBoard);

if (taskForm) {
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(taskForm);
    const dependencyValue = formData.get("dependency");
    addTask({
      title: formData.get("title"),
      assignee: formData.get("assignee"),
      reviewer: formData.get("reviewer"),
      priority: formData.get("priority"),
      due: formData.get("due"),
      description: formData.get("description"),
      checklist: formData.get("checklist") || "",
      dependsOn: dependencyValue && dependencyValue !== "none" ? Number(dependencyValue) : null,
    });
    taskForm.reset();
  });
}

renderBoard();
