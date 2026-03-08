<div align="center">

<img src="https://trip-sync-apk.vercel.app/favicon.svg" width="80" height="80" alt="TripSync Logo"/>

# ✈️ TripSync

### *Plan trips together, effortlessly.*

**TripSync** is a full-stack collaborative trip planning platform where groups manage itineraries, split budgets, share files, and coordinate everything — all in one place.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-trip--sync--apk.vercel.app-E8445A?style=for-the-badge)](https://trip-sync-apk.vercel.app)
[![Backend API](https://img.shields.io/badge/⚙️_API-tripsync--api--jhet.onrender.com-4A90E2?style=for-the-badge)](https://tripsync-api-jhet.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-ashaafkhan%2FTripSync-181717?style=for-the-badge&logo=github)](https://github.com/ashaafkhan/TripSync)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)

</div>

---

## 📸 Preview

| Landing Page | Dashboard | Itinerary |
|---|---|---|
| ![Landing](https://trip-sync-apk.vercel.app/favicon.svg) | Plan your next adventure | Day-by-day activity planner |

---

## 🚀 Features

### 🗺️ Trip Management
- Create and manage multiple trips with cover images
- Invite collaborators via email with role-based access (Admin / Editor / Viewer)
- Trip overview with key stats and upcoming activities
- Full trip settings — edit name, dates, destination, and privacy

### 📅 Itinerary Planner
- Add trip days manually or auto-generate from trip date range
- Create, edit, and reorder activities per day with time, location, and type
- Drag-and-drop activity reordering (powered by `@dnd-kit`)
- Per-activity comment threads for team discussion

### ✅ Checklists
- Create multiple checklists per trip (packing list, to-do, etc.)
- Check/uncheck items with real-time progress tracking
- Role-gated editing — viewers can only read

### 💰 Budget Tracker
- Add expenses with categories, amounts, and payers
- Automatic split calculations across trip members
- Visual spending breakdown with charts (Recharts)
- Remaining budget indicator

### 📁 File Sharing
- Drag-and-drop file uploads (images, PDFs, docs — anything)
- Cloudinary-powered storage with secure URLs
- Download and delete with permission checks
- File preview by type

### 👥 Members & Roles
- Role system: **Admin**, **Editor**, **Viewer**
- Admins can promote/demote or remove members
- Invite by email — pending invites resolved on registration/login

### 💬 Comments
- Real-time comment threads on activities
- Timestamps and user avatars
- Context-aware: comments are scoped to activity or reservation

### 🔐 Authentication
- Email/password registration & login with JWT
- **Google Sign-In** via Firebase OAuth — one click, no passwords
- Secure HTTP-only cookie token storage
- Route-level protection with role-aware permission gates

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 7 | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| TanStack Query v5 | Server state, caching, mutations |
| Zustand | Client/UI state management |
| React Router v7 | Client-side routing |
| React Hook Form + Zod | Forms & validation |
| Firebase SDK v12 | Google OAuth |
| Recharts | Budget charts |
| @dnd-kit | Drag-and-drop |
| Lucide React | Icon set |
| Axios | HTTP client |
| date-fns | Date utilities |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose 9 | Database & ODM |
| Firebase Admin SDK | Google ID token verification |
| JWT + bcryptjs | Auth tokens & password hashing |
| Cloudinary + Multer | File upload & cloud storage |
| Nodemailer | Email invitations |
| Express Validator | Request validation |
| Morgan | HTTP request logging |
| Cookie Parser | HTTP-only cookie handling |

### Infrastructure
| Service | Role |
|---|---|
| Vercel | Frontend hosting (CDN + edge) |
| Render | Backend hosting |
| MongoDB Atlas | Managed cloud database |
| Cloudinary | Media/file storage |
| Firebase | Google OAuth provider |
| GitHub | Source control & CI/CD trigger |

---

## 📁 Project Structure

```
TripSync/
├── client/                     # React + Vite frontend
│   ├── public/
│   │   └── favicon.svg         # Airplane icon
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── budget/         # Budget table, split calculator
│   │   │   ├── checklist/      # Checklist items & progress
│   │   │   ├── files/          # File upload zone, file cards
│   │   │   ├── itinerary/      # Day cards, activity items, comment drawer
│   │   │   ├── trip/           # Create trip modal, invite modal
│   │   │   └── ui/             # Button, Modal, Badge, PermissionGate...
│   │   ├── hooks/              # TanStack Query hooks per domain
│   │   ├── pages/              # Route-level page components
│   │   ├── router/             # React Router config + ProtectedRoute
│   │   ├── services/           # API service layer (axios)
│   │   ├── store/              # Zustand stores (auth, trip, ui)
│   │   ├── types/              # Global TypeScript types
│   │   └── utils/              # Date formatting, split calc, initials
│   ├── index.html
│   ├── vercel.json             # SPA routing rewrite rule
│   └── vite.config.ts
│
└── server/                     # Express REST API
    ├── config/
    │   ├── db.js               # MongoDB connection
    │   ├── cloudinary.js       # Cloudinary config
    │   └── firebase.js         # Firebase Admin lazy init
    ├── controllers/            # Business logic per domain
    ├── middleware/
    │   ├── auth.js             # JWT verification middleware
    │   ├── role.js             # Role-based access control
    │   ├── upload.js           # Multer + Cloudinary upload
    │   └── validate.js         # express-validator error handler
    ├── models/                 # Mongoose schemas
    │   ├── User.js
    │   ├── Trip.js
    │   ├── Day.js
    │   ├── Activity.js
    │   ├── Checklist.js
    │   ├── Expense.js
    │   ├── File.js
    │   ├── Comment.js
    │   └── Reservation.js
    ├── routes/                 # Express routers
    └── utils/
        ├── apiResponse.js      # Standardized JSON responses
        ├── asyncHandler.js     # Async error wrapper
        └── generateToken.js    # JWT generation
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/register` | Register new user |
| `POST` | `/api/v1/auth/login` | Email/password login |
| `POST` | `/api/v1/auth/google` | Google OAuth login |
| `GET` | `/api/v1/auth/me` | Get current user |
| `GET` | `/api/v1/trips` | List user's trips |
| `POST` | `/api/v1/trips` | Create a trip |
| `GET` | `/api/v1/trips/:id` | Get trip details |
| `PUT` | `/api/v1/trips/:id` | Update trip |
| `DELETE` | `/api/v1/trips/:id` | Delete trip |
| `POST` | `/api/v1/trips/:id/invite` | Invite member by email |
| `GET` | `/api/v1/trips/:id/itinerary` | Get all days + activities |
| `POST` | `/api/v1/trips/:id/itinerary` | Add a day |
| `POST` | `/api/v1/trips/:id/itinerary/:dayId/activities` | Add activity |
| `GET` | `/api/v1/trips/:id/checklists` | Get checklists |
| `POST` | `/api/v1/trips/:id/checklists` | Create checklist |
| `GET` | `/api/v1/trips/:id/expenses` | Get expenses |
| `POST` | `/api/v1/trips/:id/expenses` | Add expense |
| `GET` | `/api/v1/trips/:id/files` | List files |
| `POST` | `/api/v1/trips/:id/files` | Upload file |
| `GET` | `/api/v1/comments/:type/:refId` | Get comments |
| `POST` | `/api/v1/comments/:type/:refId` | Add comment |

---

## ⚙️ Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Firebase project with Google Auth enabled
- Cloudinary account

### 1. Clone the repo
```bash
git clone https://github.com/ashaafkhan/TripSync.git
cd TripSync
```

### 2. Setup the backend
```bash
cd server
cp .env.example .env   # Fill in your values
npm install
npm run dev            # Runs on http://localhost:5000
```

**Required `server/.env` variables:**
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 3. Setup the frontend
```bash
cd client
cp .env.example .env.local   # Fill in your values
npm install
npm run dev                  # Runs on http://localhost:5173
```

**Required `client/.env.local` variables:**
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

---

## 🚢 Deployment

| Layer | Platform | Config |
|---|---|---|
| Frontend | Vercel | Root dir: `client`, auto-deploys on push to `main` |
| Backend | Render | Root dir: `server`, see `server/render.yaml` |
| Database | MongoDB Atlas | Network Access: `0.0.0.0/0` for Render |
| Files | Cloudinary | Auto-configured via env vars |
| Auth | Firebase | Add production domain to Authorized Domains |

---

## 🔒 Security

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- Auth tokens stored in **HTTP-only cookies** (not localStorage)
- Google ID tokens verified server-side via **Firebase Admin SDK**
- Role-based middleware on every protected route (`auth.js` + `role.js`)
- Input validation with **express-validator** on all mutation endpoints
- CORS restricted to `CLIENT_URL` environment variable
- Cloudinary uploads streamed server-side — client never gets API secrets

---

## 🧑‍💻 Author

**Mohammed Ashaaf Khan**

[![GitHub](https://img.shields.io/badge/GitHub-ashaafkhan-181717?style=flat-square&logo=github)](https://github.com/ashaafkhan)

---

<div align="center">

Built with ❤️ for the Buildathon 2026

⭐ Star this repo if you found it useful!

</div>
