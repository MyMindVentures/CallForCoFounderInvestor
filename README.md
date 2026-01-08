<p align="center">
  <img src="assets/readme.svg" alt="Call for Support — Full README" width="100%">
</p>

---

# Call for Support  
**Two partners. One turnaround. Proof, not promises.**

🌕 **Deadline:** **Sunday, 1 February 2026 — 23:09 (MEZ)**  
🔒 **NDA-first**  
👤 **Solo developer only**  
🌍 **NL / EN**

---

## Executive summary

This repository documents a **real, time-bound turnaround effort**.

I am looking for **exactly two people**:
1. **One Financial Support Partner**
2. **One Solo Developer / Mentor (AI-native)**

Together, we ship **two proof apps** before the deadline — not perfect, but **complete, showable, and real**.

This README contains:
- the full story  
- the deal structure  
- the app architecture  
- userflows  
- and the plan to the deadline  

No hype. No shortcuts. Only execution.

---

## The story (context)

For months, I pushed myself to the limit trying to make my ideas tangible.

I did not underestimate app building.
I respected it — and paid the price.

What accumulated:
- Chats full of app ideas and feature concepts  
- Raindrops full of tutorials and research  
- 90+ repositories with broken or unfinished code  
- Scattered data, notes, and experiments  

What was missing was **not motivation**, but:
- structure  
- guidance  
- breathing room  

Financial pressure + lack of an execution bridge led to mental exhaustion.

What can save this situation now is **visible result**.

---

## My real talent

My strength is **architectural thinking**:
- app concepts  
- feature systems  
- flows and extensions  
- fast, deep ideation  

Brainstorming with AI makes this **exponential**.

I am the **architect**.

What I need is the **bridge**:
> from blueprint → shipped product

---

## Positioning (what this is NOT)

This is **not**:
- a “get rich quick” idea  
- an “AI will build everything” fantasy  
- a beginner underestimating complexity  

I’ve already paid the cost — financially and mentally.

This is a **serious collaboration request**, with:
- written agreements  
- transparency  
- trust as a baseline  

---

## The symbolic quartet

The leverage happens when four forces align:

- **Me** — vision, ideation, architecture  
- **Solo developer** — execution + mentorship  
- **Financial partner** — focus and stability  
- **AI** — acceleration and leverage  

Together, this turns chaos into compounding output.

---

## The deal

### Role 1 — Financial Support Partner

Purpose: **temporary financial breathing room** → long-term upside.

What you receive:
- **20% lifetime share** on every app I bring to market  
  (net revenue defined in writing)
- **Transparent revenue dashboard**
- Optional repayment-first structure
- NDA + written agreement (optionally JV)

This is **not investment advice** and comes with **no guaranteed returns**.

---

### Role 2 — Solo Developer / Mentor

I am explicitly **not** looking for a team or agency.

I’m looking for **one trusted solo developer** who:
- is AI-native  
- understands agentic workflows  
- works with MCP concepts  
- builds with n8n workflows  
- enjoys vibe coding  

The goal is **mentorship → independence**.

What you receive:
- **Revenue split per app** we actively build together  
- Clear scope, written agreement  
- Long-term collaboration if alignment is strong  

---

## Two apps = proof

I do not need ten apps.

I need **two**.

### 1) Lifemanagement stack
Minimal workflows to:
- regain structure  
- reduce mental load  
- stabilize daily execution  

Without this, everything becomes monnikenwerk.

---

### 2) IdeaFabric
A portable ideas system (Expo-based):
- capture ideas anywhere  
- structure and iterate  
- centralize docs, chats, tutorials  
- turn chaos into a **data vault**

This is the compounding engine.

---

## Call for Support app (this repo)

### Purpose
A mobile-first funnel that:
- communicates the story clearly  
- filters noise  
- enforces NDA-first  
- selects exactly two partners  

---

### Structure & routes

---

### Recommended stack

- **Frontend:** Next.js or Vite + Tailwind  
- **Backend:** Supabase  
- **Automation:** n8n workflows  
- **Payments:** Wise (now), Stripe (later)  

---

## Userflows

### Developer flow
- Landing → Roles → Developer  
- NDA → Apply  
- Shortlist → Call  
- Written agreement → Ship  

---

### Finance flow
- Landing → Roles → Finance  
- NDA → Apply  
- Optional Wise support  
- Agreement → Dashboard access  

[![Email](https://img.shields.io/badge/📧_hello@mymindventures.io-EA4335?style=for-the-badge)](mailto:hello@mymindventures.io)
[![WhatsApp](https://img.shields.io/badge/💬_WhatsApp_(NL_+_EN)-25D366?style=for-the-badge)](https://wa.me/34643037346)

### Non-negotiables
- Solo developer only  
- NDA before details  
- Respect, empathy, trust  
- MVP first, features later  

---

## Deadline plan

🌕 **Sunday, 1 February 2026 — 23:09 (MEZ)**  
(Full Moon / Snow Moon — culmination, not beginning)

### Definition of Done
Not perfect. **Complete. Showable. Closed.**

- Support app live  
- IdeaFabric v1 demo-ready  
- Lifemanagement v1 operational  

---

### Phases
1. **Stabilize** — lock scope, stop tool-hopping  
2. **Define MVP** — clear “done”  
3. **Build** — daily visible output  
4. **Close** — freeze, test, demo  

---

## Legal & transparency

- This is **not investment advice**
- No guaranteed returns
- All revenue shares defined in writing
- NDA required before sensitive details

---

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
- Check that all dependencies are in `package.json`
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

---

## Final note

I’m not asking to be saved.  
I’m asking to **collaborate**.

My brain is not a liability — it’s a lever,  
**if structured correctly**.

If you are a:
- Financial Support Partner  
- or a Solo Developer / Mentor  

and you value clarity, trust, and building something real:

**This is the moment.**

🌕 **Deadline: 1 February 2026 — 23:09 (MEZ)**  
Complete. Showable. Closed.