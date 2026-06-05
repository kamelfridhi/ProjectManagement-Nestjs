# TeamSphere API — REST & WebSocket backend for project management

> Backend for TeamSphere, used by admins, project managers, and employees to manage projects, sprints, tasks, and tickets.

---

## What I built

A modular NestJS API with JWT cookie auth, role-based access, and two Socket.io gateways — one for live admin user approval, one for team chat. MongoDB/Mongoose schemas cover users, teams, projects, sprints, tasks, statuses, tickets, and notifications. Emails are rendered with Pug and sent via Nodemailer.

---

## Tech stack

**Backend:** NestJS 10, TypeScript, Passport, JWT, class-validator
**Database:** MongoDB, Mongoose 8
**Real-time:** Socket.io (@nestjs/websockets)
**Other:** bcrypt, Multer, Nodemailer, Pug
**DevOps:** Docker, Docker Compose

---

## Key features

- JWT auth with HTTP-only cookies and bcrypt — tokens never exposed to client-side JavaScript
- Role-based access (admin, projectManager, employee, client) with approve/decline/block workflows
- Sprint-based tasks with configurable status columns and team member assignment
- Real-time user verification — admin actions emit `Accepted` / `userdeclined` to the user's socket
- Team chat, invitation notifications, and ticket support with Multer file uploads

---

## How to run it locally

```bash
git clone <repo-url>
cd ProjectManagement-Nestjs
npm install
docker compose up db -d

# Seed roles before signup
docker exec db mongo projectmanagement --eval "db.roles.insertMany([{role:'user'},{role:'admin'},{role:'employee'},{role:'development'},{role:'projectManager'},{role:'client'}])"

npm run start        # http://localhost:3000
npm run twicedegro   # watch mode
```

Set `MONGODB_URI` to override `mongodb://127.0.0.1:27018/projectmanagement`. **Docker:** `docker compose up -d`

---

## Challenges

The hardest part was real-time account verification without polling. The gateway tracks each user's socket ID in memory and emits targeted events on admin accept/reject — so the frontend updates immediately. I paired that with JWT cookies and a separate chat gateway for team message broadcast.

---


