# 🌍 Event Discovery — Event Listing App

Event Discovery is a full-stack web application that lets users create, browse, and filter events by location.  
Built using **React (Vite)** on the frontend and **Node.js + Express** on the backend, it supports dynamic search, event modals, and real-time updates.


## 🚀 Tech Stack

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** Node.js + Express  
**Database:** In-memory / JSON (for demo)  
**Deployment:** Railway


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/event-discovery.git
cd event-discovery bash
```

### 2️⃣ Install Dependencies
**Backend**:
```bash
cd backend
npm install
```

**Frontend**:
```bash
cd ../frontend
npm install
```

## 💻 How to Run the Project (Locally)

### 🧩 Run Backend
```bash
cd backend
npm run dev
```
This starts your API server (default: http://localhost:5000
)

### 🧩 Run Frontend
```bash
cd ../frontend
npm run dev
```

Open your browser and go to: http://localhost:5173

### 🔐 Environment Variables

Create a .env file in your backend folder:

```
PORT=5000
NODE_ENV=development
```

If using an external database or API key, add them here too.

For frontend, you can add environment variables in a .env file:

```
VITE_API_URL=http://localhost:5000
```

(Use your deployed backend URL in production.)

## 📘 API Documentation

### Base URL
http://localhost:5000/api/events

**Endpoints**

### 🔹 GET /api/events

Fetch all events.
```
[
  {
    "id": 1,
    "title": "Music Festival",
    "location": "Delhi",
    "date": "2025-11-15"
  }
]
```
### 🔹 GET /api/events/search?location=Delhi

Returns events filtered by location.

### 🔹 POST /api/events

Create a new event.

```
Body (JSON):
{
  "title": "Tech Conference",
  "location": "Bangalore",
  "date": "2025-12-02",
  "description": "A networking event for tech enthusiasts."
}
```
### 🔹 GET /api/events/random

Generates dynamic dummy events (for demo).

## 🧠 Features

### 🔍 Live search by location

### ➕ Add new events instantly

### 💾 Dynamic dummy event generator (for testing)

### 🌗 Dark mode theme

### ⚡ Fast and lightweight with Vite + Tailwind

##🌐 Deployment

Both frontend and backend are deployed separately on Railway.

**Frontend**: https://your-frontend-url.railway.app

**Backend**: https://your-backend-url.railway.app

## 🧑‍💻 Author

Vahid Hussain
📧 vahidhusyn@gmail.com

## 🌐 LinkedIn
 • GitHub

## 📜 License

This project is open-source under the MIT License.




