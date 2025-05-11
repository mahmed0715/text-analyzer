# 🧠 Text Analyzer Tool

A full-stack Node.js + HTML/CSS application that allows users to store and analyze English text. It provides detailed statistics such as word count, character count, sentence count, paragraph count, and the longest word in each paragraph. All texts are stored in a database with support for CRUD operations.

---

## ✨ Features

- 🔍 Analyze texts with detailed insights:
  - Number of words
  - Number of characters
  - Number of sentences
  - Number of paragraphs
  - Longest word in each paragraph
- 🗃️ Store and retrieve text analysis data from database
- 📄 View past analysis results
- ❌ Delete analysis by ID
- ⚡ Caching for repeated analyses
- 🧪 100% Test-Driven Development with coverage reports
- 📈 Log visualization enabled in backend, with winston transport to file as well as logzio platform. check code in logger.ts
- ✅ Built using clean architecture and reusable service layers

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite (via Prisma ORM)
- **Frontend:** HTML, CSS, JavaScript
- **Testing:** Jest
- **Logging:** Winston logs, cmd+file+logzio
- **Caching:** In-memory store (Node-cache)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/text-analyzer-tool.git
cd text-analyzer-tool
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup the Database

```bash
npx prisma migrate dev --name init
```

### 4. Start the Application

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

---

## 🔍 Used API Endpoints

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | `/api/text/analyze` | Analyze and store a new text |
| GET    | `/api/texts`        | Get all saved analyses       |
| GET    | `/api/text/:id`     | Get analysis result by ID    |
| DELETE | `/api/text/:id`     | Delete an analysis by ID     |

---

## 🧪 Running Tests

```bash
npm test
```

To generate test coverage:

```bash
npm run test:coverage
```

Coverage reports will be available in the `/coverage` folder.

---

## 📁 Project Structure

```
/prisma
/src

  ├── server.ts # server file
  ├── app.ts        # express app file
  ├── controllers     # Express route handlers
  ├── services        # Business logic
  ├── routes          # Route definitions
  ├── __tests__           # Jest test files
  └──           
public/index.html            # Frontend UI
```

---

## 🧠 Example Text

```
"The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun."
```

---

## ✅ Bonus Features Implemented

- [x] Caching to avoid redundant analyses
- [x] Text linked to user (basic, no auth)
- [x] Logging in backend
- [x] Deleting analysis
- [x] Frontend calls for all backend APIs

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built by Mustak Ahmed as part of a technical assessment.
