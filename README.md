# User Authentication + Dashboard Website (`user-auth11092026`)

A modern, high-performance, fully responsive **User Authentication & Dashboard Portal** built strictly with **HTML5, CSS3, and Vanilla JavaScript** — without React, Tailwind CSS, Bootstrap, or any external framework dependencies.

---

## 🚀 Live Demo & Credentials

The portal is secured by a client-side authentication gateway. Use the credentials below to log in:

| Field | Value |
| :--- | :--- |
| **Username** | `admin` |
| **Password** | `Abc@2026` |

---

## 📂 Project Structure

```text
user-auth11092026/
│
├── index.html          # Authentication page (login portal)
├── dashboard.html      # Protected operational dashboard
│
├── css/
│   └── style.css       # Design system, glassmorphism, & responsive media queries
│
├── js/
│   └── script.js       # Auth validation, session guard, scrollspy, & form logic
│
└── README.md           # Documentation and setup instructions
```

---

## ✨ Key Features

### 1. Authentication Portal (`index.html`)
- **Branded Design**: Glassmorphic card styling with luminous gradient accents.
- **Client-Side Auth**: Compares inputs against `admin` / `Abc@2026`.
- **Show/Hide Password**: SVG icon toggle between masked and plaintext input.
- **Validation Feedback**: Dynamic error banner with shake animation on invalid credentials or empty fields.
- **Loading Transition**: Interactive spinner state on submission before smooth transition to the dashboard.
- **Route Bypass**: Automatically forwards to `dashboard.html` if the user is already authenticated in `sessionStorage`.

### 2. Protected Dashboard (`dashboard.html`)
- **Session Route Guard**: Redirects unauthenticated visitors immediately back to `index.html`.
- **Sticky Glassmorphic Header**:
  - Menu items: **HOME**, **ABOUT US**, **CATEGEORY**, **CONTACT**.
  - `HOME` is active on initial load.
  - Smooth scrolling to corresponding sections.
  - Active indicator automatically syncs during scrolling via `IntersectionObserver`.
  - User status badge (`admin`) and **Logout** button.
- **Hero Section**:
  - Left: Welcome badge, bold headline, platform description, primary & secondary CTAs.
  - Right: **100% Pure HTML + CSS Graphical Mockup** featuring floating KPI status cards, live metrics, and weekly activity visualization (no external image assets).
- **About Us Section**:
  - 4 high-impact feature cards (*Secure Authentication*, *Simple Dashboard*, *Responsive Design*, *Fast Performance*) with SVG icons and hover lift effects.
- **CATEGEORY Section**:
  - 6 modular category cards (*Security & Governance*, *Analytics & Reports*, *Cloud Infrastructure*, *User Management*, *API Integrations*, *Automation Workflows*).
  - Responsive layout: multi-column desktop grid, 2-column tablet layout, 1-column mobile view.
- **Contact Section**:
  - Direct contact information (Email, Phone, Headquarters).
  - Form with client-side validation (Full Name, Work Email regex, Message length) and in-place success confirmation.
- **Footer**:
  - Brand overview, navigation links, social channel buttons, and exact copyright: `© 2026 User Auth Dashboard. All Rights Reserved.`.

### 3. Responsive & Accessible Design
- **Mobile Navigation Drawer**: Accessible hamburger button with animated transition and slide-in drawer.
- **Keyboard Navigation**: Native tab order, focus rings, and `Escape` key drawer dismiss.
- **Zero Framework Overhead**: Lightweight, ultra-fast 60 FPS animations with zero layout shift.

---

## 🛠️ Local Development & Testing

You can run the project locally with any static web server:

### Python 3
```bash
cd user-auth11092026
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Node.js (`npx serve`)
```bash
cd user-auth11092026
npx serve .
```

---

## 📦 Git Setup & Deployment

### 1. Initialize Git Repository
```bash
cd user-auth11092026
git init
git add .
git commit -m "feat: Initial commit for user-auth11092026 authentication and dashboard"
```

### 2. Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/user-auth11092026.git
git push -u origin main
```

### 3. Deploy to Vercel / GitHub Pages
- **Vercel**: Run `npx vercel` or link your GitHub repository to Vercel. Static deployment happens automatically.
- **GitHub Pages**: Go to repository **Settings** → **Pages** → Select `main` branch root `/` and Save.

---

## 📜 License

&copy; 2026 User Auth Dashboard. All Rights Reserved.
