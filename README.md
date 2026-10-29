# Jayakrishna Flour Mills website (React + Vite)

## Run locally
    npm install
    npm run dev

## Build
    npm run build      # output goes to /dist

## Deploy (pick one)
- **Netlify**: push to GitHub, "Add new site > Import", build command `npm run build`, publish directory `dist`.
- **Vercel**: import the repo; the Vite preset is detected automatically.
- **GitHub Pages**: `npm run build`, then publish the `dist` folder (for example with the `gh-pages` package).
- **Any host / cPanel**: upload the contents of `dist` to the web root.

## Edit content
All text and image links are at the top of `src/App.jsx`.
To use your own photos, put them in `public/images/` and set the `img` fields to `images/your-file.jpg`.
