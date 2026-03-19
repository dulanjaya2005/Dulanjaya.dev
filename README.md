# Dulanjaya Thathsara — Developer Portfolio

A modern, full-stack developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, MySQL and Socket.io.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide Icons + React Icons |
| Animations | Framer Motion |
| Database | MySQL |
| ORM | Prisma |
| Auth | JWT (via httpOnly cookies) |
| Real-time | Socket.io |
| Charts | Recharts |
| Image Upload | Cloudinary |

---

## 📁 Folder Structure

```
/
├── app/
│   ├── (portfolio)/         # Public portfolio pages
│   │   ├── page.tsx         # Home
│   │   ├── about/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── education/
│   │   ├── blog/
│   │   └── contact/
│   ├── admin/               # Admin panel (hidden from nav)
│   │   ├── login/
│   │   └── (dashboard)/
│   │       ├── dashboard/
│   │       ├── projects/
│   │       ├── blog/
│   │       ├── messages/
│   │       └── users/
│   ├── api/                 # API Routes
│   │   ├── contact/
│   │   ├── github/
│   │   ├── visitors/
│   │   ├── upload/
│   │   └── admin/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── sections/            # Page section components
│   ├── admin/               # Admin-only components
│   ├── ui/                  # Reusable UI primitives
│   ├── providers/           # Context providers
│   └── utils/               # Utility components
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── cloudinary.ts
│   ├── socket.ts
│   └── utils.ts
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone <repo-url>
cd dulanjaya-portfolio
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="mysql://root:password@localhost:3306/dulanjaya_portfolio"
JWT_SECRET="your-super-secret-jwt-key"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
GITHUB_USERNAME="dulanjaya2005"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup

Create the MySQL database, then run migrations:

```sql
CREATE DATABASE dulanjaya_portfolio;
```

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

This seeds:
- **Admin user**: `admin@portfolio.com` / `Admin@1234`
- Sample projects
- Sample blog posts

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

---

## 🔐 Admin Access

| URL | Description |
|---|---|
| `/admin/login` | Admin login (hidden from portfolio nav) |
| `/admin/dashboard` | Stats, charts, recent messages |
| `/admin/projects` | Add/edit/delete projects |
| `/admin/blog` | Create/edit/publish blog posts |
| `/admin/messages` | View contact messages |
| `/admin/users` | Manage admin users |

Default credentials (change after first login):
- Email: `admin@portfolio.com`
- Password: `Admin@1234`

---

## 🌐 Portfolio Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, tech stack, featured projects, blog |
| `/about` | About — Summary, employment history |
| `/skills` | Skills — Animated skill cards with progress |
| `/projects` | Projects — Grid, search, GitHub auto-import |
| `/education` | Education — Timeline |
| `/blog` | Blog — List with categories, search |
| `/blog/[slug]` | Blog post |
| `/contact` | Contact form with real-time notification |

---

## 📡 Real-time Features

Socket.io is used for:
- **Contact form submissions** → admin receives instant notification
- **Notification bell** with badge counter and message preview
- Live admin panel updates

---

## 🖼️ Image Uploads

Images are uploaded to **Cloudinary** via `/api/upload`.

Set up a free account at [cloudinary.com](https://cloudinary.com) and add credentials to `.env`.

---

## 🚢 Deployment

### Vercel (recommended)

```bash
npm run build
vercel deploy
```

Add all environment variables in Vercel dashboard.

### Self-hosted

```bash
npm run build
npm run start
```

Use PM2 or similar for process management.

---

## 📊 Database Schema

Tables: `users`, `projects`, `blog_posts`, `messages`, `notifications`, `visitors`

See `prisma/schema.prisma` for full schema.

---

## 🎨 Design Features

- ✅ Dark / Light mode toggle
- ✅ Glassmorphism cards
- ✅ Animated gradient backgrounds
- ✅ Particle network animation
- ✅ Smooth page transitions (Framer Motion)
- ✅ Loading screen animation
- ✅ Cursor spotlight effect
- ✅ Marquee tech stack
- ✅ Responsive (mobile-first)

---

Built by Dulanjaya Thathsara · Next.js 14 · TypeScript
