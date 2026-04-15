import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "rnc-workforce-dashboard-v4";
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
  { id: "project-1", title: "SMM (IG) Dang! Cookies", brief: "9 feed, 15 story, 3 reels", priority: "Low", startDate: "2026-04-01", endDate: "2026-04-30", manager: "Eka Wulandari" },
  { id: "project-2", title: "SMM (IG) Orlenalycious", brief: "6 feed, 1 motion, 15 story, 2 reels", priority: "High", startDate: "2026-04-01", endDate: "2026-04-30", manager: "Eka Wulandari" },
  { id: "project-3", title: "SMM (IG) Kurro Cheese Factory", brief: "6 feed, 1 motion, 15 story, 2 reels", priority: "Medium", startDate: "2026-04-05", endDate: "2026-04-26", manager: "Eka Wulandari" },
  { id: "project-4", title: "Branding - DUGO", brief: "Brand guideline and visual system rollout", priority: "High", startDate: "2026-04-08", endDate: "2026-05-03", manager: "Alya Pratama" },
  { id: "project-5", title: "Internal Dashboard", brief: "Attendance and daily tracker system for RNC", priority: "Critical", startDate: "2026-04-10", endDate: "2026-04-28", manager: "Hafiz Nugroho" },
];

const seedTaskBlueprints = {
  employee01: [
    { title: "Review monthly content direction", project: "SMM (IG) Dang! Cookies", deadlineOffset: 1, notes: "Need final campaign angle", status: "In Progress", nextStep: "Approve post sequence" },
    { title: "Brand guideline checklist", project: "Branding - DUGO", deadlineOffset: 4, notes: "Typeface and color references", status: "To-do", nextStep: "Collect missing assets" },
  ],
  employee02: [{ title: "Design carousel asset set", project: "SMM (IG) Orlenalycious", deadlineOffset: 2, notes: "Folder: ORLENA CATALOG", status: "Completed", nextStep: "Move approved files to final folder" }],
  employee03: [{ title: "Write caption batch", project: "SMM (IG) Dang! Cookies", deadlineOffset: 2, notes: "Coordinate with social team", status: "In Progress", nextStep: "Align CTA options" }],
  employee04: [{ title: "Check ad pacing against content calendar", project: "SMM (IG) Kurro Cheese Factory", deadlineOffset: 3, notes: "Pull spend report", status: "To-do", nextStep: "Update paid support recommendation" }],
  employee05: [{ title: "Confirm client approval window", project: "SMM (IG) Orlenalycious", deadlineOffset: 1, notes: "Need release timing", status: "In Progress", nextStep: "Lock next approval milestone" }],
  employee06: [{ title: "Shoot teaser footage shortlist", project: "SMM (IG) Kurro Cheese Factory", deadlineOffset: 5, notes: "Raw clips in shared drive", status: "To-do", nextStep: "Mark hero scenes" }],
  employee07: [{ title: "Schedule post cadence", project: "SMM (IG) Dang! Cookies", deadlineOffset: 1, notes: "Cross-check with reel dates", status: "Completed", nextStep: "Monitor first-day engagement" }],
  employee08: [{ title: "Implement login isolation UI", project: "Internal Dashboard", deadlineOffset: 4, notes: "Mirror monday-style hierarchy", status: "In Progress", nextStep: "Polish admin table layout" }],
  employee09: [{ title: "Summarize stakeholder feedback", project: "Branding - DUGO", deadlineOffset: -1, notes: "One item waiting on confirmation", status: "Lost Track", nextStep: "Escalate blocked decision" }],
  employee10: [{ title: "Keyword map for landing copy", project: "Internal Dashboard", deadlineOffset: 3, notes: "Support search-friendly labels", status: "To-do", nextStep: "Share label recommendations" }],
};

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function shiftDate(value, offset) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
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

function createInitialState() {
  const today = todayKey();
  return {
    session: null,
    projects: seedProjects,
    users: Object.fromEntries(
      users.filter((user) => !user.isAdmin).map((user) => [
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
}

function daysLeftFromDate(deadline, date) {
  if (!deadline) return null;
  const oneDay = 1000 * 60 * 60 * 24;
  const deadlineDate = new Date(`${deadline}T00:00:00`);
  const selectedDate = new Date(`${date}T00:00:00`);
  return Math.round((deadlineDate - selectedDate) / oneDay);
}

function daysLeftLabel(deadline, status, date) {
  if (!deadline) return "-";
  if (status === "Completed") return "Completed";
  const diff = daysLeftFromDate(deadline, date);
  if (diff === 0) return "Due today";
  if (diff < 0) return `Overdue ${Math.abs(diff)}d`;
  return `${diff} day${diff > 1 ? "s" : ""} left`;
}

function formatTime(value) {
  if (!value) return "Not recorded";
  return new Date(value).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function shortDate(value) {
  if (!value) return "-";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function monthLabel(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function App() {
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : createInitialState();
  });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const [overtimeMessage, setOvertimeMessage] = useState("");
  const [summaryMessage, setSummaryMessage] = useState("");
  const [recordDate, setRecordDate] = useState(todayKey());
  const [liveClock, setLiveClock] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    const tick = () =>
      setLiveClock(
        new Date().toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const currentUser = users.find((user) => user.username === appState.session) ?? null;
  const employees = users.filter((user) => !user.isAdmin);

  function userState(username = currentUser?.username) {
    return username ? appState.users[username] : null;
  }

  function ensureRecord(username, date) {
    const safeDate = date ?? recordDate;
    const bucket = userState(username);
    if (!bucket.records[safeDate]) {
      bucket.records[safeDate] = {
        attendance: { clockIn: null, clockOut: null },
        overtime: null,
        summary: "",
        tasks: [],
      };
    }
    return bucket.records[safeDate];
  }

  function updateState(mutator) {
    setAppState((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  }

  function recordFor(username = currentUser?.username, date = recordDate) {
    const bucket = appState.users[username];
    return (
      bucket?.records[date] ?? {
        attendance: { clockIn: null, clockOut: null },
        overtime: null,
        summary: "",
        tasks: [],
      }
    );
  }

  function addActivity(username, text) {
    updateState((draft) => {
      const feed = draft.users[username].activities;
      feed.unshift({ id: crypto.randomUUID(), text, timestamp: new Date().toISOString() });
      if (feed.length > 12) feed.pop();
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    const user = users.find(
      (item) => item.username === loginForm.username.trim() && item.password === loginForm.password,
    );
    if (!user) {
      setLoginMessage("Invalid username or password.");
      return;
    }
    setLoginMessage("");
    updateState((draft) => {
      draft.session = user.username;
    });
  }

  function logout() {
    updateState((draft) => {
      draft.session = null;
    });
    setLoginForm({ username: "", password: "" });
  }

  function withRecord(username, callback) {
    updateState((draft) => {
      const bucket = draft.users[username];
      bucket.records[recordDate] ??= {
        attendance: { clockIn: null, clockOut: null },
        overtime: null,
        summary: "",
        tasks: [],
      };
      callback(bucket.records[recordDate], draft);
    });
  }

  function handleAttendance(type) {
    if (!currentUser || currentUser.isAdmin || recordDate !== todayKey()) return;
    withRecord(currentUser.username, (record) => {
      if (type === "clockIn" && record.attendance.clockIn) return;
      if (type === "clockOut" && (!record.attendance.clockIn || record.attendance.clockOut)) return;
      record.attendance[type] = new Date().toISOString();
      const feed = appState.users[currentUser.username].activities;
      void feed;
    });
    addActivity(
      currentUser.username,
      type === "clockIn" ? "Clocked in for the day." : "Clocked out and completed the shift.",
    );
  }

  function saveOvertime(event) {
    event.preventDefault();
    if (!currentUser || currentUser.isAdmin) return;
    const form = new FormData(event.currentTarget);
    const hours = Number(form.get("hours"));
    const note = String(form.get("note") ?? "").trim();
    const record = recordFor();
    if (!record.attendance.clockOut) {
      setOvertimeMessage("Clock out first, then submit the supporting reason for the extended hours.");
      return;
    }
    if (!hours || !note) {
      setOvertimeMessage("Enter the number of overtime hours and explain what work required the extra time.");
      return;
    }
    withRecord(currentUser.username, (draftRecord) => {
      draftRecord.overtime = { hours, note, submittedAt: new Date().toISOString() };
    });
    addActivity(currentUser.username, `Logged ${hours} overtime hour(s) with audit note.`);
    setOvertimeMessage("Overtime entry saved.");
    event.currentTarget.reset();
  }

  function saveSummary(event) {
    event.preventDefault();
    if (!currentUser || currentUser.isAdmin) return;
    const form = new FormData(event.currentTarget);
    const value = String(form.get("summary") ?? "").trim();
    withRecord(currentUser.username, (draftRecord) => {
      draftRecord.summary = value;
    });
    addActivity(currentUser.username, "Updated the daily summary.");
    setSummaryMessage("Daily summary saved.");
  }

  function addTask() {
    if (!currentUser || currentUser.isAdmin) return;
    withRecord(currentUser.username, (draftRecord) => {
      draftRecord.tasks.unshift({
        id: crypto.randomUUID(),
        title: "New task",
        project: appState.projects[0]?.title ?? "General operations",
        deadline: recordDate,
        notes: "",
        status: "To-do",
        nextStep: "Define next action",
      });
    });
    addActivity(currentUser.username, "Added a new row to the monthly task tracker.");
  }

  function updateTask(taskId, key, value) {
    if (!currentUser || currentUser.isAdmin) return;
    withRecord(currentUser.username, (draftRecord) => {
      const task = draftRecord.tasks.find((item) => item.id === taskId);
      if (task) task[key] = value;
    });
    addActivity(currentUser.username, "Updated a task row.");
  }

  function deleteTask(taskId) {
    if (!currentUser || currentUser.isAdmin) return;
    withRecord(currentUser.username, (draftRecord) => {
      draftRecord.tasks = draftRecord.tasks.filter((task) => task.id !== taskId);
    });
    addActivity(currentUser.username, "Removed a task row.");
  }

  const currentRecord = currentUser && !currentUser.isAdmin ? recordFor(currentUser.username, recordDate) : null;
  const allTasksForDate = useMemo(
    () => employees.flatMap((user) => recordFor(user.username, recordDate).tasks),
    [appState, recordDate],
  );

  function projectMetrics(projectTitle, username = null) {
    const owners = username ? [username] : employees.map((user) => user.username);
    const tasks = owners.flatMap((owner) => recordFor(owner, recordDate).tasks).filter((task) => task.project === projectTitle);
    return {
      total: tasks.length,
      completed: tasks.filter((task) => task.status === "Completed").length,
    };
  }

  function projectHealth(projectTitle, username = null) {
    const owners = username ? [username] : employees.map((user) => user.username);
    const tasks = owners.flatMap((owner) => recordFor(owner, recordDate).tasks).filter((task) => task.project === projectTitle);
    if (!tasks.length) return "Planning";
    if (tasks.some((task) => task.status === "Lost Track")) return "Delayed";
    if (tasks.some((task) => task.status !== "Completed" && daysLeftFromDate(task.deadline, recordDate) < 0)) return "Delayed";
    if (tasks.every((task) => task.status === "Completed")) return "Completed";
    return "On Track";
  }

  const boardColumns = ["To-do", "In Progress", "Completed", "Lost Track"];
  const boardTasks = currentUser?.isAdmin
    ? employees.flatMap((user) =>
        recordFor(user.username, recordDate).tasks.map((task) => ({ ...task, owner: user.name })),
      )
    : (currentRecord?.tasks ?? []).map((task) => ({ ...task, owner: currentUser?.name ?? "" }));

  const activityItems = currentUser?.isAdmin
    ? employees
        .flatMap((user) =>
          appState.users[user.username].activities.map((item) => ({ ...item, owner: user.name })),
        )
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10)
    : currentUser
      ? appState.users[currentUser.username].activities.slice(0, 10)
      : [];

  if (!currentUser) {
    return (
      <div className="app-shell">
        <section className="login-screen">
          <div className="login-hero">
            <div>
              <p className="eyebrow">RNC daily operations</p>
              <h1>Attendance, activity, and team tracking in one dashboard.</h1>
              <p className="lede">
                Vercel-ready React version with 10 employee logins, 1 admin, workbook-style task logic,
                and monday-inspired project visibility.
              </p>
            </div>
            <div className="demo-card">
              <p className="demo-title">Demo access</p>
              <p><strong>Admin:</strong> <code>admin</code> / <code>RNC2026!</code></p>
              <p><strong>Employees:</strong> <code>employee01</code> to <code>employee10</code> / <code>RNC2026!</code></p>
            </div>
          </div>

          <form className="login-panel" onSubmit={handleLogin}>
            <div>
              <p className="eyebrow">Sign in</p>
              <h2>Open your workspace</h2>
              <p className="panel-copy">
                Employees only see their own saved data. Admin can review attendance, tasks, overtime,
                and project summaries across the team.
              </p>
            </div>

            <label className="field">
              <span>Username</span>
              <input
                value={loginForm.username}
                onChange={(event) => setLoginForm((prev) => ({ ...prev, username: event.target.value }))}
                placeholder="employee01"
                required
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                placeholder="Enter your password"
                required
              />
            </label>

            <button type="submit" className="btn btn-primary btn-block">Sign in</button>
            <p className="form-message">{loginMessage}</p>
          </form>
        </section>
      </div>
    );
  }

  const visibleProjects = currentUser.isAdmin
    ? appState.projects
    : appState.projects.filter((project) => currentRecord.tasks.some((task) => task.project === project.title));

  const totalTasks = currentUser.isAdmin ? allTasksForDate.length : currentRecord.tasks.length;
  const completedTasks = currentUser.isAdmin
    ? allTasksForDate.filter((task) => task.status === "Completed").length
    : currentRecord.tasks.filter((task) => task.status === "Completed").length;
  const overdueTasks = currentUser.isAdmin
    ? allTasksForDate.filter((task) => task.status !== "Completed" && task.deadline && daysLeftFromDate(task.deadline, recordDate) < 0).length
    : currentRecord.tasks.filter((task) => task.status !== "Completed" && task.deadline && daysLeftFromDate(task.deadline, recordDate) < 0).length;
  const attendanceState = currentUser.isAdmin
    ? `${employees.filter((user) => recordFor(user.username, recordDate).attendance.clockIn).length}/10`
    : currentRecord.attendance.clockIn
      ? currentRecord.attendance.clockOut ? "Closed" : "Active"
      : "Pending";

  return (
    <div className="app-shell">
      <section className="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">{currentUser.isAdmin ? "Admin workspace" : `${currentUser.team} team`}</p>
            <h1>{currentUser.name}</h1>
          </div>
          <div className="topbar-actions">
            <label className="date-filter">
              <span>Record date</span>
              <input type="date" value={recordDate} onChange={(event) => setRecordDate(event.target.value)} />
            </label>
            <div className="live-clock">{liveClock}</div>
            <button className="btn btn-ghost" onClick={logout}>Log out</button>
          </div>
        </header>

        <main className="dashboard-grid">
          <section className="hero-panel">
            <div>
              <p className="eyebrow">Today at a glance</p>
              <h2>
                {currentUser.isAdmin
                  ? "Mirror the workbook logic: projects, task rollups, attendance, and audit-ready daily tracking."
                  : "Use one workspace for attendance, daily task updates, and project-linked reporting."}
              </h2>
            </div>
            <div className="hero-stats">
              <div className="stat-card"><strong>{currentUser.isAdmin ? appState.projects.length : totalTasks}</strong><span>{currentUser.isAdmin ? "Total project" : `Task rows for ${monthLabel(recordDate)}`}</span></div>
              <div className="stat-card"><strong>{totalTasks}</strong><span>{currentUser.isAdmin ? `Total task for ${monthLabel(recordDate)}` : "Tracked task"}</span></div>
              <div className="stat-card"><strong>{completedTasks}</strong><span>Completed task</span></div>
              <div className="stat-card"><strong>{currentUser.isAdmin ? `${Math.round(totalTasks ? (completedTasks / totalTasks) * 100 : 0)}%` : overdueTasks}</strong><span>{currentUser.isAdmin ? "Completion rate" : "Overdue item"}</span></div>
              {!currentUser.isAdmin && <div className="stat-card"><strong>{attendanceState}</strong><span>Attendance status</span></div>}
            </div>
          </section>

          <section className="panel attendance-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Attendance</p>
                <h3>Clock in and clock out</h3>
              </div>
              <span className="status-pill">
                {currentUser.isAdmin ? "Admin view" : currentRecord.attendance.clockOut ? "Shift closed" : currentRecord.attendance.clockIn ? "Working" : "Not started"}
              </span>
            </div>
            <div className="attendance-time">
              {currentUser.isAdmin
                ? `Attendance for ${formatDate(recordDate)} is available in the admin overview.`
                : `Clock in: ${formatTime(currentRecord.attendance.clockIn)} | Clock out: ${formatTime(currentRecord.attendance.clockOut)}`}
            </div>
            <div className="button-row">
              <button className="btn btn-primary" disabled={currentUser.isAdmin || recordDate !== todayKey() || Boolean(currentRecord.attendance.clockIn)} onClick={() => handleAttendance("clockIn")}>Clock in</button>
              <button className="btn btn-secondary" disabled={currentUser.isAdmin || recordDate !== todayKey() || !currentRecord.attendance.clockIn || Boolean(currentRecord.attendance.clockOut)} onClick={() => handleAttendance("clockOut")}>Clock out</button>
            </div>
          </section>

          {!currentUser.isAdmin && (
            <>
              <section className="panel overtime-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Extended hours</p>
                    <h3>Record overtime clearly</h3>
                  </div>
                </div>
                <form className="stack" onSubmit={saveOvertime}>
                  <label className="field">
                    <span>Hours</span>
                    <input name="hours" type="number" min="1" max="12" step="1" placeholder="2" />
                  </label>
                  <label className="field">
                    <span>Reason for extended hours</span>
                    <textarea name="note" rows="4" placeholder="Summarize the work completed, blocker handled, or deadline supported." />
                  </label>
                  <button type="submit" className="btn btn-primary">Save overtime note</button>
                  <p className="form-message">{overtimeMessage}</p>
                </form>
              </section>

              <section className="panel summary-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Daily summary</p>
                    <h3>Close the day with context</h3>
                  </div>
                </div>
                <form className="stack" onSubmit={saveSummary}>
                  <label className="field">
                    <span>Today’s outcome</span>
                    <textarea name="summary" defaultValue={currentRecord.summary} rows="4" placeholder="Summarize key output, pending items, and any blockers that need follow-up." />
                  </label>
                  <button type="submit" className="btn btn-primary">Save summary</button>
                  <p className="form-message">{summaryMessage}</p>
                </form>
              </section>
            </>
          )}

          <section className="panel tasks-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Daily tracker</p>
                <h3>Monthly task tracker logic</h3>
              </div>
              {!currentUser.isAdmin && <button className="btn btn-ghost" onClick={addTask}>Add task</button>}
            </div>
            {!currentUser.isAdmin && (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Task detail</th>
                      <th>Project</th>
                      <th>Deadline</th>
                      <th>Days left</th>
                      <th>Notes / files</th>
                      <th>Status</th>
                      <th>Next step</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecord.tasks.map((task) => (
                      <tr key={task.id}>
                        <td><input value={task.title} onChange={(event) => updateTask(task.id, "title", event.target.value)} /></td>
                        <td><input value={task.project} onChange={(event) => updateTask(task.id, "project", event.target.value)} /></td>
                        <td><input type="date" value={task.deadline ?? ""} onChange={(event) => updateTask(task.id, "deadline", event.target.value)} /></td>
                        <td><input value={daysLeftLabel(task.deadline, task.status, recordDate)} disabled readOnly /></td>
                        <td><input value={task.notes ?? ""} onChange={(event) => updateTask(task.id, "notes", event.target.value)} /></td>
                        <td>
                          <select value={task.status} onChange={(event) => updateTask(task.id, "status", event.target.value)}>
                            <option>To-do</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Lost Track</option>
                          </select>
                        </td>
                        <td><input value={task.nextStep ?? ""} onChange={(event) => updateTask(task.id, "nextStep", event.target.value)} /></td>
                        <td><button className="icon-button" onClick={() => deleteTask(task.id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="panel projects-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Project register</p>
                <h3>Master project list</h3>
              </div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Project title</th>
                    <th>Brief / detail</th>
                    <th>Priority</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Project manager</th>
                    <th>Related task</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.map((project) => {
                    const metrics = projectMetrics(project.title, currentUser.isAdmin ? null : currentUser.username);
                    return (
                      <tr key={project.id}>
                        <td>{project.title}</td>
                        <td>{project.brief}</td>
                        <td>{project.priority}</td>
                        <td>{shortDate(project.startDate)}</td>
                        <td>{shortDate(project.endDate)}</td>
                        <td>{project.manager}</td>
                        <td>{metrics.completed} task completed / from total {metrics.total}</td>
                        <td>{projectHealth(project.title, currentUser.isAdmin ? null : currentUser.username)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel activity-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Activity log</p>
                <h3>Recent updates</h3>
              </div>
            </div>
            <div className="activity-list">
              {activityItems.map((item) => (
                <article className="activity-item" key={item.id}>
                  <strong>
                    {currentUser.isAdmin ? `${item.owner} · ` : ""}
                    {new Date(item.timestamp).toLocaleString("en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </strong>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel month-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Workbook summary</p>
                <h3>Monthly performance snapshot</h3>
              </div>
            </div>
            <div className="cards-grid">
              <article className="overtime-card">
                <strong>{monthLabel(recordDate)}</strong>
                <p className="card-copy">{totalTasks} task rows captured for the selected period.</p>
              </article>
              <article className="overtime-card">
                <strong>Status split</strong>
                <p className="card-copy">
                  Completed {currentUser.isAdmin ? allTasksForDate.filter((task) => task.status === "Completed").length : currentRecord.tasks.filter((task) => task.status === "Completed").length}
                  {" · "}In Progress {currentUser.isAdmin ? allTasksForDate.filter((task) => task.status === "In Progress").length : currentRecord.tasks.filter((task) => task.status === "In Progress").length}
                  {" · "}To-do {currentUser.isAdmin ? allTasksForDate.filter((task) => task.status === "To-do").length : currentRecord.tasks.filter((task) => task.status === "To-do").length}
                  {" · "}Lost Track {currentUser.isAdmin ? allTasksForDate.filter((task) => task.status === "Lost Track").length : currentRecord.tasks.filter((task) => task.status === "Lost Track").length}
                </p>
              </article>
              <article className="overtime-card">
                <strong>Deadline watch</strong>
                <p className="card-copy">{overdueTasks} item(s) are overdue based on the selected record date.</p>
              </article>
            </div>
          </section>

          <section className="panel board-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Project section</p>
                <h3>{currentUser.isAdmin ? "Team task status board" : "My task status board"}</h3>
              </div>
            </div>
            <div className="board-grid">
              {boardColumns.map((column) => (
                <section className="board-column" key={column}>
                  <h4>{column}</h4>
                  {boardTasks.filter((task) => task.status === column).length ? (
                    boardTasks
                      .filter((task) => task.status === column)
                      .map((task) => (
                        <article className="board-task" key={task.id}>
                          <strong>{task.title}</strong>
                          <p>{task.project}</p>
                          <div className="board-task-meta">
                            <span>{task.owner}</span>
                            <span>{daysLeftLabel(task.deadline, task.status, recordDate)}</span>
                          </div>
                          <p>{task.nextStep}</p>
                        </article>
                      ))
                  ) : (
                    <article className="board-task">
                      <strong>No items</strong>
                      <p>Nothing in this stage for {monthLabel(recordDate)}.</p>
                    </article>
                  )}
                </section>
              ))}
            </div>
          </section>

          {currentUser.isAdmin && (
            <section className="panel admin-panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Admin control</p>
                  <h3>Team overview</h3>
                </div>
              </div>

              <div className="admin-block">
                <h4>Attendance summary</h4>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Role</th>
                        <th>Clock in</th>
                        <th>Clock out</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((user) => {
                        const record = recordFor(user.username, recordDate);
                        const status = record.attendance.clockOut ? "Shift completed" : record.attendance.clockIn ? "Working" : "No attendance";
                        return (
                          <tr key={user.username}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{formatTime(record.attendance.clockIn)}</td>
                            <td>{formatTime(record.attendance.clockOut)}</td>
                            <td>{status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="admin-block">
                <h4>Team task board</h4>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Task detail</th>
                        <th>Project</th>
                        <th>Deadline</th>
                        <th>Days left</th>
                        <th>Notes / files</th>
                        <th>Status</th>
                        <th>Next step</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.flatMap((user) =>
                        recordFor(user.username, recordDate).tasks.map((task) => (
                          <tr key={`${user.username}-${task.id}`}>
                            <td>{user.name}</td>
                            <td>{task.title}</td>
                            <td>{task.project}</td>
                            <td>{shortDate(task.deadline)}</td>
                            <td>{daysLeftLabel(task.deadline, task.status, recordDate)}</td>
                            <td>{task.notes || "-"}</td>
                            <td>{task.status}</td>
                            <td>{task.nextStep || "-"}</td>
                          </tr>
                        )),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="admin-block">
                <h4>Overtime submissions</h4>
                <div className="cards-grid">
                  {employees.filter((user) => recordFor(user.username, recordDate).overtime).length ? (
                    employees.filter((user) => recordFor(user.username, recordDate).overtime).map((user) => {
                      const record = recordFor(user.username, recordDate);
                      return (
                        <article className="overtime-card" key={user.username}>
                          <strong>{user.name} · {record.overtime.hours} hour(s)</strong>
                          <p className="card-copy">{record.overtime.note}</p>
                          <p className="card-copy">{record.summary || "No end-of-day summary submitted yet."}</p>
                        </article>
                      );
                    })
                  ) : (
                    <article className="overtime-card">
                      <strong>No overtime submitted</strong>
                      <p className="card-copy">Extended hours with supporting notes will appear here.</p>
                    </article>
                  )}
                </div>
              </div>

              <div className="admin-block">
                <h4>PIC workload summary</h4>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Total task</th>
                        <th>Completed</th>
                        <th>In Progress</th>
                        <th>To-do</th>
                        <th>Lost Track</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((user) => {
                        const tasks = recordFor(user.username, recordDate).tasks;
                        return (
                          <tr key={user.username}>
                            <td>{user.name}</td>
                            <td>{tasks.length}</td>
                            <td>{tasks.filter((task) => task.status === "Completed").length}</td>
                            <td>{tasks.filter((task) => task.status === "In Progress").length}</td>
                            <td>{tasks.filter((task) => task.status === "To-do").length}</td>
                            <td>{tasks.filter((task) => task.status === "Lost Track").length}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </main>
      </section>
    </div>
  );
}
