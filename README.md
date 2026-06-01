# React Admin Dashboard

A modern **Admin Panel** built with React, TypeScript, and Tailwind CSS — designed as a portfolio piece for freelance and job applications.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## Live Demo

> Deploy to [Vercel](https://vercel.com) and add your link here.

## Demo Login

| Field    | Value            |
| -------- | ---------------- |
| Email    | `demo@admin.com` |
| Password | `admin123`       |

## Features

- **Authentication** — Protected routes with Zustand + persisted session
- **Dashboard** — KPI cards, revenue area chart, category bar chart, recent orders table
- **Users** — Search, pagination, delete confirmation modal
- **Products** — Grid layout with category filter and stock status badges
- **Orders** — Full order history table
- **Settings** — Profile form (React Hook Form + Zod), theme toggle, notification toggles
- **Dark mode** — Light/dark theme with persistence
- **Responsive** — Collapsible sidebar, mobile-friendly layout

## Tech Stack

| Tool | Purpose |
| ---- | ------- |
| [Vite](https://vitejs.dev) | Build tool |
| [React Router](https://reactrouter.com) | Client-side routing |
| [TanStack Query](https://tanstack.com/query) | Server state & mock API |
| [Zustand](https://zustand.docs.pmnd.rs) | Auth & theme state |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Form validation |
| [Recharts](https://recharts.org) | Charts |
| [Lucide React](https://lucide.dev) | Icons |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start dev server     |
| `npm run build` | Production build     |
| `npm run preview` | Preview production |

## Project Structure

```
src/
├── api/          # Mock API & data
├── components/   # UI, layout, charts
├── pages/        # Route pages
├── routes/       # Router & guards
├── store/        # Zustand stores
├── types/        # TypeScript types
└── lib/          # Utilities
```

## Author

**Amirhosain** — Frontend Developer · Tehran

- GitHub: [@a-pourhasan](https://github.com/a-pourhasan)

## License

MIT
