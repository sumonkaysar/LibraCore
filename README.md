# 📚 LibraCore - Library Management API

LibraCore is a backend API for a Library Management System built with **Express.js**, **TypeScript**, and **MongoDB**. It supports core operations like managing books, borrowing functionality with availability logic, and aggregation-based reporting.

---

## 🌐 Live API

**🔗 Base URL:** [https://libracore.vercel.app](https://libracore.vercel.app)

Frontend Repo 🔗: [LibreCore](https://github.com/sumonkaysar/LibraCore-client)

---

## 🚀 Features

- Create, update, delete, and fetch books
- Borrow books with real-time availability tracking
- Summary of borrowed books using aggregation pipeline
- Schema validation with Zod
- Business logic enforcement (copies check, availability update)
- Mongoose middleware, static methods, and custom error handling

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Zod** for request validation

---

## 📦 Installation

```bash
git clone https://github.com/your-username/libracore-api.git
cd libracore-api
npm install
```

---

## 📡 API Endpoints Summary

| HTTP Method | Endpoint           | Description                                  |
| ----------- | ------------------ | -------------------------------------------- |
| POST        | /api/books         | Create a new book                            |
| GET         | /api/books         | Get all books (supports filter, sort, limit) |
| GET         | /api/books/:bookId | Get details of a book by ID                  |
| PUT         | /api/books/:bookId | Update a book by ID                          |
| DELETE      | /api/books/:bookId | Delete a book by ID                          |
| POST        | /api/borrow        | Borrow a book (with availability check)      |
| GET         | /api/borrow        | Get summary of borrowed books (aggregation)  |

|
