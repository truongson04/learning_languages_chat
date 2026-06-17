# Learning Languages Chat 🌍💬

Welcome to **Learning Languages Chat**, a modern, full-stack application designed to connect language learners worldwide. Find language exchange partners, make friends, chat in real-time, and practice your speaking skills through video calls!

# Deployment link :

https://learning-languages-chat.onrender.com/

## 🌟 Key Features

- **Language Exchange Matching:** Discover native speakers of the language you are learning, who are simultaneously learning your native language.
- **Real-Time Messaging:** Instant, reliable chat functionality powered by [Stream Chat](https://getstream.io/chat/).
- **Video Calling:** Practice conversational skills face-to-face using integrated WebRTC video calls.
- **Friend System:** Send, accept, or cancel friend requests. Keep track of your connections easily.
- **Online Presence:** See who is currently online in real-time via WebSockets (Socket.io).
- **Responsive & Modern UI:** A beautiful, glassmorphism-inspired UI optimized for both desktop and mobile devices, built with React, Tailwind CSS, and DaisyUI.
- **Secure Authentication:** Secure user registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.

## 🛠️ Technology Stack

**Frontend:**

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (State Management)
- [React Query](https://tanstack.com/query/latest) (Data Fetching)
- [Stream Chat React](https://getstream.io/chat/docs/sdk/react/) & Video SDK
- [Socket.io Client](https://socket.io/)

**Backend:**

- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) & Mongoose (Database)
- [Socket.io](https://socket.io/) (Real-time online status tracking)
- [Cloudinary](https://cloudinary.com/) (Profile picture uploads)
- Stream API (Chat & Video backend)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- A MongoDB cluster or local instance.
- Accounts on [Cloudinary](https://cloudinary.com/) and [GetStream](https://getstream.io/) to get API keys.

### 1. Clone the repository

```bash
git clone https://github.com/truongson04/learning_languages_chat.git
cd learning_languages_chat
```

### 2. Install Dependencies

The project is split into a `frontend` and `backend` directory. You will need to install packages for both.

**For Backend:**

```bash
cd backend
npm install
```

**For Frontend:**

```bash
cd ../frontend
npm install
```

### 3. Environment Variables Setup

You need to create a `.env` file in both the `frontend` and `backend` directories using the examples provided below.

#### Backend (`backend/.env`)

Create a file named `.env` in the `backend/` directory and add your credentials:

```env
# Server
PORT=3600
NODE_ENV="development"
FRONT_END_URL='http://localhost:5173'

# MongoDB
MONGO_URL='your_mongodb_connection_string_here'

# JWT
JWT_SECRET='your_super_secret_jwt_key_here'

# Stream API (GetStream.io)
STREAM_API_KEY='your_stream_api_key'
STREAM_API_SECRET='your_stream_api_secret'

# Cloudinary
CLOUDINARY_KEY='your_cloudinary_api_key'
CLOUDINARY_SECRET='your_cloudinary_api_secret'
CLOUDINARY_NAME='your_cloudinary_cloud_name'
```

#### Frontend (`frontend/.env`)

Create a file named `.env` in the `frontend/` directory:

```env
VITE_NODE_ENVIRONMENT="development"
VITE_BASE_URL='http://localhost:3600/api'

# Stream API (GetStream.io) - Ensure these match your backend keys
VITE_STREAM_API_KEY='your_stream_api_key'
VITE_STREAM_API_SECRET='your_stream_api_secret'
```

### 4. Running the Application

Open two separate terminal windows/tabs to run the backend and frontend concurrently.

**Start the Backend Server:**

```bash
cd backend
npm run dev
```

**Start the Frontend Development Server:**

```bash
cd frontend
npm run dev
```

The application should now be accessible in your browser at `http://localhost:5173`!

---

## 📸 Screenshots

![Homepage of the website](<frontend/public/Screenshot 2026-06-17 152844.png>)
![Chatting interface](<frontend/public/Screenshot 2026-06-17 153428.png>)
![Calling interface](<frontend/public/Screenshot 2026-06-17 153845.png>)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/truongson04/learning_languages_chat/issues).

## 📄 License

This project is licensed under the ISC License.
