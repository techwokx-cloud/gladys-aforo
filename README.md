# Gladys Aforo Foundation — Website & Dashboard

A Next.js 16 (App Router, TypeScript, Tailwind CSS v4) site for the Gladys Aforo Foundation, built
from the provided page designs. Includes a public marketing site, a Paystack-integrated donation
flow, and a password-protected admin dashboard.

## Pages

- `/` — Home
- `/about` — About / mission & vision
- `/programs` — NICU & PICU, Feed the Orphans, Health Awareness, Diapers for Babies
- `/gallery` — Photo gallery
- `/impact` — Stats & what donations provide
- `/leadership` — Board of Directors & Executive Staff
- `/contact` — Contact form + info (saved to the dashboard)
- `/donate` — Donation form (Paystack checkout)
- `/donate/thank-you` — Post-payment confirmation (verifies the transaction)
- `/dashboard` — Admin dashboard (overview, donations, messages) — password protected
- `/dashboard/login` — Admin login

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values, see below
npm run dev
```

Visit `http://localhost:3000`. The admin dashboard is at `/dashboard/login`
(default password `gladys2026` — **change this before deploying**, see below).

## Environment variables

Set these in `.env.local` for local development, and in your host's environment variable
settings (Render → your service → Environment) for production.

| Variable | Required | Description |
|---|---|---|
| `PAYSTACK_SECRET_KEY` | Recommended | Your Paystack **secret** key. Enables real checkout (card, Mobile Money, etc.) with custom amounts and recurring plans, and lets the dashboard track real payment status via webhook. If left blank, the Donate button redirects to your existing hosted payment page (`https://paystack.shop/pay/28h9yp9czt`) instead. |
| `PAYSTACK_PUBLIC_KEY` | Optional | Your Paystack public key (reserved for future client-side use). |
| `ADMIN_PASSWORD` | Yes | Password for `/dashboard`. Change from the default before deploying. |
| `ADMIN_SESSION_SECRET` | Yes | Random long string used to sign admin session cookies. Change from the default. |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Your deployed URL (e.g. `https://gladysaforo.onrender.com` or your custom domain). Used to build the Paystack callback URL and to verify transactions. |

Generate a strong session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Connecting real Paystack payments

1. In your Paystack dashboard (Settings → API Keys & Webhooks), copy your **live** (or test)
   secret key into `PAYSTACK_SECRET_KEY`.
2. Add a webhook in Paystack pointing to `https://YOUR_DOMAIN/api/paystack/webhook`. This keeps the
   dashboard's donation statuses accurate even if a donor closes their browser before returning.
3. Without a secret key configured, the site still works — the Donate form redirects to your
   existing Paystack payment page link, so you can deploy immediately and add keys later.

### About data storage

Donations and contact messages are stored in JSON files under `/data`. This is intentionally
simple so the project runs anywhere with zero setup. **On most hosts (including Render), the
filesystem is not guaranteed to persist across deploys/restarts unless you attach a disk.** For
production use, either:

- Attach a Render Persistent Disk mounted at `./data`, or
- Swap `src/lib/store.ts` for a real database (Postgres is a natural fit — Render can provision
  one for you).

## Deploying

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Gladys Aforo Foundation website"
git branch -M main
git remote add origin https://github.com/techwokx-cloud/gladys-aforo.git
git push -u origin main
```

### 2. Deploy on Render

1. In the Render dashboard, choose **New → Web Service** and connect the
   `techwokx-cloud/gladys-aforo` GitHub repo.
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Add the environment variables listed above under **Environment**.
5. (Recommended) Add a Persistent Disk mounted at `/opt/render/project/src/data` so donation and
   message records survive deploys.
6. Deploy. Once live, set `NEXT_PUBLIC_SITE_URL` to your Render URL (or custom domain) and
   redeploy so Paystack callback URLs are correct.

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- lucide-react icons
- Paystack Transactions API (with graceful fallback to a hosted payment link)
