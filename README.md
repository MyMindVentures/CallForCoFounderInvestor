<div align="center">

# Call for Co-Founder & Investor

### Two partners. One turnaround. Let's flip the snowball.

<br />

![Call for Co-Founder & Investor](docs/readme.svg)

<br />

[![Made with Passion](https://img.shields.io/badge/Made%20with-Passion%20%E2%9D%A4%EF%B8%8F-ff6b6b?style=for-the-badge)](https://github.com/MyMindVentures/CallForCoFounderInvestor)
[![Looking for Partners](https://img.shields.io/badge/Looking%20for-Partners-00b894?style=for-the-badge)](https://github.com/MyMindVentures/CallForCoFounderInvestor)
[![Open Source](https://img.shields.io/badge/Open%20Source-Open%20Hearts-9b59b6?style=for-the-badge)](https://github.com/MyMindVentures/CallForCoFounderInvestor)

<br />

**React** · **Node.js** · **SQLite** · **Tailwind CSS** · **Framer Motion**

<br />

---

<br />

</div>

## The Story Behind This

> *"For months I've been trapped in a tooling loop — fighting through tutorials, broken builds, and endless learning curves. I'm an inventor at heart, not lacking in capability or vision, but lacking the bridge to turn ideas into shipped products."*

I'm **Kevin De Vlieger**, a 41-year-old Belgian now living in sunny **Alicante, Spain**. This project exists because I refuse to let another year pass without proof that my mind can create something real.

<br />

<div align="center">

### The Negative Snowball

~~stress → fear → delays → debt~~

### ⬇️ Flips To ⬇️

### The Positive Snowball

**structure → shipping → proof → compounding**

</div>

<br />

---

<br />

## What I'm Looking For

<table>
<tr>
<td width="50%" valign="top">

### 💰 Financial Support Partner

**Temporary support now. Long-term upside later.**

- Lifetime 20% revenue share (net)
- Transparent revenue dashboard
- NDA + written agreement
- You're funding proof, not charity

</td>
<td width="50%" valign="top">

### 👨‍💻 Solo Developer / Mentor

**Be the bridge from architect to shipped product.**

- Revenue split per project
- Daily short check-ins
- AI-native builder (Cursor, n8n, MCP)
- Goal: Make me independent

</td>
</tr>
</table>

<br />

---

<br />

## The Quartet

<div align="center">

The magic happens when four forces align:

<br />

| 🧠 **Architect** | 🛠️ **Builder** | 💰 **Investor** | 🤖 **AI** |
|:---:|:---:|:---:|:---:|
| Me — Ideas, vision, features | You — Ship, mentor, teach | Breathing room | Leverage & speed |

<br />

**Structure turns it into results.**

</div>

<br />

---

<br />

## Two Apps Change Everything

I don't need ten apps. I need **two shipped apps** to show proof:

<table>
<tr>
<td width="50%" align="center">
<br />

**🧬 Lifemanagement Stack**

*My life back on rails*

<br />
</td>
<td width="50%" align="center">
<br />

**💡 IdeaFabric**

*Portable idea blueprint machine*

<br />
</td>
</tr>
</table>

<br />

---

<br />

## My Give Away

I was always scared of idea stealing. But months of struggling alone taught me: **ideas without execution are just dreams.**

So this is my gift:
- This project and its source code
- A mindmap for an app that helps shape ideas (frontend + n8n backend)
- 90+ repos full of attempts and learnings
- Everything I've documented along the way

**If you believe, these are yours to build with me.**

<br />

---

<br />

## Architecture & Showcase

The system architecture below is rendered from Mermaid and refreshed by GitHub Actions after each successful merge to `main`.

![Architecture diagram](docs/architecture.svg)

<br />

---

<br />

<div align="center">

## 💚 Support This Journey

If you'd like to help make this vision a reality:

<br />

[![Donate via Wise](https://img.shields.io/badge/💳_Donate_via_Wise-00B9FF?style=for-the-badge&logoColor=white)](https://wise.com/pay/me/kevind469)

<br />

**Or simply reach out:**

<br />

[![Email](https://img.shields.io/badge/📧_hello@mymindventures.io-EA4335?style=for-the-badge)](mailto:hello@mymindventures.io)
[![WhatsApp](https://img.shields.io/badge/💬_WhatsApp_(NL_+_EN)-25D366?style=for-the-badge)](https://wa.me/34643037346)

<br />

---

<br />

## How You Can Help

| Action | Impact |
|:---:|:---|
| ⭐ **Star** | Help others discover this project |
| 🍴 **Fork** | Take the code, improve it, make it your own |
| 💬 **Reach out** | Sometimes a conversation sparks great things |
| 🤝 **Partner** | Become the co-founder or investor I'm looking for |

<br />

---

<br />

## A Promise

> *"If you believe in me, I will work tirelessly to prove you right. Together, we can flip the snowball from negative to positive."*

<br />

**— Kevin**

<br />

---

<br />

## 🚀 Production Deployment

### Prerequisites

- Node.js 20.19.0+ (specified in `.nvmrc`)
- Railway account ([sign up](https://railway.app))
- GitHub repository connected to Railway

### Railway Deployment Steps

1. **Connect Repository**
   - Log in to [Railway](https://railway.app)
   - Click **"New Project"** → **"Deploy from GitHub repo"**
   - Select your repository: `MyMindVentures/CallForCoFounderInvestor`
   - Railway automatically detects the monorepo structure

2. **Configure Build Settings**
   - Railway reads `.nvmrc` for Node version (20.19.0)
   - **Build Command:** `npm run build`
     - This builds the frontend to `apps/frontend/dist`
   - **Start Command:** `npm start --workspace=backend`
     - This starts the Express server that serves both API and static files

3. **Set Environment Variables**
   
   In Railway dashboard → **Variables** tab, add all required variables:

   | Variable | Description | Required | Example |
   |---------|-------------|----------|---------|
   | `NODE_ENV` | Environment mode | Yes | `production` |
   | `PORT` | Server port | No | `3000` (Railway sets this automatically) |
   | `JWT_SECRET` | Secret for JWT tokens | Yes | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
   | `ADMIN_USERNAME` | Admin login username | Yes | `admin` |
   | `ADMIN_PASSWORD` | Admin login password | Yes | Use a strong password |
   | `EMAIL_HOST` | SMTP server host | Yes | `smtp.gmail.com` |
   | `EMAIL_PORT` | SMTP server port | Yes | `587` |
   | `EMAIL_USER` | SMTP username | Yes | `your-email@gmail.com` |
   | `EMAIL_PASS` | SMTP password (Gmail App Password) | Yes | Generate from Google Account |
   | `EMAIL_FROM` | Email sender address | Yes | `your-email@gmail.com` |
   | `WISE_PAYMENT_URL` | Wise payment link | Yes | `https://wise.com/pay/your-link` |
   | `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | From Cloudinary dashboard |
   | `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | From Cloudinary dashboard |
   | `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | From Cloudinary dashboard |

   **Important Security Notes:**
   - Generate a strong `JWT_SECRET` (minimum 32 characters)
   - For Gmail: Enable 2-Step Verification and generate an App Password
   - Never commit sensitive values to git

4. **Deploy**
   - Railway automatically runs the build and starts the server
   - The backend serves:
     - API routes at `/api/*`
     - Static frontend files from `apps/frontend/dist`
     - React Router routes via `index.html` for non-API routes

### How It Works

- **Build Process:** `npm run build` compiles the React frontend to `apps/frontend/dist`
- **Production Mode:** When `NODE_ENV=production`, the backend (`apps/backend/server.js`) serves static files from `apps/frontend/dist`
- **Database:** SQLite database is created automatically in the `data/` directory (persistent on Railway)
- **Single Service:** One Railway service runs both frontend (static) and backend (API)

### Troubleshooting

**Build Fails:**
- Verify Node.js version matches `.nvmrc` (20.19.0)
- Check that all dependencies are in `package.json` (see `DEPENDENCY_REVIEW.md`)
- Review build logs in Railway dashboard

**Frontend Not Loading:**
- Ensure `npm run build` completed successfully
- Verify `apps/frontend/dist` directory exists after build
- Check that `NODE_ENV=production` is set

**API Routes Not Working:**
- Verify CORS is configured (already set in `apps/backend/server.js`)
- Check environment variables are set correctly
- Review Railway logs for API errors

**Database Issues:**
- Ensure `data/` directory is writable (Railway provides persistent storage)
- Check Railway logs for database connection errors
- Verify SQLite file permissions

**Environment Variables Not Loading:**
- Ensure all required variables are set in Railway dashboard
- Check variable names match exactly (case-sensitive)
- Restart the service after adding new variables

### Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- See `apps/backend/env.example` for complete environment variable reference

---

<br />

<sub>

**Tech Stack:** React + Vite · Node.js + Express · SQLite · Tailwind CSS · Framer Motion · JWT Auth

**Quick Start:** `npm install` → `npm run dev` → Visit `localhost:5173`

</sub>

</div>
