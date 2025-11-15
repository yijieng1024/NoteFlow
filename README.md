# NoteFlow - Simple Notes App (Vue + Node.js + MySQL)
NoteFlow is a lightweight text-based notes management web application build with:
- Frontend UI - Vue 3
- Bootstrap 5
- Express.js
- MySQL
- RESTful CRUD
- Glassmorphism UI

---

# Features
### Frontend (Vue 3 + Bootstrap)
- Glassmorphism-styled note cards  
- Responsive grid layout for notes  
- Custom Bootstrap confirmation modal  
- Fixed top navigation bar  
- Create, edit, delete notes  
- Smooth and clean UI with Bootstrap 5  

### Backend (Node.js + Express)
- RESTful API  
- MySQL database interactions  
- Clean routing structure (`/routes/notes.js`)  
- Secure environment variables  
- CRUD operations for notes  

### 🗂 Database (MySQL)
- Notes table with timestamps  
- Auto-incrementing primary key  

---

## Tech Stack

### **Frontend**
- Vue 3 (Vite)
- Bootstrap 5
- Axios

### **Backend**
- Node.js
- Express.js
- MySQL2

---

## Project Structure
NoteFlow/
│
├── backend/
│ ├── server.js # Main Express server
│ ├── db.js # DB connection setup
│ ├── routes/
│ │ └── notes.js # CRUD API routes
│ ├── package.json
│ └── .env # Database & server config (ignored)
│
├── src/
│ ├── main.js # Vue app bootstrap
│ ├── App.vue # Root layout & logic
│ └── components/
│ ├── NoteForm.vue
│ ├── NotesList.vue
│ └── ConfirmationModal.vue
├── index.html
├── package.json
└── vite.config.js

---

## Installation & Setup
### 1️. Clone the Repository
```bash
git clone https://github.com/yijieng1024/NoteFlow.git
cd NoteFlow
```

## Backend Setup
### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3: Create .env
```ini
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=notes_db
PORT=5000
```

### 4: Create MySQL Database
```sql
CREATE DATABASE notes_db;

USE notes_db;

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5: Start Backend
```bash
node server.js
```
Backend runs at: http://localhost:5000

## Frontend Setup
### 6: Install Dependencies
```bash
cd ../fronend
npm install
```

### 7. Start Frontend
```bash
npm run dev
```
Frontend runs at: http://localhost:5173

---

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/notes`     | Get all notes |
| `POST`   | `/notes`     | Add new notes |
| `PUT`    | `/notes/:id` | Update a note |
| `DELETE` | `/notes/:id` | Delete a note |

---

## Development Process
### Example 1:
Input:
```bash
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      font-family: 'Poppins', system-ui, sans-serif;
      padding: 32px 16px;
    }
Help me to modify this body that can have some glowing more fancy
```

AI Output:
```bash
/* -------------------------------------------------
   FANCY GLOWING + ANIMATED BACKGROUND
   ------------------------------------------------- */
body {
  /* Base gradient (kept your original colors) */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: 'Poppins', system-ui, sans-serif;
  padding: 32px 16px;

  /* ---- 1. Animated moving gradient ---- */
  background-size: 200% 200%;
  animation: gradientShift 12s ease infinite;

  /* ---- 2. Soft inner glow (multiple layers) ---- */
  position: relative;
  overflow: hidden;
}

/* Animated gradient movement */
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ---- 3. Pulsing glow orbs (pure CSS) ---- */
body::before,
body::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: pulseGlow 8s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: -1;
}

/* Large orb – top-left */
body::before {
  width: 600px;
  height: 600px;
  background: rgba(102, 126, 234, 0.5); /* #667eea */
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

/* Medium orb – bottom-right */
body::after {
  width: 500px;
  height: 500px;
  background: rgba(118, 75, 162, 0.5); /* #764ba2 */
  bottom: -120px;
  right: -120px;
  animation-delay: 4s;
}

/* Pulse animation */
@keyframes pulseGlow {
  0%   { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0.7; }
}

/* ------------------------------------------------- */
```
Verification: I verify it by implement the code in the style.css file. 

### Example 2:
```bash
.note-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}
```
Change to:

```bash
.glass-card {
  background: rgba(30, 30, 50, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(159, 79, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(159, 79, 255, 0.1);
  transition: all 0.3s ease;
  padding: 28px;
  position: relative;
  overflow: hidden;
}
```

Modification: I modify it to be more fancy with the dark purple color
Reason: Make it more flexibility on the alignment and more fancy

## Author
Ng Yi Jie (Jack)
