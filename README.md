# 🎓 College Application Organizer

A modern, mobile-friendly web app built with **React + Vite** that helps students track every aspect of their college applications — all stored locally in the browser with no account needed.

## Features

- **Dashboard** — overview of all schools with application status, upcoming deadlines, and an overall progress bar
- **Status tracking** — six statuses: Not Started, In Progress, Submitted, Accepted, Rejected, Waitlisted
- **Deadline tracking** — per-school deadlines with color-coded urgency chips (overdue, due today, due soon, on track)
- **Checklist** — four material categories per school (Essays, Transcripts, Recommendations, Test Scores) with per-school completion progress
- **Essay Tracker** — add multiple prompts per school, paste drafts, and track word count against the word limit with a live progress bar
- **Notes** — freeform notes section per school
- **Search & Filter** — search schools by name, filter by status, sort by name / deadline / status
- **localStorage persistence** — all data is saved automatically between sessions
- **Responsive design** — works on desktop, tablet, and mobile

## Getting Started

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

## Tech Stack

- [React 19](https://react.dev/) (with hooks)
- [Vite 8](https://vite.dev/) (build tool & dev server)
- Plain CSS (no UI library dependency)
- `localStorage` for data persistence
