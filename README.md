# 🛒 Grocery Store Application

A full-stack grocery store management application built with **Java Spring Boot**, **MongoDB**, and **TypeScript**, featuring **OAuth2 security**, RESTful APIs, and comprehensive backend and frontend testing.

This project demonstrates modern web application architecture, secure authentication, and scalable data handling.

---

## 📌 Features

* User authentication and authorization with OAuth2
* Secure RESTful API
* Grocery product management (CRUD operations)
* User accounts and roles
* Shopping cart functionality
* Order processing
* MongoDB database integration
* Frontend built with TypeScript
* Unit and E2E Testing Backend and frontend 

---

## 🛠️ Technologies Used

### Backend

* Java 17+
* Spring Boot
* Spring Security (OAuth2)
* Spring Data MongoDB
* RESTful APIs
* JUnit / Mockito (Testing)

### Frontend

* TypeScript
* React
* SCSS
* Axios / Fetch API
* Jest / Cypress (Testing)

### Database

* MongoDB

### Authentication & Security

* OAuth2
* JWT Tokens
* Spring Security

### DevOps & Tools

* Maven / Gradle
* Node.js & npm
* Git
* Docker

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* Java 17+
* Node.js 16+
* MongoDB
* Maven or Gradle
* Git

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/grocery-store-app.git
cd grocery-store-app
```

---

### 2️⃣ Setup MongoDB

Start MongoDB locally:

```bash
mongod
```

Or using Docker:

```bash
docker run -d -p 27017:27017 mongo
```

Default connection:

```
mongodb://localhost:27017/groceryapp
```

You can change this in:

```
backend/src/main/resources/application.properties
```

---

### 3️⃣ Backend Setup (Spring Boot)

Navigate to backend folder:

```bash
cd backend
```

Install dependencies and run:

```bash
mvn clean install
mvn spring-boot:run
```

Or with Gradle:

```bash
./gradlew bootRun
```

Backend will start on:

```
http://localhost:8080
```

---

### 4️⃣ Frontend Setup (TypeScript + Vite)

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```


---

## 🔐 Authentication (OAuth2)

This application uses OAuth2 for secure authentication.

### Supported Providers

* GitHub
* Custom OAuth Provider

Configure credentials in:

```
application.properties
```

Example:

```properties
spring.security.oauth2.client.registration.google.client-id=GITHUB_ID
spring.security.oauth2.client.registration.google.client-secret=GITHUB_SECRET
```

---

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

For end-to-end tests:

```bash
npm run e2e
```

---


## 📬 Contact

LinkedIn: [BitaShamsafar](https://www.linkedin.com/in/bita-shamsafar/)

