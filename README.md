# RNC Workforce Dashboard

Vercel-ready React app for an attendance and employee activity dashboard with:

- `10` employee logins and `1` admin login
- per-user saved inputs using `localStorage`
- clock in / clock out attendance flow
- overtime notes with clearer business-friendly copy
- daily task tracking and a monday-style board section
- admin visibility across attendance, tasks, overtime, and project rollups
- workbook-inspired project register and monthly task tracker logic based on `Project Management 2025 - RNC.xlsx`

## Demo credentials

- Admin: `admin` / `RNC2026!`
- Employees: `employee01` to `employee10` / `RNC2026!`

## Run

1. Install dependencies: `npm install`
2. Start locally: `npm run dev`
3. Build for Vercel: `npm run build`

Main React entry files:

- [src/App.jsx](/Users/edwin/Documents/New project/src/App.jsx)
- [src/main.jsx](/Users/edwin/Documents/New project/src/main.jsx)

## Implemented workbook logic

- `Project` sheet:
  master project register with title, brief, priority, date range, manager, and task rollup
- `Dashboard` sheet:
  total projects, total tasks, completed tasks, completion rate, and monthly workload summary
- monthly tracker sheets:
  task detail, project link, deadline, days left, notes/files, status, and next step
- admin workload:
  per-employee task counts by status for the selected month, similar to the workbook PIC summary
- project health:
  derived from task completion, overdue deadlines, and lost-track items rather than fixed labels
- operational add-on:
  attendance, overtime, and end-of-day summary layered into the same workflow

## Important limitation

This is a frontend prototype. The login and access restrictions are enforced in the app flow and browser storage, not through a secure backend. For production use, the next step is to move authentication, authorization, and data storage to a server/database layer.
