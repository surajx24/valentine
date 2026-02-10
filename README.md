# Site – React + Vite

A React app powered by [Vite](https://vite.dev/). Responsive and works on iPhone and other devices.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to GitHub (public page)

Repo: [github.com/surajx24/valentine](https://github.com/surajx24/valentine)

1. **Push this project** (from the project folder):

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/surajx24/valentine.git
   git push -u origin main
   ```

2. **Turn on GitHub Pages**
   - Repo → **Settings** → **Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.

3. **Trigger a deploy**
   - The **Deploy to GitHub Pages** workflow runs on every push to `main`.
   - Or run it manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

4. **Live site:** [https://surajx24.github.io/valentine/](https://surajx24.github.io/valentine/)

The workflow builds with base path `/valentine/`, so the app works at that URL.

## Scripts

- **`npm run dev`** – Dev server with hot reload
- **`npm run build`** – Production build (output in `dist/`)
- **`npm run preview`** – Preview production build locally

## Responsive / iPhone

- Layout and typography scale for small screens.
- Safe area insets are used so content isn’t hidden by the notch or home indicator.
- Buttons use at least 44px height for touch.
- No horizontal scrolling; images and text stay within the viewport.
