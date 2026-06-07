# Snakepit.dev

Static staging-ready site for Snakepit, an AI Operations command center focused on token burn cleanup, local-first model routing, agent governance, and workflow rescue.

## What is included

- Brand system and logo assets
- Static landing page deployable anywhere
- Generative UI-style AI Ops Control Map
- Token Burn Simulator
- AI Maturity Assessment
- GitHub Pages / GoDaddy deployment notes

## Run locally

```bash
cd snakepit-dev
python3 -m http.server 5173
```

Open `http://localhost:5173`.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial Snakepit.dev staging site"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/snakepit-dev.git
git push -u origin main
```

## Deploy options

### Option A: GitHub Pages staging

Use GitHub Pages with the root directory on the `main` branch. The `CNAME` file is already set to `snakepit.dev`; remove it if using a temporary staging URL first.

### Option B: GoDaddy hosting

Upload the contents of this folder to the public web root for `snakepit.dev`. Because this is static HTML/CSS/JS, no build step is required.

## Edit contact path

Search for `hello@snakepit.dev` in `index.html` and `src/app.js`, then replace it with the live contact address or booking link.
