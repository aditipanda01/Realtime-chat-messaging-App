# 🩺 Medical Pager Chat App

![Chat Application](https://i.ibb.co/hsvcw4V/image.png)

A **real-time chat application** built for medical professionals to communicate efficiently and securely.  
This project demonstrates the power of **React**, **Node.js**, and **Stream Chat API** to create a full-stack real-time communication platform.

---

## 🚀 Introduction

This project is based on the *JavaScript Mastery* tutorial and extended to simulate a **medical pager system** where doctors, nurses, and staff can communicate instantly.  
It supports:
- Secure login
- Real-time messaging
- User presence indicators
- Channel-based discussions (by department or case)
- Responsive UI for both desktop and mobile

By the end, you’ll understand how to build **any real-time chat application** using modern web technologies.

---

## 🌟 Features

✅ **User Authentication** — Secure login/signup using Stream Chat authentication  
✅ **Real-Time Messaging** — Instant message delivery and updates  
✅ **Channel Management** — Create and join different chat rooms (e.g., Cardiology, ER, Surgery)  
✅ **User Presence** — Online/offline indicators  
✅ **Message Search & Filters** — Find conversations easily  
✅ **Responsive Design** — Works smoothly on all devices  
✅ **Custom Avatars & Profiles** — Personalized user details  
✅ **Notification System** — Alerts for new messages and mentions  
✅ **Clean UI** — Built using modern React styling practices  

---

## 🏗️ Folder Structure

medical-pager-chat-app/
│
├── client/ # Frontend (React)
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── assets/ # Images, icons, and style assets
│ │ ├── components/ # Reusable React components
│ │ ├── contexts/ # Context providers (e.g., Auth, Chat)
│ │ ├── pages/ # Page-level components
│ │ ├── App.js # Main app component
│ │ └── index.js # React entry point
│ ├── .env # Environment variables (API keys)
│ ├── package.json # Client dependencies and scripts
│ └── README.md
│
├── server/ # Backend (Node.js + Express)
│ ├── controllers/ # Handles API logic
│ ├── routes/ # API route definitions
│ ├── config/ # Stream API setup and env configs
│ ├── server.js # Main server file
│ ├── package.json # Server dependencies
│ └── .env # Server environment variables
│
├── .gitignore
├── README.md # You are here
└── package.json

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/medical-pager-chat-app.git
cd medical-pager-chat-app
2️⃣ Install dependencies
For both client and server:

bash
Copy code
cd client
npm install

cd ../server
npm install
3️⃣ Configure environment variables
Create .env files in both client/ and server/ directories.

🧩 Example .env for server:
ini
Copy code
PORT=5000
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
STREAM_APP_ID=your_stream_app_id
🧩 Example .env for client:
ini
Copy code
REACT_APP_STREAM_API_KEY=your_stream_api_key
4️⃣ Run the development servers
bash
Copy code
# Start backend
cd server
npm start

# Start frontend
cd ../client
npm start
Visit 👉 http://localhost:3000 to see the app in action.

🧠 Tech Stack
Frontend: React, Stream Chat, Axios, CSS

Backend: Node.js, Express

API: Stream Chat API

Authentication: Stream User Tokens

Hosting: Vercel / Render / Netlify

📫 Stay Updated
New features and improvements are coming soon!
⭐ Star the repo and stay tuned for:

Voice and video calling

Message encryption

AI-based triage assistant

💡 Credits
Built with ❤️
