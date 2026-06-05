🏪✨ Store Rating Platform

A full-stack web application that allows users to discover stores, submit ratings, and manage store feedback through role-based access control. The platform supports System Administrators, Store Owners, and Normal Users with dedicated dashboards and functionalities.

---

📖 Overview

The Store Rating Platform is designed to provide a centralized system where users can rate stores, store owners can monitor customer feedback, and administrators can manage the entire ecosystem.

The application follows a role-based architecture with secure session-based authentication and a MySQL relational database.

---

🎯 Features

👨‍💼 System Administrator

Dashboard

- View total users
- View total stores
- View total submitted ratings

User Management

- Add Admin users
- Add Normal users
- Add Store Owners
- View all users
- Filter users by:
  - Name
  - Email
  - Address
  - Role
- Sort users by:
  - Name
  - Email
- View detailed user information

Store Management

- Add stores
- Assign store owners
- View all stores
- View average store ratings
- Filter stores
- Sort store listings

---

👤 Normal User

Account Management

- Register account
- Login
- Logout
- Change password

Store Features

- View all registered stores
- Search stores by:
  - Name
  - Address
- View overall store ratings
- Submit ratings from 1 to 5
- Update previously submitted ratings

---

🏬 Store Owner

Dashboard

- View users who submitted ratings
- View ratings submitted for owned stores
- View average store rating

Account Features

- Login
- Logout
- Change password

---

🏗️ System Architecture

Frontend (React.js)
        │
        ▼
Backend (Express.js)
        │
        ▼
MySQL Database

---

🛠️ Technology Stack

Frontend

- React.js
- React Router DOM
- CSS

Backend

- Node.js
- Express.js
- express-session
- cors

Database

- MySQL
- mysql2

---

📂 Project Structure

store-rating-app
│
├── backend
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── userController.js
│   │   └── ownerController.js
│   │
│   ├── middleware
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── owner.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── userRoutes.js
│   │   └── ownerRoutes.js
│   │
│   ├── sql
│   │   └── schema.sql
│   │
│   └── server.js
│
├── frontend
│   │
│   ├── components
│   │   └── Navbar.js
│   │
│   ├── pages
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── AdminDashboard.js
│   │   ├── AdminUsers.js
│   │   ├── AdminStores.js
│   │   ├── AddUser.js
│   │   ├── AddStore.js
│   │   ├── UserDashboard.js
│   │   ├── OwnerDashboard.js
│   │   ├── UserDetails.js
│   │   └── ChangePassword.js
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── styles
│   │   └── style.css
│   │
│   ├── App.js
│   │
│   └── index.js
│
└── README.md

---

🗄️ Database Design

Users Table

Stores all platform users.

id
name
email
password
address
role
created_at

Roles

- admin
- user
- owner

---

Stores Table

Stores store information.

id
name
email
address
owner_id
created_at

---

Ratings Table

Stores user ratings.

id
user_id
store_id
rating
created_at

---

🔐 Authentication

The application uses session-based authentication.

Login Flow

User Login
    │
    ▼
Verify Credentials
    │
    ▼
Create Session
    │
    ▼
Redirect To Dashboard

Session Management

- express-session
- Cookie-based sessions
- Role verification middleware

---

📊 Functional Modules

Authentication Module

APIs

POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/logout

---

Admin Module

APIs

GET  /api/admin/dashboard
POST /api/admin/add-user
POST /api/admin/add-store
GET  /api/admin/users
GET  /api/admin/stores
GET  /api/admin/user/:id

---

User Module

APIs

GET  /api/user/stores
POST /api/user/rating
PUT  /api/user/rating/:storeId
PUT  /api/user/change-password

---

Owner Module

APIs

GET  /api/owner/dashboard
PUT  /api/owner/change-password

---

🚀 Installation

Clone Repository

git clone <repository-url>

cd store-rating-app

---

Backend Setup

cd backend

npm install

npm run dev

---

Frontend Setup

cd frontend

npm install

npm start

---

⚙️ Database Setup

Create database:

CREATE DATABASE store_rating;

Run schema:

SOURCE schema.sql;

---

🧪 Demo Credentials

Administrator

Email: admin1@gmail.com
Password: Admin@123

---

Store Owner

Email: owner1@gmail.com
Password: Owner@123

---

Normal User

Email: user1@gmail.com
Password: User@123

---

📈 Future Improvements

- Password encryption
- Email verification
- Profile images
- Pagination
- Dashboard analytics
- Rating trends
- Store categories
- Export reports
- Audit logging
- Responsive mobile optimization

---

🎓 Learning Outcomes

This project demonstrates:

- Full Stack Development
- REST API Development
- Session-Based Authentication
- Role-Based Access Control
- Relational Database Design
- React Component Architecture
- Express.js Backend Development
- MySQL Query Handling
- CRUD Operations
- Search and Filtering
- Data Validation
- Dashboard Design

---

👩‍💻 Developed By

Shivani Santosh Kapase

B.Tech Computer Engineering 

Wadia College of Engineering , Pune

Savitribai Phule Pune University

---

⭐ Project Status

Status : Completed
Frontend : Completed
Backend : Completed
Database : Completed
Authentication : Completed
Testing : Completed

✨ Thank You For Visiting The Store Rating Platform ✨
