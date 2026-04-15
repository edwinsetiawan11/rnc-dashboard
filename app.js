const STORAGE_KEY = "rnc-workforce-dashboard-v3";
const SHARED_PASSWORD = "RNC2026!";

const users = [
  { username: "admin", password: SHARED_PASSWORD, name: "RNC Admin", role: "Admin", team: "Operations", isAdmin: true },
  { username: "employee01", password: SHARED_PASSWORD, name: "Alya Pratama", role: "Brand Strategist", team: "Planning", isAdmin: false },
  { username: "employee02", password: SHARED_PASSWORD, name: "Bima Saputra", role: "Graphic Designer", team: "Creative", isAdmin: false },
  { username: "employee03", password: SHARED_PASSWORD, name: "Citra Lestari", role: "Copywriter", team: "Content", isAdmin: false },
  { username: "employee04", password: SHARED_PASSWORD, name: "Dion Rahman", role: "Digital Ads Specialist", team: "Performance", isAdmin: false },
  { username: "employee05", password: SHARED_PASSWORD, name: "Eka Wulandari", role: "Project Coordinator", team: "Operations", isAdmin: false },
  { username: "employee06", password: SHARED_PASSWORD, name: "Faris Hidayat", role: "Videographer", team: "Production", isAdmin: false },
  { username: "employee07", password: SHARED_PASSWORD, name: "Gita Maharani", role: "Social Media Lead", team: "Content", isAdmin: false },
  { username: "employee08", password: SHARED_PASSWORD, name: "Hafiz Nugroho", role: "Frontend Developer", team: "Digital", isAdmin: false },
  { username: "employee09", password: SHARED_PASSWORD, name: "Intan Permata", role: "Account Executive", team: "Client Services", isAdmin: false },
  { username: "employee10", password: SHARED_PASSWORD, name: "Jovan Kurniawan", role: "SEO Analyst", team: "Growth", isAdmin: false },
];

const seedProjects = [
  {
    id: "project-1",
    title: "SMM (IG) Dang! Cookies",
    brief: "9 feed, 15 story, 3 reels",
    priority: "Low",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    manager: "Eka Wulandari",
    status: "On Track",
  },
  {
    id: "project-2",
    title: "SMM (IG) Orlenalycious",
    brief: "6 feed, 1 motion, 15 story, 2 reels",
    priority: "High",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    manager: "Eka Wulandari",
    status: "On Track",
  },
  {
    id: "project-3",
    title: "SMM (IG) Kurro Cheese Factory",
    brief: "6 feed, 1 motion, 15 story, 2 reels",
    priority: "Medium",
    startDate: "2026-04-05",
    endDate: "2026-04-26",
    manager: "Eka Wulandari",
    status: "On Track",
  },
  {
    id: "project-4",
    title: "Branding - DUGO",
    brief: "Brand guideline and visual system rollout",
    priority: "High",
    startDate: "2026-04-08",
    endDate: "2026-05-03",
    manager: "Alya Pratama",
    status: "At Risk",
  },
  {
    id: "project-5",
    title: "Internal Dashboard",
    brief: "Attendance and daily tracker system for RNC",
    priority: "Critical",
    startDate: "2026-04-10",
    endDate: "2026-04-28",
    manager: "Hafiz Nugroho",
    status: "On Track",
  },
];

const seedTaskBlueprints = {
  employee01: [
    { title: "Review monthly content direction", project: "SMM (IG) Dang! Cookies", deadlineOffset: 1, notes: "Need final campaign angle", status: "In Progress", nextStep: "Approve post sequence" },
    { title: "Brand guideline checklist", project: "Branding - DUGO", deadlineOffset: 4, notes: "Typeface and color references", status: "To-do", nextStep: "Collect missing assets" },
  ],
  employee02: [
    { title: "Design carousel asset set", project: "SMM (IG) Orlenalycious", deadlineOffset: 2, notes: "Folder: ORLENA CATALOG", status: "Completed", nextStep: "Move approved files to final folder" },
  ],
  employee03: [
    { title: "Write caption batch", project: "SMM (IG) Dang! Cookies", deadlineOffset: 2, notes: "Coordinate with social team", status: "In Progress", nextStep: "Align CTA options" },
  ],
  employee04: [
    { title: "Check ad pacing against content calendar", project: "SMM (IG) Kurro Cheese Factory", deadlineOffset: 3, notes: "Pull spend report", status: "To-do", nextStep: "Update paid support recommendation" },
  ],
  employee05: [
    { title: "Confirm client approval window", project: "SMM (IG) Orlenalycious", deadlineOffset: 1, notes: "Need release timing", status: "In Progress", nextStep: "Lock next approval milestone" },
  ],
  employee06: [
    { title: "Shoot teaser footage shortlist", project: "SMM (IG) Kurro Cheese Factory", deadlineOffset: 5, notes: "Raw clips in shared drive", status: "To-do", nextStep: "Mark hero scenes" },
  ],
  employee07: [
    { title: "Schedule post cadence", project: "SMM (IG) Dang! Cookies", deadlineOffset: 1, notes: "Cross-check with reel dates", status: "Completed", nextStep: "Monitor first-day engagement" },
  ],
  employee08: [
    { title: "Implement login isolation UI", project: "Internal Dashboard", deadlineOffset: 4, notes: "Mirror monday-style hierarchy", status: "In Progress", nextStep: "Polish admin table layout" },
  ],
  employee09: [
    { title: "Summarize stakeholder feedback", project: "Branding - DUGO", deadlineOffset: -1, notes: "One item waiting on confirmation", status: "Lost Track", nextStep: "Escalate blocked decision" },
  ],
  employee10: [
    { title: "Keyword map for landing copy", project: "Internal Dashboard", deadlineOffset: 3, notes: "Support search-friendly labels", status: "To-do", nextStep: "Share label recommendations" },
  ],
};

const state = loadState();
let currentUser = null;

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const liveClock = document.getElementById("liveClock");
const logoutButton = document.getElementById("logoutButton");
const recordDate = document.getElementById("recordDate");
const welcomeHeading = document.getElementById("welcomeHeading");
const roleLabel = document.getElementById("roleLabel");
const heroTitle = document.getElementById("heroTitle");
const heroStats = document.getElementById("heroStats");
const attendanceStatus = document.getElementById("attendanceStatus");
const todayAttendanceSummary = document.getElementById("todayAttendanceSummary");
const clockInButton = document.getElementById("clockInButton");
const clockOutButton = document.getElementById("clockOutButton");
const overtimePanel = document.getElementById("overtimePanel");
const summaryPanel = document.getElementById("summaryPanel");
const overtimeForm = document.getElementById("overtimeForm");
const overtimeMessage = document.getElementById("overtimeMessage");
const summaryForm = document.getElementById("summaryForm");
const summaryMessage = document.getElementById("summaryMessage");
const taskTableBody = document.getElementById("taskTableBody");
const projectTableBody = document.getElementById("projectTableBody");
const activityList = document.getElementById("activityList");
const monthSummaryGrid = document.getElementById("monthSummaryGrid");
const boardGrid = document.getElementById("boardGrid");
const boardTitle = document.getElementById("boardTitle");
const addTaskButton = document.getElementById("addTaskButton");
const adminPanel = document.getElementById("adminPanel");
const adminAttendanceBody = document.getElementById("adminAttendanceBody");
const adminTasksBody = document.getElementById("adminTasksBody");
const adminOvertimeGrid = document.getElementById("adminOvertimeGrid");
const adminPicBody = document.getElementById("adminPicBody");
const taskRowTemplate = document.getElementById("taskRowTemplate");
const dailySummary = document.getElementById("dailySummary");

initialize();

function initialize() {
  recordDate.value = todayKey();
  restoreSession();
  renderClock();
  setInterval(renderClock, 1000);

  loginForm.addEventListener("submit", handleLogin);
  logoutButton.addEventListener("click", handleLogout);
  recordDate.addEventListener("change", () => renderDashboard());
  clockInButton.addEventListener("click", () => updateAttendance("clockIn"));
  clockOutButton.addEventListener("click", () => updateAttendance("clockOut"));
  overtimeForm.addEventListener("submit", saveOvertime);
  summaryForm.addEventListener("submit", saveSummary);
  addTaskButton.addEventListener("click", addTask);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);

  const today = todayKey();
  const initial = {
    session: null,
    projects: seedProjects,
    users: Object.fromEntries(
      users
        .filter((user) => !user.isAdmin)
        .map((user) => [
          user.username,
          {
            activities: [
              {
                id: crypto.randomUUID(),
                text: "Workspace initialized from the monthly project tracker.",
                timestamp: new Date().toISOString(),
              },
            ],
            records: {
              [today]: {
                attendance: { clockIn: null, clockOut: null },
                overtime: null,
                summary: "",
                tasks: (seedTaskBlueprints[user.username] ?? []).map((task) => createTask(task, today)),
              },
            },
          },
        ]),
    ),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function createTask(task, baseDate) {
  return {
    id: crypto.randomUUID(),
    title: task.title,
    project: task.project,
    deadline: shiftDate(baseDate, task.deadlineOffset ?? 0),
    notes: task.notes ?? "",
    status: task.status ?? "To-do",
    nextStep: task.nextStep ?? "",
  };
}

function shiftDate(value, offset) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function activeDate() {
  return recordDate.value || todayKey();
}

function userState(username = currentUser.username) {
  return state.users[username];
}

function ensureRecord(username = currentUser.username, date = activeDate()) {
  const bucket = userState(username);
  bucket.records[date] ??= {
    attendance: { clockIn: null, clockOut: null },
    overtime: null,
    summary: "",
    tasks: [],
  };
  return bucket.records[date];
}

function restoreSession() {
  if (!state.session) return;
  const user = users.find((item) => item.username === state.session);
  if (!user) return;
  currentUser = user;
  enterDashboard();
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const user = users.find((item) => item.username === username && item.password === password);

  if (!user) {
    loginMessage.textContent = "Invalid username or password.";
    return;
  }

  currentUser = user;
  state.session = user.username;
  saveState();
  loginMessage.textContent = "";
  enterDashboard();
}

function handleLogout() {
  currentUser = null;
  state.session = null;
  saveState();
  loginScreen.classList.remove("hidden");
  dashboard.classList.add("hidden");
  loginForm.reset();
}

function enterDashboard() {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");
  renderDashboard();
}

function renderClock() {
  liveClock.textContent = new Date().toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function renderDashboard() {
  if (!currentUser) return;

  welcomeHeading.textContent = currentUser.name;
  roleLabel.textContent = currentUser.isAdmin ? "Admin workspace" : `${currentUser.team} team`;
  heroTitle.textContent = currentUser.isAdmin
    ? "Mirror the workbook logic: master projects, date-based task tracking, attendance, and overtime audit."
    : "Use one workspace for attendance, daily task updates, and project-linked reporting.";
  boardTitle.textContent = currentUser.isAdmin ? "Team task status board" : "My task status board";

  renderHeroStats();
  renderAttendance();
  renderTasks();
  renderProjects();
  renderSummary();
  renderActivity();
  renderMonthSummary();
  renderBoard();
  renderAdmin();
}

function renderHeroStats() {
  const date = activeDate();
  const employees = users.filter((user) => !user.isAdmin);
  const allTasks = employees.flatMap((user) => ensureRecord(user.username, date).tasks);
  const completedTasks = allTasks.filter((task) => task.status === "Completed").length;
  const totalTasks = allTasks.length;

  if (currentUser.isAdmin) {
    const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
    heroStats.innerHTML = `
      <div class="stat-card"><strong>${state.projects.length}</strong><span>Total project</span></div>
      <div class="stat-card"><strong>${totalTasks}</strong><span>Total task for ${monthLabel(date)}</span></div>
      <div class="stat-card"><strong>${completedTasks}</strong><span>Completed task</span></div>
      <div class="stat-card"><strong>${completionRate}%</strong><span>Completion rate</span></div>
    `;
    return;
  }

  const record = ensureRecord();
  const overdue = record.tasks.filter((task) => daysLeft(task.deadline) < 0 && task.status !== "Completed").length;
  const doneCount = record.tasks.filter((task) => task.status === "Completed").length;
  const attendance = record.attendance.clockIn ? (record.attendance.clockOut ? "Closed" : "Active") : "Pending";

  heroStats.innerHTML = `
    <div class="stat-card"><strong>${record.tasks.length}</strong><span>Task rows for ${monthLabel(date)}</span></div>
    <div class="stat-card"><strong>${doneCount}</strong><span>Completed task</span></div>
    <div class="stat-card"><strong>${overdue}</strong><span>Overdue item</span></div>
    <div class="stat-card"><strong>${attendance}</strong><span>Attendance status</span></div>
  `;
}

function renderAttendance() {
  const date = activeDate();

  if (currentUser.isAdmin) {
    attendanceStatus.textContent = "Admin view";
    todayAttendanceSummary.textContent = `Attendance for ${formatDate(date)} is available in the admin overview.`;
    clockInButton.disabled = true;
    clockOutButton.disabled = true;
    return;
  }

  const entry = ensureRecord().attendance;
  const status = entry.clockOut ? "Shift closed" : entry.clockIn ? "Working" : "Not started";
  attendanceStatus.textContent = status;
  todayAttendanceSummary.textContent = `Clock in: ${formatTime(entry.clockIn)} | Clock out: ${formatTime(entry.clockOut)}`;

  const isToday = date === todayKey();
  clockInButton.disabled = !isToday || Boolean(entry.clockIn);
  clockOutButton.disabled = !isToday || !entry.clockIn || Boolean(entry.clockOut);
}

function updateAttendance(type) {
  if (currentUser.isAdmin) return;
  if (activeDate() !== todayKey()) return;

  const attendance = ensureRecord().attendance;
  if (type === "clockIn" && attendance.clockIn) return;
  if (type === "clockOut" && (!attendance.clockIn || attendance.clockOut)) return;

  attendance[type] = new Date().toISOString();
  addActivity(currentUser.username, type === "clockIn" ? "Clocked in for the day." : "Clocked out and completed the shift.");
  saveState();
  renderDashboard();
}

function saveOvertime(event) {
  event.preventDefault();
  if (currentUser.isAdmin) return;

  const record = ensureRecord();
  const hours = Number(document.getElementById("overtimeHours").value);
  const note = document.getElementById("overtimeNote").value.trim();

  if (!record.attendance.clockOut) {
    overtimeMessage.textContent = "Clock out first, then submit the supporting reason for the extended hours.";
    return;
  }

  if (!hours || !note) {
    overtimeMessage.textContent = "Enter the number of overtime hours and explain what work required the extra time.";
    return;
  }

  record.overtime = {
    hours,
    note,
    submittedAt: new Date().toISOString(),
  };
  addActivity(currentUser.username, `Logged ${hours} overtime hour(s) with audit note.`);
  saveState();
  overtimeForm.reset();
  overtimeMessage.textContent = "Overtime entry saved.";
  renderDashboard();
}

function renderSummary() {
  if (currentUser.isAdmin) {
    summaryPanel.classList.add("hidden");
    return;
  }

  summaryPanel.classList.remove("hidden");
  dailySummary.value = ensureRecord().summary;
}

function saveSummary(event) {
  event.preventDefault();
  if (currentUser.isAdmin) return;

  ensureRecord().summary = dailySummary.value.trim();
  addActivity(currentUser.username, "Updated the daily summary.");
  saveState();
  summaryMessage.textContent = "Daily summary saved.";
  renderActivity();
  renderAdmin();
}

function renderTasks() {
  const tasksPanel = document.querySelector(".tasks-panel");

  if (currentUser.isAdmin) {
    tasksPanel.classList.add("hidden");
    overtimePanel.classList.add("hidden");
    addTaskButton.disabled = true;
    taskTableBody.innerHTML = "";
    return;
  }

  tasksPanel.classList.remove("hidden");
  overtimePanel.classList.remove("hidden");
  addTaskButton.disabled = false;
  taskTableBody.innerHTML = "";

  ensureRecord().tasks.forEach((task) => {
    const row = taskRowTemplate.content.firstElementChild.cloneNode(true);
    row.dataset.taskId = task.id;

    row.querySelectorAll("[data-field]").forEach((field) => {
      const key = field.dataset.field;
      if (key === "daysLeft") {
        field.value = daysLeftLabel(task.deadline, task.status);
        return;
      }
      field.value = task[key] ?? "";
      field.addEventListener("change", (event) => updateTask(task.id, key, event.target.value));
    });

    row.querySelector('[data-action="delete"]').addEventListener("click", () => deleteTask(task.id));
    taskTableBody.appendChild(row);
  });
}

function addTask() {
  if (currentUser.isAdmin) return;

  ensureRecord().tasks.unshift({
    id: crypto.randomUUID(),
    title: "New task",
    project: state.projects[0]?.title ?? "General operations",
    deadline: activeDate(),
    notes: "",
    status: "To-do",
    nextStep: "Define next action",
  });
  addActivity(currentUser.username, "Added a new row to the monthly task tracker.");
  saveState();
  renderDashboard();
}

function updateTask(taskId, key, value) {
  const task = ensureRecord().tasks.find((item) => item.id === taskId);
  if (!task) return;
  task[key] = value;
  addActivity(currentUser.username, `Updated task "${task.title}".`);
  saveState();
  renderDashboard();
}

function deleteTask(taskId) {
  const tasks = ensureRecord().tasks;
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) return;
  const [removed] = tasks.splice(index, 1);
  addActivity(currentUser.username, `Removed task "${removed.title}".`);
  saveState();
  renderDashboard();
}

function renderProjects() {
  const visibleProjects = currentUser.isAdmin
    ? state.projects
    : state.projects.filter((project) =>
        ensureRecord().tasks.some((task) => task.project === project.title),
      );

  projectTableBody.innerHTML = visibleProjects
    .map((project) => {
      const metrics = projectMetrics(project.title, activeDate(), currentUser.isAdmin ? null : currentUser.username);
      const health = projectHealth(project.title, activeDate(), currentUser.isAdmin ? null : currentUser.username);
      return `
        <tr>
          <td>${project.title}</td>
          <td>${project.brief}</td>
          <td>${project.priority}</td>
          <td>${shortDate(project.startDate)}</td>
          <td>${shortDate(project.endDate)}</td>
          <td>${project.manager}</td>
          <td>${metrics.completed} task completed / from total ${metrics.total}</td>
          <td>${health}</td>
        </tr>
      `;
    })
    .join("");
}

function projectMetrics(projectTitle, date, username = null) {
  const owners = username ? [username] : users.filter((user) => !user.isAdmin).map((user) => user.username);
  const tasks = owners.flatMap((owner) => ensureRecord(owner, date).tasks).filter((task) => task.project === projectTitle);
  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "Completed").length,
  };
}

function projectHealth(projectTitle, date, username = null) {
  const owners = username ? [username] : users.filter((user) => !user.isAdmin).map((user) => user.username);
  const tasks = owners.flatMap((owner) => ensureRecord(owner, date).tasks).filter((task) => task.project === projectTitle);
  if (!tasks.length) return "Planning";
  if (tasks.some((task) => task.status === "Lost Track")) return "Delayed";
  if (tasks.some((task) => task.status !== "Completed" && daysLeftFromDate(task.deadline, date) < 0)) return "Delayed";
  if (tasks.every((task) => task.status === "Completed")) return "Completed";
  return "On Track";
}

function addActivity(username, text) {
  const feed = userState(username).activities;
  feed.unshift({
    id: crypto.randomUUID(),
    text,
    timestamp: new Date().toISOString(),
  });
  if (feed.length > 12) feed.pop();
}

function renderActivity() {
  const items = currentUser.isAdmin
    ? users
        .filter((user) => !user.isAdmin)
        .flatMap((user) => userState(user.username).activities.map((item) => ({ ...item, owner: user.name })))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10)
    : userState().activities.slice(0, 10);

  activityList.innerHTML = items
    .map((item) => {
      const owner = currentUser.isAdmin ? `${item.owner} · ` : "";
      return `
        <article class="activity-item">
          <strong>${owner}${new Date(item.timestamp).toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}</strong>
          <p>${item.text}</p>
        </article>
      `;
    })
    .join("");
}

function renderMonthSummary() {
  const date = activeDate();
  const employees = currentUser.isAdmin
    ? users.filter((user) => !user.isAdmin)
    : [currentUser];
  const allTasks = employees.flatMap((user) => ensureRecord(user.username, date).tasks);
  const completed = allTasks.filter((task) => task.status === "Completed").length;
  const inProgress = allTasks.filter((task) => task.status === "In Progress").length;
  const todo = allTasks.filter((task) => task.status === "To-do").length;
  const lostTrack = allTasks.filter((task) => task.status === "Lost Track").length;
  const overdue = allTasks.filter((task) => task.status !== "Completed" && task.deadline && daysLeftFromDate(task.deadline, date) < 0).length;

  monthSummaryGrid.innerHTML = `
    <article class="overtime-card">
      <strong>${monthLabel(date)}</strong>
      <p class="card-copy">${allTasks.length} task rows captured for the selected period.</p>
    </article>
    <article class="overtime-card">
      <strong>Status split</strong>
      <p class="card-copy">Completed ${completed} · In Progress ${inProgress} · To-do ${todo} · Lost Track ${lostTrack}</p>
    </article>
    <article class="overtime-card">
      <strong>Deadline watch</strong>
      <p class="card-copy">${overdue} item(s) are overdue based on the selected record date.</p>
    </article>
  `;
}

function renderBoard() {
  const date = activeDate();
  const sourceTasks = currentUser.isAdmin
    ? users
        .filter((user) => !user.isAdmin)
        .flatMap((user) => ensureRecord(user.username, date).tasks.map((task) => ({ ...task, owner: user.name })))
    : ensureRecord().tasks.map((task) => ({ ...task, owner: currentUser.name }));

  const columns = ["To-do", "In Progress", "Completed", "Lost Track"];

  boardGrid.innerHTML = columns
    .map((column) => {
      const tasks = sourceTasks.filter((task) => task.status === column);
      return `
        <section class="board-column">
          <h4>${column}</h4>
          ${
            tasks.length
              ? tasks
                  .map(
                    (task) => `
                      <article class="board-task">
                        <strong>${task.title}</strong>
                        <p>${task.project}</p>
                        <div class="board-task-meta">
                          <span>${task.owner}</span>
                          <span>${daysLeftLabel(task.deadline, task.status)}</span>
                        </div>
                        <p>${task.nextStep}</p>
                      </article>
                    `,
                  )
                  .join("")
              : `<article class="board-task"><strong>No items</strong><p>Nothing in this stage for ${monthLabel(date)}.</p></article>`
          }
        </section>
      `;
    })
    .join("");
}

function renderAdmin() {
  const isAdmin = currentUser.isAdmin;
  const date = activeDate();
  adminPanel.classList.toggle("hidden", !isAdmin);

  if (!isAdmin) return;

  const employees = users.filter((user) => !user.isAdmin);

  adminAttendanceBody.innerHTML = employees
    .map((user) => {
      const record = ensureRecord(user.username, date);
      const attendance = record.attendance;
      const status = attendance.clockOut ? "Shift completed" : attendance.clockIn ? "Working" : "No attendance";
      return `
        <tr>
          <td>${user.name}</td>
          <td>${user.role}</td>
          <td>${formatTime(attendance.clockIn)}</td>
          <td>${formatTime(attendance.clockOut)}</td>
          <td>${status}</td>
        </tr>
      `;
    })
    .join("");

  adminTasksBody.innerHTML = employees
    .flatMap((user) =>
      ensureRecord(user.username, date).tasks.map(
        (task) => `
          <tr>
            <td>${user.name}</td>
            <td>${task.title}</td>
            <td>${task.project}</td>
            <td>${shortDate(task.deadline)}</td>
            <td>${daysLeftLabel(task.deadline, task.status)}</td>
            <td>${task.notes || "-"}</td>
            <td>${task.status}</td>
            <td>${task.nextStep || "-"}</td>
          </tr>
        `,
      ),
    )
    .join("");

  const overtimeMarkup = employees
    .filter((user) => ensureRecord(user.username, date).overtime)
    .map((user) => {
      const { overtime, summary } = ensureRecord(user.username, date);
      return `
        <article class="overtime-card">
          <strong>${user.name} · ${overtime.hours} hour(s)</strong>
          <p class="card-copy">${overtime.note}</p>
          <p class="card-copy">${summary || "No end-of-day summary submitted yet."}</p>
        </article>
      `;
    })
    .join("");

  adminOvertimeGrid.innerHTML =
    overtimeMarkup ||
    `<article class="overtime-card"><strong>No overtime submitted</strong><p class="card-copy">Extended hours with supporting notes will appear here.</p></article>`;

  adminPicBody.innerHTML = employees
    .map((user) => {
      const tasks = ensureRecord(user.username, date).tasks;
      const counts = {
        total: tasks.length,
        completed: tasks.filter((task) => task.status === "Completed").length,
        inProgress: tasks.filter((task) => task.status === "In Progress").length,
        todo: tasks.filter((task) => task.status === "To-do").length,
        lostTrack: tasks.filter((task) => task.status === "Lost Track").length,
      };
      return `
        <tr>
          <td>${user.name}</td>
          <td>${counts.total}</td>
          <td>${counts.completed}</td>
          <td>${counts.inProgress}</td>
          <td>${counts.todo}</td>
          <td>${counts.lostTrack}</td>
        </tr>
      `;
    })
    .join("");
}

function daysLeft(deadline) {
  return daysLeftFromDate(deadline, activeDate());
}

function daysLeftFromDate(deadline, date) {
  const oneDay = 1000 * 60 * 60 * 24;
  const deadlineDate = new Date(`${deadline}T00:00:00`);
  const selectedDate = new Date(`${date}T00:00:00`);
  return Math.round((deadlineDate - selectedDate) / oneDay);
}

function daysLeftLabel(deadline, status) {
  if (!deadline) return "-";
  if (status === "Completed") return "Completed";
  const diff = daysLeft(deadline);
  if (diff === 0) return "Due today";
  if (diff < 0) return `Overdue ${Math.abs(diff)}d`;
  return `${diff} day${diff > 1 ? "s" : ""} left`;
}

function formatTime(value) {
  if (!value) return "Not recorded";
  return new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function shortDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

function monthLabel(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
