# 📇 Contacts API — CSE 341 Project

This is a RESTful API built with **Node.js**, **Express**, and **MongoDB**, allowing full CRUD operations on a contact list. It is deployed using **Render** and documented with **Swagger UI**.

---

## 🔗 Live API

**Base URL:**  
➡️ [https://cse341-project1-contactsapi.onrender.com](https://cse341-project1-contactsapi.onrender.com)

---

## 📁 API Endpoints

All endpoints are prefixed with `/contacts`

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/contacts`      | Get all contacts                 |
| GET    | `/contacts/:id`  | Get a single contact by ID       |
| POST   | `/contacts`      | Create a new contact             |
| PUT    | `/contacts/:id`  | Update a contact by ID           |
| DELETE | `/contacts/:id`  | Delete a contact by ID           |

---

## 🧪 API Documentation (Swagger)

Explore and test all endpoints using Swagger UI:  
➡️ [https://cse341-project1-contactsapi.onrender.com/api-docs](https://cse341-project1-contactsapi.onrender.com/api-docs)

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Render** (for deployment)
- **Swagger UI** (for API documentation)
- **Thunder Client** or **Postman** for testing (optional)

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/dev-juve/cse341-project1-contactsAPI.git
cd cse341-project1-contactsAPI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

In the root directory, create a `.env` file and add your MongoDB connection string:

```env
MONGO_URI=your-mongodb-connection-string
```

> Make sure your MongoDB connection string uses URL-encoded characters for special symbols like `$` (e.g., `Ble%24%24ed98` instead of `Ble$$ed98`).

### 4. Start the Server

```bash
npm start
```

Server will run on `http://localhost:8080` by default.

---

## 📦 Sample JSON (POST/PUT)

Use this structure when creating or updating a contact:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "favoriteColor": "purple",
  "birthday": "1995-05-15"
}
```

---

## 🧪 Testing Endpoints

You can test the API using:

- **Thunder Client** (VS Code extension)
- **Postman**
- **Swagger UI** at `/api-docs`

---

## 📬 Author

**Juvenson Elizaire**  
Project for [CSE 341 – Backend Development @ BYU–Idaho](https://www.byui.edu/online)

---

## ✅ Project Status

✅ Week 1:  
- MongoDB connection  
- GET endpoints for all and single contact  
- Hosted on Render

✅ Week 2:  
- POST, PUT, DELETE endpoints  
- Swagger documentation  
- Deployment updates  
- `.rest` or Thunder Client test suite

All requirements complete and submitted 🎉