# AI Friendly Docs — marketing site

Static marketing website for the **AI Friendly Docs** methodology: Home and About pages in a shared shell, built with Next.js and deployed on Vercel.

## Repository layout

| Folder | Contents |
|--------|----------|
| `1-scope/` | Stakeholders, goals, glossary, features inventory |
| `2-features/` | Feature specifications (F01–F04) |
| `3-arch/` | Solution strategy, building blocks, runtime views |
| `4-design/` | Design strategy, mockups, user journeys |
| `5-dev/` | Backlog, traceability, testing plan |
| `6-code/` | **Next.js application** (the live site) |

Product documentation lives in the numbered folders; the runnable app is in `6-code/`.

## Run locally

Requires [Node.js LTS](https://nodejs.org).

```bash
cd 6-code
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production-like build:

```bash
npm run build
npm start
```

Run tests:

```bash
npm test
```

## Deploy

Host on [Vercel](https://vercel.com) and connect this repository. Set **Root Directory** to `6-code`. Vercel runs `npm run build` and serves pre-rendered static pages from the CDN.

Pushes to `main` trigger automatic redeploys.

## Site routes

- `/` — Home (hero, benefits, how it works)
- `/about` — About the methodology and site owner
- Custom 404 page

## License

Documentation and site code are published in this repository; add a license file here if you intend to define reuse terms.
