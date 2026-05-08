# Portfolio + Project Dashboard

Personal portfolio website with an integrated project tracker dashboard. Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. Static export for easy hosting anywhere.

## Features

### Portfolio (`/`)
- **JSON-driven projects** — projects sync from a local SQLite database via `data/projects.json`
- **Status badges** — live status indicators (💡 idea / 🔨 in-progress / ✅ done / ♾️ perpetual)
- **Custom icons** — emoji icon per project, editable in the database
- **Click-to-expand modals** — full project notes, sub-items, and tags
- **Tag filtering** — click any tag to highlight matching projects
- **Website visibility toggle** — control which projects appear on the portfolio

### Dashboard (`/dashboard`)
- **Kanban board** — 4 columns: Ideas, In Progress, Done, Perpetual
- **Drag-and-drop** — move cards between columns to update status
- **Save / Reset** — persist changes to localStorage, or revert to server data
- **Detail modals** — click any card for full notes, sub-items, and tags
- **Website toggle** — control portfolio visibility per project
- **🚀 Deploy button** — one-click sync → build → commit → push → Vercel

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (static export) |
| UI | React 18, TypeScript, Tailwind CSS |
| Animation | Framer Motion |
| Icons | Emoji (custom per project) |
| Data | Static JSON (`data/projects.json`) |
| Backend (local) | Flask + SQLite (separate repo) |
| Hosting | Vercel (auto-deploy from GitHub) |

## Local Development

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Build static export
npm run build

# Serve locally
npm run serve
```

## Data Sync Workflow

Projects are managed in the separate `personal-db/` Flask app. The sync pipeline:

```bash
cd ../personal-db
source .venv/bin/activate
python sync_to_json.py   # exports SQLite → data/projects.json
cd ../Website
npm run build            # bakes JSON into static HTML
```

The dashboard also has a **🚀 Deploy** button that runs the full pipeline and pushes to GitHub, triggering Vercel auto-deploy.

## Project Structure

```
Website/
├── app/
│   ├── page.tsx           # Portfolio homepage
│   ├── dashboard/
│   │   └── page.tsx       # Kanban dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Tailwind + custom styles
├── data/
│   └── projects.json      # Synced from personal-db
├── next.config.ts         # Static export config
└── package.json
```

## Deployment

Vercel is configured to auto-deploy on every push to `main`. The site is a static export (`output: 'export'`), so no server runtime is needed.

```bash
# Manual deploy
npm run build
# Push to GitHub — Vercel handles the rest
```

## Environment

- **Node.js**: 20+
- **Next.js**: 16.2.4
- **Tailwind CSS**: 3.4.14
- **TypeScript**: 5.6.3
