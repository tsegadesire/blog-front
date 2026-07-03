# MERN Stack Blog Application

A modern, responsive, and feature-rich blog platform built using the MERN stack (MongoDB, Express, React, Node.js). This project provides a robust solution for writers to publish articles, engage with readers via comments, and manage content through a secure administrator control panel.

---

## 🚀 Features

### 👤 User Authentication & Profiles
- **Secure Authentication:** User registration and login powered by JSON Web Tokens (JWT) and BcryptJS hashing.
- **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for standard **Users** and **Admins**.
- **User Dashboard & Profile:** Manage your own published posts, view account details, and customize your profile with a bio and avatar.

### 📝 Post & Content Management
- **Rich Post Creation:** Create blog posts with titles, content, categories, and cover images (processed via Multer).
- **Categories:** Organize psosts by topics (Tech, Lifestyle, Education, etc.).
- **Comments:** Real-time feedback loop with a dynamic comment system where users can leave, edit, and delete comments.
- **Search Bar:** Quickly find articles by title or content tags.

### 🛡️ Admin Dashboard (Control Panel)
- **Overview Statistics:** Visual metric cards for users count, total posts, pending approvals, and active admins.
- **User Management:** View all registered users, activate/deactivate accounts, and promote users to admins.
- **Post Moderation:** Approve new post submissions or reject/delete inappropriate content before it is listed publicly.
- **Audit Logs:** Track system activities, user registrations, role modifications, and admin actions.

---

## 🛠️ Tech Stack

### Frontend
- **React (v19)** - User interface library
- **React Router DOM (v7)** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - SVG icon pack
- **PostCSS / Vanilla CSS** - Tailored layout and styling

### Backend
- **Node.js & Express.js** - Server environment and RESTful API framework
- **MongoDB & Mongoose** - Document-based NoSQL database and object modeling
- **JSON Web Tokens (JWT)** - Session authentication and state persistence
- **BcryptJS** - Password security and hashing
- **Multer** - Middleware for handling file uploads (profile avatars, post cover images)

---

## 📂 Project Directory Structure

```text
blog-front/
├── api/                    # Express.js Backend Server
│   ├── config/             # Database connection configuration
│   ├── controllers/        # Route controllers containing business logic
│   ├── middleware/         # Auth verification, role guards, error handlers
│   ├── models/             # Mongoose schemas (User, Post, Comment, AuditLog, Category)
│   ├── routes/             # RESTful API route endpoints
│   ├── uploads/            # Local directory for uploaded files/images
│   ├── utils/              # Helper functions and utilities
│   ├── .env.example        # Reference file for environment variables
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies & npm scripts
│
├── public/                 # Static assets for React
├── src/                    # React.js Frontend Application
│   ├── api/                # Axios instance configuration & service API wrappers
│   ├── components/         # Reusable UI components
│   │   ├── admin/          # Admin-only dashboard views and management utilities
│   │   ├── pages/          # Public and user-facing page components
│   │   ├── Navbar.js       # Main header navigation bar
│   │   └── PrivateRoute.js # Route guard component
│   ├── context/            # Global state context (AuthContext)
│   ├── hooks/              # Custom React hooks
│   ├── App.js              # Routing and primary component composition
│   ├── App.css             # Main styling rules
│   └── index.js            # Frontend entry point
│
└── package.json            # Frontend dependencies & npm scripts
```

---

## 🔧 Getting Started

Follow the steps below to set up and run the application locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) community server running locally or a MongoDB Atlas connection URI

### 1. Set Up the Backend Server
Navigate into the `api` folder:
```bash
cd api
```

Create a `.env` file in the `api` directory:
```env
MONGO_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

Install backend dependencies:
```bash
npm install
```

Start the backend development server (runs on `http://localhost:5000` by default):
```bash
npm run dev
```

### 2. Set Up the Frontend Client
Open a new terminal window in the project root directory (`blog-front`):

Install frontend dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm start
```
The application will open automatically in your browser at `http://localhost:3000`.

---

## 📡 API Reference

Below are the primary API endpoints exposed by the backend server:

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `/api/auth/register` | POST | Register a new user | No |
| `/api/auth/login` | POST | Login user and retrieve JWT | No |
| `/api/users/profile` | GET / PUT | Fetch or update active user profile details | Yes |
| `/api/posts` | GET | Retrieve all approved blog posts | No |
| `/api/posts` | POST | Create a new post submission (pending approval) | Yes |
| `/api/posts/:id` | GET / PUT / DELETE | Retrieve details, edit, or delete a specific post | Varies |
| `/api/comments` | POST | Write a comment on a blog post | Yes |
| `/api/comments/:id` | PUT / DELETE | Update or delete a comment | Yes |
| `/api/upload` | POST | Upload post banner images / profile pictures | Yes |
| `/api/admin/stats` | GET | Fetch administrative dashboard summary statistics | Yes (Admin) |
| `/api/admin/users` | GET / PUT | List all registered users or change active status/roles | Yes (Admin) |
| `/api/admin/posts` | GET / PUT | List posts for moderation or approve/reject post | Yes (Admin) |
| `/api/admin/audit` | GET | Retrieve administrative audit action logs | Yes (Admin) |

---

## 🔒 Security & Configuration
- All state-changing routes (e.g. creating/modifying posts, submitting comments) require a valid JWT passed in the HTTP Authorization header.
- Admin routes require the logged-in user to have an `admin` role parameter in their user record.
- CORS is configured in `api/server.js` to only accept requests originating from the frontend (defaulting to port `3000`).

---

## 📄 License
This project is licensed under the ISC License.
