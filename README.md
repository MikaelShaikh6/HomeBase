# HomeBase

HomeBase is a full-stack household task management application designed to make it easy for roommates, families, or other household members to organize and track shared responsibilities.

Users can create or join a household, invite other members using a household invite code, create and assign tasks, track completion, and manage their account.

## Live Demo

**Live Application:** https://home-base-two-gilt.vercel.app/household/setup

**API:** https://homebase-api-cxe9.onrender.com/api/

> The live application may use a separate production database and environment configuration from the local development setup.

---

## Screenshots

### Home Dashboard

<!-- Replace with your screenshot -->

![Home Dashboard](./screenshots/home.png)

### Task Management

<!-- Replace with your screenshot -->

![Task Management](./screenshots/tasks.png)

### Add Task

<!-- Replace with your screenshot -->

![Add Task](./screenshots/add-task.png)

### Household Setup

<!-- Replace with your screenshot -->

![Household Setup](./screenshots/household-setup.png)

### Profile

<!-- Replace with your screenshot -->

![Profile](./screenshots/profile.png)

---

## Features

### Authentication

* User registration and login
* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Persistent login using a JWT stored on the client
* Logout functionality

### Household Management

* Create a household
* Join an existing household using an invite code
* View household information
* View household members
* Automatically associate users with their household

### Task Management

* Create tasks
* Assign tasks to household members
* View household tasks
* Mark tasks as complete or incomplete
* Delete tasks
* Display assigned household member
* Display task due time
* Recent task overview on the home dashboard

### Application

* Responsive React interface
* Loading and error states
* Protected frontend routes
* Persistent task data
* Production deployment
* Dockerized backend and database development environment

---

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express
* TypeScript
* PostgreSQL
* JWT
* bcrypt

### Development & Deployment

* Docker
* Docker Compose
* Git
* GitHub
* Render
* Vercel

---

## Architecture

HomeBase uses a separate frontend and backend architecture.

```text
                         ┌──────────────────┐
                         │   React Frontend │
                         │ TypeScript/Vite  │
                         └────────┬─────────┘
                                  │
                                  │ HTTP / REST API
                                  ▼
                         ┌──────────────────┐
                         │  Express Server  │
                         │    Node.js       │
                         └────────┬─────────┘
                                  │
                                  │ SQL
                                  ▼
                         ┌──────────────────┐
                         │   PostgreSQL     │
                         │    Database      │
                         └──────────────────┘
```

The frontend communicates with the Express REST API. The backend handles authentication, authorization, business logic, and database queries.

---

## Database Structure

The application uses three primary tables.

```text
users
  │
  │ belongs to
  ▼
households
  │
  │ contains
  ▼
tasks
```

### Users

Stores user accounts and household membership.

```text
id
email
password_hash
household_id
```

### Households

Stores household information and invite codes.

```text
id
name
invite_code
```

### Tasks

Stores household tasks and their assignments.

```text
id
household_id
assigned_to
title
time
completed
created_at
```

---

## Authentication Flow

HomeBase uses JWT-based authentication.

```text
Register
   │
   ▼
User account created
   │
   ▼
Login
   │
   ▼
JWT issued
   │
   ▼
JWT stored by frontend
   │
   ▼
JWT sent with protected API requests
   │
   ▼
Express authentication middleware
   │
   ▼
Request authorized
```

Passwords are never stored directly. They are hashed using bcrypt before being stored in PostgreSQL.

Protected API requests include the JWT using the `Authorization` header:

```text
Authorization: Bearer <token>
```

The backend verifies the token before allowing access to protected resources.

---

## Household Flow

A newly registered user does not initially belong to a household.

After logging in, the application checks the user's household membership.

### Create a Household

```text
Login
  ↓
No household
  ↓
Create Household
  ↓
Household created
  ↓
User assigned to household
  ↓
New JWT issued
  ↓
Home
```

### Join a Household

```text
Login
  ↓
No household
  ↓
Join Household
  ↓
Enter invite code
  ↓
User assigned to household
  ↓
New JWT issued
  ↓
Home
```

The invite code allows another user to join an existing household without exposing household data to users outside of it.

---

## API

The backend exposes a REST API under `/api`.

### Authentication

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | Create a user account      |
| POST   | `/api/auth/login`    | Authenticate a user        |
| GET    | `/api/auth/me`       | Get the authenticated user |

### Households

| Method | Endpoint               | Description                           |
| ------ | ---------------------- | ------------------------------------- |
| POST   | `/api/households`      | Create a household                    |
| POST   | `/api/households/join` | Join a household                      |
| GET    | `/api/households/me`   | Get the current household and members |

### Tasks

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/api/tasks`     | Get household tasks    |
| POST   | `/api/tasks`     | Create a task          |
| PATCH  | `/api/tasks/:id` | Update task completion |
| DELETE | `/api/tasks/:id` | Delete a task          |

All household and task endpoints require authentication.

Task queries are scoped to the authenticated user's household to prevent users from accessing tasks belonging to another household.

---

## Project Structure

```text
HomeBase/
│
├── server/
│   ├── src/
│   │   ├── db/
│   │   │   ├── index.ts
│   │   │   └── schema.sql
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── households.ts
│   │   │   └── tasks.ts
│   │   │
│   │   └── server.ts
│   │
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── src/
│   ├── api/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── households.ts
│   │   └── tasks.ts
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HouseholdCard.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── tasks/
│   │       ├── AddTaskModal.tsx
│   │       ├── RecentTasks.tsx
│   │       ├── TaskItem.tsx
│   │       └── TaskList.tsx
│   │
│   ├── navigation/
│   │   └── navItems.ts
│   │
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── HouseholdSetup.tsx
│   ├── Tasks.tsx
│   └── Profile.tsx
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Running Locally

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL
* Docker Desktop
* Git

### Clone the Repository

```bash
git clone https://github.com/MikaelShaikh6/HomeBase
cd HomeBase
```

---

## Backend Setup

Navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/homebase
JWT_SECRET=your-long-random-secret
```

Create the database:

```text
homebase
```

Then initialize the schema using:

```text
server/src/db/schema.sql
```

Start the backend:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:5000
```

You can verify the backend using:

```text
http://localhost:5000/api/health
```

---

## Frontend Setup

From the frontend directory:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local Vite development URL shown in the terminal.

---

## Docker Setup

HomeBase includes Docker configuration for the backend and PostgreSQL database.

The Docker Compose environment contains:

```text
┌──────────────────────┐
│   homebase-server    │
│   Node + Express     │
└──────────┬───────────┘
           │
           │
┌──────────▼───────────┐
│     homebase-db      │
│     PostgreSQL       │
└──────────────────────┘
```

### Start the Docker Environment

From the project root:

```bash
docker compose up --build
```

The backend will be available at:

```text
http://localhost:5000
```

### Stop the Environment

```bash
docker compose down
```

### Stop and Remove Database Data

```bash
docker compose down -v
```

> The `-v` option removes the PostgreSQL Docker volume and therefore deletes the database data stored by the Docker environment.

---

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

Environment files containing secrets are excluded from Git using `.gitignore`.

A `.env.example` file is provided to document the required variables without exposing secret values.

---

## Deployment

The application is deployed using separate frontend, backend, and database services.

```text
┌──────────────────────┐
│       Vercel         │
│   React Frontend     │
└──────────┬───────────┘
           │
           │ HTTPS
           ▼
┌──────────────────────┐
│       Render         │
│ Express + Node.js    │
└──────────┬───────────┘
           │
           │ PostgreSQL
           ▼
┌──────────────────────┐
│       Render         │
│    PostgreSQL DB     │
└──────────────────────┘
```

The production frontend communicates with the deployed Express API through the `VITE_API_URL` environment variable.

Production secrets such as `DATABASE_URL` and `JWT_SECRET` are configured through the hosting provider rather than committed to the repository.

---

## Security

Several basic security practices are implemented:

* Passwords are hashed with bcrypt.
* JWTs are used for authenticated API access.
* Protected routes require authentication.
* SQL queries use parameterized values.
* Users can only access tasks belonging to their household.
* Task assignment is validated against the user's household.
* Environment secrets are excluded from version control.

---

## Key Technical Challenges

### Household-Level Authorization

A major design requirement was ensuring users could only interact with resources belonging to their household.

For example, task queries are scoped using the authenticated user's household ID:

```sql
WHERE household_id = $1
```

The backend also verifies that a task's assigned user belongs to the same household before creating the task.

### JWT Updates After Household Changes

A newly registered user initially has no household.

When the user creates or joins a household, the backend generates a new JWT containing the user's updated household ID.

This allows subsequent authenticated requests to immediately operate within the correct household context.

### Docker Networking

The backend and PostgreSQL database run as separate Docker services.

Instead of connecting to:

```text
localhost
```

the backend connects to PostgreSQL using the Docker Compose service name:

```text
db
```

This allows the containers to communicate over Docker's internal network.

---

## What I Learned

Building HomeBase provided hands-on experience with:

* Designing a relational PostgreSQL schema
* Building REST APIs with Express
* TypeScript across frontend and backend
* JWT authentication
* Password hashing
* Authorization and resource ownership
* React state management
* React Router
* API integration
* Async data fetching
* Error and loading states
* Docker and Docker Compose
* Environment variable management
* Cloud deployment
* Git and GitHub
* Separating frontend and backend services

---

## Future Improvements

HomeBase intentionally focuses on a small set of core features rather than attempting to become a full household management platform.

Possible future improvements could include:

* Task editing
* Recurring tasks
* Push notifications
* Task due dates
* Household member management
* More granular permissions

These features were intentionally left out of the initial version to keep the application focused on its core functionality and demonstrate the fundamentals of full-stack development.

---

## License

This project was created as a portfolio project.

MIT License

Copyright (c) 2026 Mikael Shaikh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR #NIL# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.