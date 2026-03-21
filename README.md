# 🚀 Vansh Lunagariya — Portfolio

A modern, full-stack developer portfolio built with the **MERN stack** (without MongoDB — React frontend + Node/Express backend). Features a dark terminal-inspired UI, animated components, project showcases, and a working contact form powered by Resend.

**🌐 Live Demo:** [https://iamvansh.vercel.app/]

---

## ✨ Features

- ⚡ Smooth typewriter animation in hero section
- 🖼️ Animated profile photo with rotating rings
- 📱 Fully responsive — works on mobile, tablet, desktop
- 🧭 Scroll-spy navbar — auto-highlights active section
- 🪄 Floating nav pill — jump between sections without scrolling back to top
- 🃏 Project cards with click-to-expand modals
- 📄 Resume download button
- 📬 Working contact form with email notifications via Resend
- 🎨 Dark theme with green accent (`#00f5a0`) and monospace font

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI framework |
| CSS3 | Styling & animations |
| Vercel | Hosting |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Server framework |
| Resend | Email API |
| Render | Hosting |

---

## 📁 Project Structure

```
Portfolio/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html       # Tab title & favicon
│   └── src/
│       ├── App.js
│       ├── Portfolio.jsx    # Main component
│       └── Portfolio.css    # All styles
│
└── server/                  # Express backend
    ├── server.js            # API routes & email logic
    ├── .env                 # Environment variables (not pushed)
    ├── .gitignore
    └── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- npm
- A [Resend](https://resend.com) account (free)

### 1. Clone the repo
```bash
git clone https://github.com/Vansh-dev1/Portfolio.git
cd Portfolio
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:
```env
PORT=3001
RESEND_API_KEY=your_resend_api_key
RENDER_URL=http://localhost:3001
```

Start the server:
```bash
npm run dev
```
Server runs on `http://localhost:3001`

### 3. Setup the frontend
```bash
cd client
npm install
npm start
```
App runs on `http://localhost:3000`

---

## 🌍 Deployment

| Service | Purpose | URL |
|---------|---------|-----|
| Vercel | Frontend hosting | [vercel.com](https://vercel.com) |
| Render | Backend hosting | [render.com](https://render.com) |

### Deploy Backend (Render)
1. Connect your GitHub repo on Render
2. Set **Root Directory** to `server`
3. Set **Start Command** to `node server.js`
4. Add environment variables:
   ```
   RESEND_API_KEY = your_resend_api_key
   RENDER_URL = https://your-render-url.onrender.com
   ```

### Deploy Frontend (Vercel)
1. Connect your GitHub repo on Vercel
2. Set **Root Directory** to `client`
3. Set **Framework** to `Create React App`
4. Deploy — done!

---

## 📬 Contact Form

The contact form uses [Resend](https://resend.com) to send email notifications. When someone submits the form:
1. You receive a styled notification email with their message
2. The sender receives an auto-reply (requires verified domain on Resend)

---

## 👨‍💻 Author

**Vansh Lunagariya**
- 🎓 3rd Year B.TECH CSE — ADIT College, Anand, Gujarat
- 📧 [vansh.lunagariya123@gmail.com](mailto:vansh.lunagariya123@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/vansh-lunagariya-96b3632a0/)
- 🐙 [GitHub](https://github.com/Vansh-dev1)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
