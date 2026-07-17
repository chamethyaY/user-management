# User Management System

A full-stack web application for managing users, built with **Spring Boot** (backend) and **React** (frontend). Developed as part of a task assigned by **Inova IT Systems**.

---

## Overview

This project implements a complete user management system with authentication (register/login), and full CRUD operations (Create, Read, Update, Delete) for user records. The backend exposes a REST API secured with validation, password hashing, and proper error handling, while the frontend provides a responsive interface for interacting with that API.

---

## Tech Stack

### Backend
- **Java** with **Spring Boot**
- **Spring Data JPA** – database persistence
- **PostgreSQL** – relational database
- **Spring Security** – password encoding (BCrypt)
- **Maven** – dependency management
- **Swagger** – API testing and documentation

### Frontend
- **React** (with Vite)
- **Axios** – HTTP client for API communication
- **React Router** – client-side navigation

---

## Project Structure

```
user-management/
├── user-management-backend/     # Spring Boot REST API
│   └── src/main/java/com/inova/usermanagementsystem/
│       ├── controller/          # REST controllers
│       ├── entity/              # JPA entities
│       ├── repository/          # Spring Data repositories
│       ├── service/             # Business logic
│       ├── exception/           # Global exception handling
│       ├── CorsConfig.java
│       ├── PasswordEncoderConfig.java
│       └── SecurityConfig.java
│
└── user-management-frontend/    # React application
    └── src/
        ├── pages/               # Login, Register, Dashboard, UserList
        ├── api/                 # Axios configuration
        └── App.jsx
```

---

## Backend Setup

### Prerequisites
- Java 21+
- Maven
- PostgreSQL installed and running

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/chamethyaY/user-management.git
   cd user-management/user-management-backend
   ```

2. **Configure the database**

   Copy the example config and fill in your own credentials — do not commit real credentials to version control:
   ```bash
   cp src/main/resources/application-example.properties src/main/resources/application.properties
   ```
   Then update `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080` (default port).

4. **Test the APIs**
   Access Swagger UI at:
   ```
   http://localhost:8080/swagger-ui.html
   ```

---

## Frontend Setup

### Prerequisites
- Node.js and npm installed

### Steps

1. **Navigate to the frontend folder**
   ```bash
   cd user-management/user-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173` (default Vite port).

4. **Configure API base URL**
   Ensure `src/api/axiosConfig.js` points to your running backend (e.g. `http://localhost:8080`).

---

## API Endpoints

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | `/register`       | Register a new user        |
| POST   | `/login`          | Authenticate a user        |
| GET    | `/users`          | Get all users              |
| GET    | `/users/{id}`     | Get a user by ID           |
| PUT    | `/users/{id}`     | Update a user by ID        |
| DELETE | `/users/{id}`     | Delete a user by ID        |

---

## Features

### Backend
- User entity, repository, service, and controller layers
- Register and Login APIs
- Full CRUD operations for user management
- Request validation (required fields, email format, password length)
- Passwords hashed with BCrypt before storage
- Centralized exception handling with meaningful error responses
- API testing and documentation via Swagger

### Frontend
- Login and Register pages
- Dashboard/Home page
- User List page displaying all users in a table
- Edit and Delete user functionality
- Client-side form validation
- Success and error message feedback
- Page navigation via React Router
- Styled, responsive UI

---

## Security Notes

- Passwords are hashed using BCrypt before being stored — plaintext passwords are never persisted.
- Token-based authentication (JWT) is **not yet implemented** — API endpoints are not currently guarded by an auth check beyond the login/register flow. This is a planned next step.

---

## Testing

All backend APIs were tested manually using **Swagger UI**, verifying:
- Successful registration and login
- Correct validation error responses (e.g. invalid email, short password)
- Accurate CRUD behavior for user records
- Proper HTTP status codes for success and error cases

Automated unit/integration tests are not yet included and are a possible future addition.

---

## Roadmap / Not Yet Implemented

- JWT authentication
- Search functionality for users
- Pagination and sorting on the user list
- Logout functionality

---

## Author

**Chamethya**
BSc Computer Science Student, University of Westminster (IIT Colombo)
GitHub: [github.com/chamethyaY](https://github.com/chamethyaY)

---

## License

This project was developed as an internal task for **Inova IT Systems**.
