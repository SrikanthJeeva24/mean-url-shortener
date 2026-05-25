# 🔗 Shortly — URL Shortener

A modern full-stack URL Shortener application built using the **MEAN Stack** (Angular, Node.js, Express.js, MongoDB).

Convert long URLs into clean, shareable short links instantly with click tracking and redirect support.

---

## 🚀 Live Demo

Frontend:  
`Coming Soon`

Backend API:  
`Coming Soon`

---

## ✨ Features

- 🔗 Generate short URLs
- ↪ Redirect shortened links to original URLs
- 📈 Track click counts
- 🗂 View recently generated URLs
- 🔁 Prevent duplicate URLs
- ✅ URL validation
- 📋 Copy shortened links
- 🎨 Modern responsive UI
- ☁ MongoDB Atlas integration

---

## 🛠 Tech Stack

### Frontend
- Angular
- TypeScript
- Tailwind CSS
- Angular Signals

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📂 Project Structure

```txt
mean-url-shortener/

├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   │
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore

⚙ Installation
Clone Repository
git clone https://github.com/YOUR_USERNAME/mean-url-shortener.git
cd mean-url-shortener
🖥 Frontend Setup
cd frontend

Install:

npm install

Run:

ng serve

Frontend:

http://localhost:4200
⚡ Backend Setup
cd backend

Install:

npm install

Run:

npm run dev

Backend:

http://localhost:5000
🔐 Environment Variables

Create:

backend/.env

Example:

PORT=5000

BASE_URL=http://localhost:5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
📡 API Endpoints
Create Short URL
POST /api/url

Request:

{
  "originalUrl": "https://google.com"
}

Response:

{
  "message": "Short URL Created",
  "data": {
    "shortUrl": "http://localhost:5000/abc123"
  }
}
Get All URLs
GET /api/url
Redirect
GET /:shortCode

Example:

http://localhost:5000/abc123
📸 Screenshots

Add screenshots here later.

Example:

screenshots/
Home
Generated URL
Recent Links
🧠 Future Improvements
Authentication
Custom URL aliases
QR Code support
Analytics Dashboard
Expiry links
Dark mode
👨‍💻 Author

Srikanth Jeeva

GitHub:
https://github.com/SrikanthJeeva24

Portfolio:
https://www.srikanthjeeva.in

If you found this useful, consider giving it a ⭐

