const tasks = [
  {
    id: 1,
    title: "Thiết kế KV campaign 9.9",
    assignee: "Thiết kế",
    reviewer: "Leader",
    priority: "High",
    due: "2024-09-02",
    description: "Đề xuất 2 hướng màu sắc và layout.",
    status: "doing",
    campaign: "Mega Sale 9.9",
    channel: "Facebook",
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
    assignee: "Leader",
    reviewer: "Content",
    priority: "Medium",
    due: "2024-09-05",
    description: "Phân bổ ngân sách, xác định nhóm target.",
    status: "todo",
    campaign: "Mega Sale 9.9",
    channel: "Google",
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
    reviewer: "Leader",
    priority: "High",
    due: "2024-09-07",
    description: "Dựng video dựa trên KV đã chốt.",
    status: "todo",
    campaign: "Mega Sale 9.9",
    channel: "TikTok",
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
    reviewer: "Leader",
    priority: "Low",
    due: "2024-09-04",
    description: "Viết 3 caption theo tone mới.",
    status: "review",
    campaign: "Brand Awareness",
    channel: "Facebook",
    checklist: [
      { text: "Draft 3 phiên bản", done: true },
      { text: "Kiểm tra chính tả", done: true },
      { text: "Gửi leader duyệt", done: false },
    ],
    dependsOn: null,
  },
];

const briefs = [
  {
    id: 1,
    name: "Brief Video 9.9",
    objective: "Tăng 30% lead",
    insight: "Khách muốn deal nhanh và tin cậy",
    channel: "TikTok",
    keyMessage: "Sale 9.9 giảm sâu",
    cta: "Nhắn tin nhận ưu đãi",
    deadline: "2024-09-07",
    status: "Waiting review",
    history: "Content cập nhật 14:20 • Leader duyệt 15:10",
  },
];

const calendarItems = [
  {
    date: "09/02",
    channel: "Facebook",
    caption: "Deal 9.9 chốt ngay hôm nay",
    status: "Draft",
    task: "Viết caption social",
  },
  {
    date: "09/03",
    channel: "TikTok",
    caption: "Video 15s teaser",
    status: "Approved",
    task: "Quay & dựng video 15s",
  },
  {
    date: "09/04",
    channel: "Google",
    caption: "Search ads ưu đãi 9.9",
    status: "Scheduled",
    task: "Lên kế hoạch ads tuần 3",
  },
];

const assets = [
  {
    name: "KV-9.9-v1.png",
    version: "v1",
    tag: "Sale",
    link: "https://drive.google.com/",
  },
  {
    name: "Video-15s-final.mp4",
    version: "final",
    tag: "Branding",
    link: "https://drive.google.com/",
  },
];

const reports = [
  {
    title: "Tuần 1",
    spend: "35,000,000",
    leads: "320",
    cpa: "109,000",
    roas: "2.4",
    delta: 12,
    note: "Tăng ngân sách TikTok +10%",
  },
  {
    title: "Tuần 2",
    spend: "42,000,000",
    leads: "380",
    cpa: "110,000",
    roas: "2.1",
    delta: -8,
    note: "CTR Facebook giảm do creative cũ",
  },
];

const campaigns = [
  {
    name: "Mega Sale 9.9",
    time: "01/09 - 09/09",
    budget: "120,000,000",
    channels: "Facebook, TikTok, Google",
    tasks: "12 task",
  },
  {
    name: "Brand Awareness",
    time: "10/09 - 20/09",
    budget: "60,000,000",
    channels: "Facebook",
    tasks: "6 task",
  },
];

const roles = [
  {
    name: "Leader/Admin",
    description: "Tạo campaign, duyệt nội dung, xem tất cả báo cáo.",
  },
  {
    name: "Content",
    description: "Tạo bài, chỉnh caption, gửi duyệt.",
  },
  {
    name: "Thiết kế",
    description: "Upload asset, nhận task design, cập nhật version.",
  },
  {
    name: "Quay dựng",
    description: "Nhận task video, upload bản dựng, gửi review.",
  },
];

const templates = [
  {
    name: "Template Brief nội dung",
    detail: "Mục tiêu, insight, key message, CTA, deadline.",
  },
  {
    name: "Template kịch bản video",
    detail: "Hook → Insight → Offer → CTA.",
  },
  {
    name: "Template báo cáo tuần",
    detail: "Spend, Leads, CPA, ROAS, ghi chú thay đổi.",
  },
  {
    name: "Checklist sản xuất video",
    detail: "Quay → dựng → sub → xuất.",
  },
];

const notifications = [
  {
    title: "Task sắp đến hạn",
    detail: "Thiết kế KV campaign 9.9 còn 1 ngày.",
  },
  {
    title: "Need fix",
    detail: "Caption social cần chỉnh CTA.",
  },
  {
    title: "Task mới assign",
    detail: "Quay & dựng video 15s.",
  },
];

const filterAssignee = document.querySelector("#filter-assignee");
const filterStatus = document.querySelector("#filter-status");
const filterCampaign = document.querySelector("#filter-campaign");
const filterChannel = document.querySelector("#filter-channel");
const filterDeadline = document.querySelector("#filter-deadline");
const searchInput = document.querySelector("#task-search");
const currentUser = document.querySelector("#current-user");

const metricMy = document.querySelector("#metric-my");
const metricDue = document.querySelector("#metric-due");

const statusLabels = {
  todo: "To do",
  doing: "Doing",
  review: "Review",
  done: "Done",
};

const priorityClass = (priority) => `priority-${priority.toLowerCase()}`;

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
  const items = task.checklist
    .map(
      (item) => `
        <li>
          <label>
            <input type="checkbox" ${item.done ? "checked" : ""} disabled />
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

  const reminder = getReminderTag(task);
  const dependency = getDependencyInfo(task);
  const checklistDone = task.checklist.filter((item) => item.done).length;

  card.innerHTML = `
    <div class="task-header">
      <h4>${task.title}</h4>
      <span class="tag ${priorityClass(task.priority)}">${task.priority}</span>
    </div>
    <p>${task.description}</p>
    <div class="task-meta">
      <span>Phụ trách: ${task.assignee}</span>
      <span>Review: ${task.reviewer}</span>
      <span>Deadline: ${task.due}</span>
    </div>
    <div class="task-meta">
      <span class="tag">Checklist ${checklistDone}/${task.checklist.length}</span>
      <span class="tag">Campaign: ${task.campaign}</span>
      <span class="tag">Kênh: ${task.channel}</span>
      ${reminder ? `<span class="tag ${reminder.className}">${reminder.label}</span>` : ""}
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
    btn.addEventListener("click", () => updateTaskStatus(task.id, btn.dataset.action));
  });

  return card;
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

const matchesDeadline = (task, filterValue) => {
  const diff = daysUntil(task.due);
  if (filterValue === "overdue") return diff !== null && diff < 0;
  if (filterValue === "soon") return diff !== null && diff <= 2;
  if (filterValue === "future") return diff !== null && diff > 2;
  return true;
};

const renderBoard = () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const assigneeValue = filterAssignee.value;
  const statusValue = filterStatus.value;
  const campaignValue = filterCampaign.value;
  const channelValue = filterChannel.value;
  const deadlineValue = filterDeadline.value;

  document.querySelectorAll(".task-list").forEach((list) => (list.innerHTML = ""));

  const filtered = tasks.filter((task) => {
    const matchKeyword =
      !keyword ||
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword);
    const matchAssignee = assigneeValue === "all" || task.assignee === assigneeValue;
    const matchStatus = statusValue === "all" || task.status === statusValue;
    const matchCampaign = campaignValue === "all" || task.campaign === campaignValue;
    const matchChannel = channelValue === "all" || task.channel === channelValue;
    const matchDeadline = matchesDeadline(task, deadlineValue);

    return (
      matchKeyword &&
      matchAssignee &&
      matchStatus &&
      matchCampaign &&
      matchChannel &&
      matchDeadline
    );
  });

  filtered.forEach((task) => {
    const column = document.querySelector(`.column[data-status="${task.status}"]`);
    if (column) {
      column.querySelector(".task-list").appendChild(buildTaskCard(task));
    }
  });

  document.querySelectorAll("[data-count]").forEach((countEl) => {
    const status = countEl.dataset.count;
    const count = tasks.filter((task) => task.status === status).length;
    countEl.textContent = count;
  });

  updateMyTasks();
};

const updateMyTasks = () => {
  const user = currentUser.value;
  const myTasks = tasks.filter((task) => task.assignee === user);
  const dueSoon = myTasks.filter((task) => {
    const diff = daysUntil(task.due);
    return diff !== null && diff <= 2 && task.status !== "done";
  });
  metricMy.textContent = myTasks.length;
  metricDue.textContent = dueSoon.length;
};

const populateFilters = () => {
  const assignees = Array.from(new Set(tasks.map((task) => task.assignee)));
  const campaignsUnique = Array.from(new Set(tasks.map((task) => task.campaign)));

  assignees.forEach((assignee) => {
    const option = document.createElement("option");
    option.value = assignee;
    option.textContent = assignee;
    filterAssignee.appendChild(option);
  });

  campaignsUnique.forEach((campaign) => {
    const option = document.createElement("option");
    option.value = campaign;
    option.textContent = campaign;
    filterCampaign.appendChild(option);
  });
};

const renderCalendar = () => {
  const calendar = document.querySelector("#calendar-grid");
  calendar.innerHTML = "";
  calendarItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "calendar-card";
    card.innerHTML = `
      <strong>${item.date} • ${item.channel}</strong>
      <p>${item.caption}</p>
      <p class="meta">${item.status} • Task: ${item.task}</p>
    `;
    calendar.appendChild(card);
  });
};

const renderAssets = () => {
  const container = document.querySelector("#asset-list");
  container.innerHTML = "";
  assets.forEach((asset) => {
    const item = document.createElement("div");
    item.className = "asset-item";
    item.innerHTML = `
      <strong>${asset.name}</strong>
      <span class="tag">${asset.version}</span>
      <span class="tag">${asset.tag}</span>
      <a href="${asset.link}" target="_blank" rel="noreferrer">Mở link</a>
    `;
    container.appendChild(item);
  });
};

const renderReports = () => {
  const container = document.querySelector("#report-grid");
  container.innerHTML = "";
  reports.forEach((report) => {
    const card = document.createElement("div");
    card.className = "report-card";
    const deltaClass = report.delta >= 0 ? "positive" : "negative";
    const deltaSymbol = report.delta >= 0 ? "+" : "";
    card.innerHTML = `
      <strong>${report.title}</strong>
      <div class="metric">Spend: ${report.spend}</div>
      <div>Leads: ${report.leads}</div>
      <div>CPA/CPL: ${report.cpa}</div>
      <div>ROAS: ${report.roas}</div>
      <div class="delta ${deltaClass}">${deltaSymbol}${report.delta}% vs tuần trước</div>
      <p>${report.note}</p>
    `;
    container.appendChild(card);
  });
};

const renderCampaigns = () => {
  const container = document.querySelector("#campaign-grid");
  container.innerHTML = "";
  campaigns.forEach((campaign) => {
    const card = document.createElement("div");
    card.className = "campaign-card";
    card.innerHTML = `
      <strong>${campaign.name}</strong>
      <p>Thời gian: ${campaign.time}</p>
      <p>Ngân sách: ${campaign.budget}</p>
      <p>Kênh: ${campaign.channels}</p>
      <p>Task: ${campaign.tasks}</p>
    `;
    container.appendChild(card);
  });
};

const renderRoles = () => {
  const container = document.querySelector("#role-grid");
  container.innerHTML = "";
  roles.forEach((role) => {
    const card = document.createElement("div");
    card.className = "role-card";
    card.innerHTML = `
      <strong>${role.name}</strong>
      <p>${role.description}</p>
    `;
    container.appendChild(card);
  });
};

const renderTemplates = () => {
  const container = document.querySelector("#template-grid");
  container.innerHTML = "";
  templates.forEach((template) => {
    const card = document.createElement("div");
    card.className = "template-card";
    card.innerHTML = `
      <strong>${template.name}</strong>
      <p>${template.detail}</p>
    `;
    container.appendChild(card);
  });
};

const renderNotifications = () => {
  const container = document.querySelector("#notification-list");
  container.innerHTML = "";
  notifications.forEach((notification) => {
    const card = document.createElement("div");
    card.className = "notification-card";
    card.innerHTML = `
      <strong>${notification.title}</strong>
      <p>${notification.detail}</p>
    `;
    container.appendChild(card);
  });
};

const setupTabs = () => {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
    });
  });
};

[filterAssignee, filterStatus, filterCampaign, filterChannel, filterDeadline].forEach((el) => {
  el.addEventListener("change", renderBoard);
});

searchInput.addEventListener("input", renderBoard);
currentUser.addEventListener("change", updateMyTasks);

populateFilters();
renderBoard();
renderCalendar();
renderAssets();
renderReports();
renderCampaigns();
renderRoles();
renderTemplates();
renderNotifications();
setupTabs();
