# PharmFind
PharmFind is a full stack web app for searching medicines, checking pharmacy availability, saving favand placing orders for pickup or delivery. The repository includes a Vite + React + TypeScript fronteNode.js + Express backend API.
## Features
- User authentication (register/login with JWT)
- Medicine search and browsing
- Pharmacy listings and inventory
- Favorites
- Cart and checkout flow
- Orders (create and view order history)
- Address management
- Optional email verification (dev mode prints links to console)
## Tech stack
Frontend
- Vite, React, TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- TanStack React Query
Backend
- Node.js, Express
- JWT auth, bcrypt password hashing
- JSON file database by default
- Optional PostgreSQL support via DATABASE_URL
## Project structure
- `src/` frontend React app
- `server/` backend API server (monolith) and optional microservices
- `docker-compose.yml` local container stack
- `k8s/` Kubernetes manifests
- Docs: `QUICK_START.md`, `SETUP.md`, `DOCKER.md`, `BACKEND_INTEGRATION.md`, `DATABASE_SCHEMA.md`,
`EMAIL_VERIFICATION.md`, `MICROSERVICES_SETUP.md`
## Quick start (local)
Prerequisites
- Node.js 18+
1) Install dependencies
Frontend (project root):
```bash
npm install
```
Backend:
```bash
cd server
npm install
cd ..
```
2) Create a root `.env`
Create a `.env` file in the project root (same level as `package.json`):
```env
VITE_API_BASE_URL=http://localhost:3000/api
Page 1 of 3
VITE_API_TIMEOUT=30000
VITE_ENABLE_MOCK_DATA=false
```
Note: If you want to run the UI without the backend, set `VITE_ENABLE_MOCK_DATA=true`.
3) Start the backend
Terminal 1:
```bash
cd server
npm start
```
Backend runs at `http://localhost:3000`, API base path is `/api`.
4) Start the frontend
Terminal 2 (project root):
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`.
## Backend environment variables (optional)
Create `server/.env` to override defaults:
```env
PORT=3000
JWT_SECRET=change-this-in-production
FRONTEND_URL=http://localhost:5173
# Email verification
EMAIL_MODE=console # console or smtp
EMAIL_FROM=noreply@pharmfind.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
# PostgreSQL (optional)
# DATABASE_URL=postgres://user:password@localhost:5432/pharmfind
# DATABASE_SSL=false
```
## Docker
A ready to use `docker-compose.yml` is included.
```bash
docker compose up --build
```
More details: `DOCKER.md`.
## Optional: microservices mode
The backend can also be started as separate services:
```bash
cd server
npm run start:auth
npm run start:medicines
npm run start:pharmacies
npm run start:orders
npm run start:addresses
npm run start:favorites
```
More details: `MICROSERVICES_SETUP.md`.
## Docs
- `QUICK_START.md` quick setup
- `SETUP.md` detailed setup
- `server/README.md` backend API overview and endpoints
Page 2 of 3
- `BACKEND_INTEGRATION.md` integration notes
- `DATABASE_SCHEMA.md` data model
- `EMAIL_VERIFICATION.md` email verification
- `POSTGRES_SETUP_SIMPLE.md` and `QUICK_POSTGRES_SETUP.md` Postgres setup
