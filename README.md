# 📋 Task Management REST API

This is a full-featured **Task Management REST API** built using **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. It supports secure user registration, login, password reset, and full CRUD operations on tasks — including filtering.

---

## 🚀 Features

- 🔐 JWT-based authentication (Login & Register)
- 🔁 Password reset via token
- ✅ CRUD operations on tasks
- 🔍 Filter tasks by status (pending, in-progress, completed)
- 🧪 Unit testing with Jest & Supertest
- 📬 Ready-to-use Postman collection for testing

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT, bcryptjs
- **Testing**: Jest, Supertest
- **Docs**: Postman

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-management-rest-api.git
cd task-management-rest-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key
```

---

## ▶️ Run the Server

### For Development (with auto-reload)
```bash
npm run dev
```

### For Production
```bash
npm start
```

---

## 📬 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint                             | Description                     |
|--------|--------------------------------------|---------------------------------|
| POST   | `/api/auth/register`                 | Register new user               |
| POST   | `/api/auth/login`                    | Login and get JWT token         |
| POST   | `/api/auth/forgot-password`          | Request password reset token    |
| POST   | `/api/auth/reset-password?token=`    | Reset password using token      |

### ✅ Task Routes

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| POST   | `/api/tasks`            | Create a new task                    |
| GET    | `/api/tasks`            | Get all tasks (filter by `status`)   |
| GET    | `/api/tasks/:id`        | Get task by ID                       |
| PUT    | `/api/tasks/:id`        | Update task by ID                    |
| DELETE | `/api/tasks/:id`        | Delete task by ID                    |

> 🔐 All task routes require a valid JWT in the `Authorization: Bearer <token>` header.

---

## 🧪 Running Tests

This project uses **Jest** and **Supertest** for backend testing.

### ▶️ Run All Tests
```bash
npm test
```

### ▶️ Detect Async Handle Leaks
```bash
npx jest --detectOpenHandles
```

### ✅ Test Coverage

| Module        | Tests Covered                            |
|---------------|-------------------------------------------|
| **Auth API**  | Register, Login, Invalid Password         |
| **Task API**  | Create, Read, Update, Delete, Filter      |
| **Middleware**| JWT validation, role guard                |
| **Reset Flow**| Forgot/Reset password                     |

### 📂 Test Structure

```
/tests
  ├── auth.test.js   # Registration, login, invalid credentials
  └── task.test.js   # Task CRUD and filtering
```

---

## 📘 API Testing with Postman

You can test all endpoints using the included Postman collection.

📥 [Download Postman Collection](./task-management-api.postman_collection.json)

### ▶️ Steps:

1. Open Postman
2. Click **Import > File**
3. Select `task-management-api.postman_collection.json`
4. All routes and test bodies are pre-configured

---

## 🗂 Project Structure

```
task-management-rest-api/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
│   └── db.js
├── tests/
├── index.js
├── .env
├── README.md
└── task-management-api.postman_collection.json
```

---


