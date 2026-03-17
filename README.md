# TASK FLOW

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-338?style=for-the-badge&logoColor=white)

> 🇲🇽 Español | 🇺🇸 [English](#english-version)

## 🇲🇽 Español

### Descripción del Proyecto

**TaskFlow** es una aplicación web de gestión de proyectos y tareas tipo Kanban. Permite a los usuarios crear proyectos, agregar tareas, asignar miembros y colaborar en equipo. Desarrollada con un stack moderno de tecnologías para el aprendizaje y práctica de desarrollo Full Stack.

### 🛠️ Tech Stack

#### Backend

| Tecnología        | Uso                                     |
| ----------------- | --------------------------------------- |
| Node.js + Express | Servidor y API REST                     |
| TypeScript        | Tipado estático                         |
| Prisma ORM        | Manejo de base de datos                 |
| PostgreSQL        | Base de datos relacional                |
| JWT               | Autenticación con Access/Refresh tokens |
| Bcrypt            | Encriptación de contraseñas             |
| Zod               | Validación de schemas                   |

#### Frontend

| Tecnología         | Uso                      |
| ------------------ | ------------------------ |
| React + TypeScript | UI y lógica del cliente  |
| Vite               | Bundler y dev server     |
| Material UI (MUI)  | Componentes de interfaz  |
| React Router DOM   | Navegación entre páginas |
| Fetch API          | Llamadas al backend      |

### 📁 Estructura de Carpetas

```
TaskFlow/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   └── src/
│       ├── controllers/
│       │   ├── auth.controllers.js
│       │   ├── project.controllers.js
│       │   ├── task.controllers.js
│       │   └── member.controllers.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── project.middleware.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── project.routes.js
│       │   ├── task.routes.js
│       │   └── member.routes.js
│       ├── schemas/
│       │   ├── auth.schema.js
│       │   ├── project.schema.js
│       │   ├── task.schema.js
│       │   └── member.schema.js
│       ├── utils/
│       │   ├── jwt.js
│       │   └── password.js
│       ├── prisma.js
│       └── app.js
│
└── frontend/
    └── src/
        ├── api/
        │   ├── auth.ts
        │   ├── projects.ts
        │   └── task.ts
        ├── components/
        │   ├── projects/
        │   │   ├── ProjectCard.tsx
        │   │   └── CreateProjectModal.tsx
        │   ├── tasks/
        │   │   ├── TaskCard.tsx
        │   │
        │   ├── deleteModal.tsx
        │   └── ProtectedRoute.tsx
        │
        ├── context/
        │   └── AuthContext.tsx
        ├── pages/
        │   ├── LoginPage.tsx
        │   ├── RegisterPage.tsx
        │   ├── DashboardPage.tsx
        │   └── ProjectPage.tsx
        ├── App.tsx
        └── main.tsx
```

### ⚙️ Instalación y Configuración

#### Prerequisitos

- Node.js v18+
- PostgreSQL
- npm o yarn

#### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/taskflow.git
cd taskflow
```

#### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend/`:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/taskflow"
ACCESS_SECRET="tu_access_secret_aqui"
REFRESH_SECRET="tu_refresh_secret_aqui"
PORT=1234
```

Ejecuta las migraciones:

```bash
npx prisma migrate dev
npx prisma generate
```

Inicia el servidor:

```bash
npm run dev
```

#### 3. Configurar el Frontend

```bash
cd frontend
npm install
```

Crea un archivo `.env` en la carpeta `frontend/`:

```env
VITE_BASE_URL=http://localhost:1234/api
```

Inicia el cliente:

```bash
npm run dev
```

---

### 🔌 Endpoints de la API

#### Auth

| Método | Endpoint        | Descripción              | Auth |
| ------ | --------------- | ------------------------ | ---- |
| POST   | `/api/register` | Registrar usuario        | ❌   |
| POST   | `/api/login`    | Iniciar sesión           | ❌   |
| POST   | `/api/logout`   | Cerrar sesión            | ✅   |
| POST   | `/api/refresh`  | Renovar access token     | ❌   |
| GET    | `/api/me`       | Obtener usuario logueado | ✅   |

#### Proyectos

| Método | Endpoint                  | Descripción             | Auth |
| ------ | ------------------------- | ----------------------- | ---- |
| GET    | `/api/project`            | Obtener mis proyectos   | ✅   |
| GET    | `/api/project/:id`        | Obtener proyecto por id | ✅   |
| POST   | `/api/project/create`     | Crear proyecto          | ✅   |
| PUT    | `/api/project/update/:id` | Actualizar proyecto     | ✅   |
| DELETE | `/api/project/delete/:id` | Eliminar proyecto       | ✅   |

#### Tareas

| Método | Endpoint                                  | Descripción                 | Auth |
| ------ | ----------------------------------------- | --------------------------- | ---- |
| GET    | `/api/project/:projectId/tasks`           | Obtener tareas del proyecto | ✅   |
| POST   | `/api/project/:projectId/task/create`     | Crear tarea                 | ✅   |
| PUT    | `/api/project/:projectId/task/update/:id` | Actualizar tarea            | ✅   |
| DELETE | `/api/project/:projectId/task/delete/:id` | Eliminar tarea              | ✅   |

#### Miembros

| Método | Endpoint                                        | Descripción      | Auth |
| ------ | ----------------------------------------------- | ---------------- | ---- |
| GET    | `/api/project/:projectId/members`               | Obtener miembros | ✅   |
| POST   | `/api/project/:projectId/member/add`            | Agregar miembro  | ✅   |
| PUT    | `/api/project/:projectId/member/update/:userId` | Actualizar rol   | ✅   |
| DELETE | `/api/project/:projectId/member/delete/:userId` | Eliminar miembro | ✅   |

---

### 📸 Screenshots

### 🗄️ Modelo de Base de Datos

```
users
  ├── ownedProjects → projects (1:N)
  ├── memberProjects → project_members (N:M)
  └── assignedTasks → tasks (1:N)

projects
  ├── owner → users
  ├── members → project_members
  └── tasks → tasks (1:N)

project_members
  ├── project → projects
  └── user → users

tasks
  ├── project → projects
  └── assignee → users (opcional)
```

<a name="english-version"></a>

## 🇺🇸 English Version

### 📋 Project Description

**TaskFlow** is a Kanban-style project and task management web application. It allows users to create projects, add tasks, assign members, and collaborate as a team. Built with a modern tech stack for Full Stack development learning and practice.

---

### 🛠️ Tech Stack

#### Backend

| Technology         | Usage                           |
| ------------------ | ------------------------------- |
| Node.js + Express  | Server and REST API             |
| TypeScript         | Static typing                   |
| Prisma ORM         | Database management             |
| PostgreSQL         | Relational database             |
| JWT (jsonwebtoken) | Auth with Access/Refresh tokens |
| Bcrypt             | Password encryption             |
| Zod                | Schema validation               |

#### Frontend

| Technology         | Usage                  |
| ------------------ | ---------------------- |
| React + TypeScript | UI and client logic    |
| Vite               | Bundler and dev server |
| Material UI (MUI)  | UI components          |
| React Router DOM   | Page navigation        |
| Fetch API          | Backend calls          |

---

### ⚙️ Installation & Setup

#### Prerequisites

- Node.js v18+
- PostgreSQL
- npm or yarn

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
ACCESS_SECRET="your_access_secret_here"
REFRESH_SECRET="your_refresh_secret_here"
PORT=1234
```

Run migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the server:

```bash
npm run dev
```

#### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_BASE_URL=http://localhost:1234/api
```

Start the client:

```bash
npm run dev
```

---

### 🔌 API Endpoints

#### Auth

| Method | Endpoint        | Description          | Auth |
| ------ | --------------- | -------------------- | ---- |
| POST   | `/api/register` | Register user        | ❌   |
| POST   | `/api/login`    | Login                | ❌   |
| POST   | `/api/logout`   | Logout               | ✅   |
| POST   | `/api/refresh`  | Refresh access token | ❌   |
| GET    | `/api/me`       | Get logged user      | ✅   |

#### Projects

| Method | Endpoint                  | Description       | Auth |
| ------ | ------------------------- | ----------------- | ---- |
| GET    | `/api/project`            | Get my projects   | ✅   |
| GET    | `/api/project/:id`        | Get project by id | ✅   |
| POST   | `/api/project/create`     | Create project    | ✅   |
| PUT    | `/api/project/update/:id` | Update project    | ✅   |
| DELETE | `/api/project/delete/:id` | Delete project    | ✅   |

#### Tasks

| Method | Endpoint                                  | Description       | Auth |
| ------ | ----------------------------------------- | ----------------- | ---- |
| GET    | `/api/project/:projectId/tasks`           | Get project tasks | ✅   |
| POST   | `/api/project/:projectId/task/create`     | Create task       | ✅   |
| PUT    | `/api/project/:projectId/task/update/:id` | Update task       | ✅   |
| DELETE | `/api/project/:projectId/task/delete/:id` | Delete task       | ✅   |

#### Members

| Method | Endpoint                                        | Description   | Auth |
| ------ | ----------------------------------------------- | ------------- | ---- |
| GET    | `/api/project/:projectId/members`               | Get members   | ✅   |
| POST   | `/api/project/:projectId/member/add`            | Add member    | ✅   |
| PUT    | `/api/project/:projectId/member/update/:userId` | Update role   | ✅   |
| DELETE | `/api/project/:projectId/member/delete/:userId` | Remove member | ✅   |

---

### 📸 Screenshots

### 🗄️ Database Model

```
users
  ├── ownedProjects → projects (1:N)
  ├── memberProjects → project_members (N:M)
  └── assignedTasks → tasks (1:N)

projects
  ├── owner → users
  ├── members → project_members
  └── tasks → tasks (1:N)

project_members
  ├── project → projects
  └── user → users

tasks
  ├── project → projects
  └── assignee → users (optional)
```
