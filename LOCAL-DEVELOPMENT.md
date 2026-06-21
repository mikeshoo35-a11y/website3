# Running the site locally

This project's website code lives in the **`6-code/`** folder. It is a [Next.js](https://nextjs.org) app (React + TypeScript + Tailwind).

---

## What you need first (one-time setup)

1. **Install Node.js** (the runtime that runs the site on your computer)
   - Download the **LTS** version from [https://nodejs.org](https://nodejs.org)
   - Run the installer and accept the defaults
   - Restart your terminal after installing

2. **Check that Node and npm are installed**

   Open a terminal (PowerShell or Command Prompt) and run:

   ```bash
   node --version
   npm --version
   ```

   Both commands should print version numbers (for example `v20.x.x` and `10.x.x`).

3. **Install project dependencies** (only needed the first time, or after pulling new changes)

   ```bash
   cd c:\projects\website3\6-code
   npm install
   ```

   This downloads the libraries listed in `package.json`. It may take a minute.

---

## How to run the site (development mode)

Development mode gives you a live preview on your machine. When you edit code, the page updates automatically.

1. Open a terminal.
2. Go to the code folder:

   ```bash
   cd c:\projects\website3\6-code
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Wait until you see something like:

   ```
   ▲ Next.js 16.x.x
   - Local:   http://localhost:3000
   ✓ Ready
   ```

5. Open your browser and go to:

   **http://localhost:3000**

   - Home page: `http://localhost:3000/`
   - About page: `http://localhost:3000/about`

6. **Leave this terminal open** while you work. The site only runs while `npm run dev` is running.

---

## How to stop the site

1. Click the terminal where `npm run dev` is running.
2. Press **`Ctrl + C`**.
3. Confirm with **`Y`** if Windows asks whether to terminate the batch job.

The site is now stopped. `http://localhost:3000` will no longer load until you run `npm run dev` again.

---

## Run a production-like build locally (optional)

This is closer to what visitors see on the live internet site.

```bash
cd c:\projects\website3\6-code
npm run build
npm start
```

Open **http://localhost:3000** again.

Stop it the same way: **`Ctrl + C`** in that terminal.

---

## Troubleshooting

| Problem | What to try |
|--------|-------------|
| `npm: command not found` | Install Node.js from [nodejs.org](https://nodejs.org) and restart the terminal |
| `Port 3000 is already in use` | Another dev server is already running — stop it with `Ctrl + C`, or close the other terminal |
| Page won't load after stopping | Run `npm run dev` again |
| Errors after `git pull` | Run `npm install` again in `6-code/`, then `npm run dev` |

---

# Deploying the site to the internet

The project is designed to be hosted on **[Vercel](https://vercel.com)** (see `3-arch/solution-strategy.md`, ADR-01). Vercel builds the site from your Git repository and serves it on a public URL.

## Option A — Deploy with Vercel (recommended)

### One-time setup

1. **Put the project on GitHub** (if it isn't already)
   - Create a repo on [https://github.com](https://github.com)
   - Push this project to that repo

2. **Create a Vercel account**
   - Sign up at [https://vercel.com](https://vercel.com) (GitHub login works well)

3. **Import the project**
   - In Vercel: **Add New → Project**
   - Select your GitHub repository
   - **Important:** set **Root Directory** to **`6-code`** (the Next.js app is not at the repo root)
   - Framework Preset should auto-detect **Next.js**
   - Click **Deploy**

4. Wait for the build to finish. Vercel gives you a URL like:

   `https://your-project-name.vercel.app`

### Updating the live site

After the first deploy, every push to your main branch triggers a new deploy automatically:

```bash
git add .
git commit -m "Describe your change"
git push
```

Vercel rebuilds and publishes the new version in a few minutes.

### Custom domain (optional)

In the Vercel project: **Settings → Domains** → add your domain (e.g. `aifriendlydocs.com`) and follow DNS instructions from your domain registrar.

---

## Option B — Deploy from your computer with Vercel CLI

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. From the app folder:

   ```bash
   cd c:\projects\website3\6-code
   vercel
   ```

3. Follow the prompts (log in, link project, confirm settings).
4. For production:

   ```bash
   vercel --prod
   ```

---

## What happens when you deploy

1. Vercel runs `npm install` and `npm run build` in `6-code/`
2. Next.js pre-renders pages (Home, About, 404) at build time
3. Static files are published to Vercel's CDN worldwide
4. Visitors open your public URL — no need to run `npm run dev` on your laptop

---

## Before going live (quality checklist)

From the project's architecture docs, recommended checks include:

- `npm run build` succeeds locally
- `npm run test` passes (unit + end-to-end tests)
- Lighthouse scores on `/` and `/about` meet project targets (see `3-arch/solution-strategy.md`, NFR-03)

---

## Need help?

- Next.js docs: [https://nextjs.org/docs](https://nextjs.org/docs)
- Vercel + Next.js: [https://vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)
- App-specific README: `6-code/README.md`

---

## Quick reference

| Action | Command | Where |
|--------|---------|--------|
| Install deps | `npm install` | `6-code/` |
| Run locally | `npm run dev` | `6-code/` → http://localhost:3000 |
| Stop | `Ctrl + C` | in the terminal running the server |
| Deploy | Connect repo to Vercel, root = `6-code` | vercel.com |
