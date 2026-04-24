# 🔐 Auth Project

A full-stack authentication playground built with **React + Vite** on the frontend and **Express + Passport.js** on the backend. It demonstrates multiple authentication strategies — local username/password login and Google OAuth 2.0 — organized across escalating "security levels."

---

## ✨ Features

- 🧑‍💻 **Local Authentication** — Username & password login via Passport.js `LocalStrategy`
- 🌐 **Google OAuth 2.0** — Sign in with Google using Passport.js `GoogleStrategy`
- 🔒 **Session Management** — Persistent login sessions via `express-session`
- ⚛️ **React Frontend** — Multi-page SPA with `react-router-dom` v7
- 🎨 **Leveled UI** — Three distinct authentication "levels" (L1 → L2 → L3) with a dedicated OAuth callback page
- 🔄 **CORS Configured** — Seamless communication between the Vite dev server and Express API

---

## 🗂️ Project Structure

```
Auth_project/
├── Client/
│   ├── assets/
│   └── src/
│       ├── Css/                  # Component-level stylesheets
│       └── Pages/
│           ├── L1.jsx            # Level 1 — Basic login page
│           ├── L2.jsx            # Level 2 — Enhanced login page
│           ├── L3.jsx            # Level 3 — Google OAuth entry point
│           ├── OAuthCallback.jsx # Handles redirect after Google login
│           └── app.jsx           # Root app with React Router routes
├── Server/
│   ├── auth.js                   # Passport strategies & serialization
│   ├── server.js                 # Express app, routes, session config
│   └── .env                      # Environment variables (not committed)
├── index.html
├── main.jsx
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A Google Cloud project with **OAuth 2.0 credentials** ([guide](https://developers.google.com/identity/protocols/oauth2))

### 1. Clone the repository

```bash
git clone https://github.com/Adarsh-bhandari1/Auth_project.git
cd Auth_project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `Server/` directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

In your [Google Cloud Console](https://console.cloud.google.com/), add the following **Authorized redirect URI**:

```
http://localhost:3000/auth/google/callback
```

### 4. Run the development servers

You need **two terminals** running simultaneously:

**Terminal 1 — Frontend (Vite)**
```bash
npm run dev
```

**Terminal 2 — Backend (Express + Nodemon)**
```bash
npm run dev:server
```

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:5173       |
| Backend  | http://localhost:3000       |

---

## 🔑 Authentication Flow

### Local Login
1. User submits credentials on the login page (`L1` or `L2`).
2. Frontend POSTs to `POST /login`.
3. `passport.authenticate("local")` validates against the hardcoded user.
4. On success, a session cookie is issued and the user data is returned.

### Google OAuth 2.0
1. User clicks **"Sign in with Google"** on the `L3` page.
2. Frontend redirects to `GET /auth/google` on the Express server.
3. Passport redirects the user to Google's consent screen.
4. Google calls back to `GET /auth/google/callback`.
5. On success, the server redirects to `http://localhost:5173/auth/callback`.
6. The `OAuthCallback` page displays the authenticated user's profile.

---

## 🛣️ API Endpoints

| Method | Endpoint                  | Description                              |
|--------|---------------------------|------------------------------------------|
| `POST` | `/login`                  | Authenticate with username & password    |
| `GET`  | `/profile`                | Check current session / logged-in user   |
| `GET`  | `/auth/google`            | Initiate Google OAuth flow               |
| `GET`  | `/auth/google/callback`   | Google OAuth redirect callback           |
| `GET`  | `/logout`                 | Destroy session and log out              |

---

## 🧰 Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Frontend   | React 19, Vite 8, React Router DOM v7       |
| Backend    | Node.js, Express 5                          |
| Auth       | Passport.js, passport-local, passport-google-oauth20 |
| Session    | express-session                             |
| Env Config | dotenv                                      |
| Dev Tools  | Nodemon, ESLint                             |

---

## 📝 Default Local Credentials

> These are hardcoded for demonstration purposes only.

| Field    | Value    |
|----------|----------|
| Username | `adarsh` |
| Password | `123`    |

---

## 🛡️ Security Notes

This project is a **learning/demo** application. Before deploying to production:

- [ ] Replace hardcoded credentials with a real database (e.g., PostgreSQL + bcrypt)
- [ ] Use a strong, randomly generated `session secret` (store it in `.env`)
- [ ] Enable HTTPS and set `cookie: { secure: true }` in session config
- [ ] Validate and sanitize all user inputs
- [ ] Add rate limiting to login endpoints

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
