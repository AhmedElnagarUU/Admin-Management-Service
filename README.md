# 🧩 Admin Management Service  
**Developed by Ahmed Elnagar — Clean Architecture & Node.js Showcase**

---

## 🧠 Overview

The **Admin Management Service** is a standalone microservice designed to manage administrative users, moderators, and role-based access control within a distributed system.  
It demonstrates clean architecture principles with clear separation between **Domain**, **Application**, and **Infrastructure** layers — ensuring testability, maintainability, and scalability.

---

## 🏗️ Architecture

**Clean Architecture (3 Layers)**

1. **Domain Layer** – Core entities and business rules (pure logic, no framework).
2. **Application Layer** – Use cases, services, and orchestration of domain logic.
3. **Infrastructure Layer** – Frameworks, database models, controllers, and routing.

admin-management-service/
│
├── src/
│ ├── domain/
│ │ ├── entities/
│ │ │ └── Admin.ts
│ │ └── repositories/
│ │ └── IAdminRepository.ts
│ │
│ ├── application/
│ │ ├── use-cases/
│ │ │ ├── CreateAdminUseCase.ts
│ │ │ ├── UpdateAdminUseCase.ts
│ │ │ ├── ChangePasswordUseCase.ts
│ │ │ ├── ForgotPasswordUseCase.ts
│ │ │ ├── LoginAdminUseCase.ts
│ │ │ ├── Enable2FAUseCase.ts
│ │ │ ├── GetAdminsUseCase.ts
│ │ │ ├── DeleteAdminUseCase.ts
│ │ │ ├── LogActivityUseCase.ts
│ │ │ └── GetLoginHistoryUseCase.ts
│ │ └── services/
│ │ └── AuthService.ts
│ │
│ ├── infrastructure/
│ │ ├── controllers/
│ │ │ └── AdminController.ts
│ │ ├── routes/
│ │ │ └── adminRoutes.ts
│ │ ├── middlewares/
│ │ │ ├── AuthMiddleware.ts
│ │ │ └── RoleGuard.ts
│ │ ├── database/
│ │ │ ├── models/
│ │ │ │ └── AdminModel.ts
│ │ │ └── MongoAdminRepository.ts
│ │ ├── utils/
│ │ │ └── TokenService.ts
│ │ └── server.ts
│ │
│ └── shared/
│ ├── errors/
│ ├── utils/
│ └── config/
│
├── tests/
├── Dockerfile
├── package.json
└── README.md

pgsql
Copy code

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Language | **TypeScript (Node.js)** |
| Framework | **Express.js** |
| Database | **MongoDB (Mongoose)** |
| Auth | **JWT + Refresh Tokens + 2FA (optional)** |
| Testing | **Jest** |
| Container | **Docker** |
| Linting | **ESLint + Prettier** |

---

## 🚀 Features

### 🧩 Core Features
- Create, update, and delete admins or moderators.  
- Get all admins with filters (role, active status, pagination).  
- Get single admin by ID.  
- Update admin profile (name, email, photo, etc.).  
- Deactivate or re-activate admin accounts.

### 🔐 Authentication & Security
- Login with email & password (JWT authentication).  
- Refresh token mechanism for session renewal.  
- Change password after login.  
- Forgot password + email reset token.  
- Two-factor authentication (email or Google Authenticator).  
- Logout and token invalidation.  
- Account lock after multiple failed logins.

### ⚙️ Role & Permission Management
- Create and manage roles (`super_admin`, `moderator`, etc.).  
- Assign granular permissions (e.g., `user:ban`, `settings:update`).  
- Middleware-based role guards for routes.  

### 📊 Activity Logs
- Log all admin actions (create, delete, login, etc.).  
- Track login history and IP addresses.  
- Monitor failed login attempts and suspicious activity.

### 👤 Profile & Settings
- Update personal details and preferences.  
- Upload profile avatar.  
- Enable or disable notifications.  
- Change theme or language preferences.

### 🔄 Integrations
- Generate & manage API keys for internal services.  
- Webhooks for external notification (e.g., “new admin created”).  
- `/health` endpoint for monitoring.  
- `/metrics` endpoint for dashboard stats.

### 🧠 Advanced Features
- Caching for frequently accessed data (Redis ready).  
- Centralized error handling & logging.  
- Audit trail exports for compliance.  
- Swagger / OpenAPI documentation generation.

---

## 🧾 Example Use Cases

| Use Case | Description | Input | Output |
|-----------|--------------|--------|---------|
| **CreateAdminUseCase** | Create new admin or moderator | name, email, role | Admin object |
| **LoginAdminUseCase** | Authenticate admin | email, password | JWT tokens |
| **ChangePasswordUseCase** | Update password securely | oldPassword, newPassword | Success message |
| **ForgotPasswordUseCase** | Reset password via email token | email | Reset confirmation |
| **Enable2FAUseCase** | Enable 2-factor authentication | secret or code | Verified status |
| **LogActivityUseCase** | Record any admin action | action details | Stored log |
| **GetAdminsUseCase** | Retrieve list of admins | pagination filters | Array of Admins |

---

## 🌐 Example API Endpoints

| Method | Endpoint | Description | Auth |
|---------|-----------|--------------|------|
| `POST` | `/auth/login` | Login and get JWT token | ❌ |
| `POST` | `/auth/refresh` | Refresh expired token | ✅ |
| `POST` | `/auth/change-password` | Change password | ✅ |
| `POST` | `/auth/forgot-password` | Request password reset | ❌ |
| `POST` | `/auth/reset-password` | Reset password via token | ❌ |
| `GET` | `/admins` | List all admins | ✅ |
| `GET` | `/admins/:id` | Get admin by ID | ✅ |
| `POST` | `/admins` | Create new admin | ✅ (super_admin only) |
| `PUT` | `/admins/:id` | Update admin info | ✅ |
| `DELETE` | `/admins/:id` | Deactivate / delete admin | ✅ (super_admin) |
| `GET` | `/logs` | View system logs | ✅ |
| `GET` | `/health` | Check service health | ❌ |
| `GET` | `/metrics` | Get statistics | ✅ |

---

## 🔐 Security Practices

- JWT tokens stored securely (HTTP-only cookies recommended).  
- Bcrypt for password hashing.  
- Validation via `zod` or `class-validator`.  
- Centralized error handling middleware.  
- Role-based route guards.

---

## 🧩 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/ahmed-elnagar/admin-management-service.git
cd admin-management-service
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create .env file:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/admin-service
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
4. Run in Development
bash
Copy code
npm run dev
5. Build for Production
bash
Copy code
npm run build
npm start
6. Run with Docker
bash
Copy code
docker build -t admin-service .
docker run -p 5000:5000 admin-service
🧪 Testing
bash
Copy code
npm run test
Unit tests for use cases.

Integration tests for routes.

Mocked database and auth layers.

🧭 Future Roadmap
 Add audit log dashboard

 Add support for multi-organization admins

 Integrate notification system (email/SMS)

 Add rate-limiting middleware

 Add GraphQL API layer

 Deploy on Kubernetes with CI/CD pipeline

🧑‍💻 Author
Ahmed Elnagar
Backend Developer — Node.js, TypeScript, Clean Architecture Enthusiast

🔗 GitHub: github.com/ahmed-elnagar