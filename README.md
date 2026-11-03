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

## Security
- The production build (`npm run build`) gets a strict Content-Security-Policy meta tag from `vite.config.js` (it is skipped in `npm run dev` so hot-reload styles still work) (no inline scripts, only Google Fonts and the Google Maps embed are allowed from outside).
- `public/_headers` adds the headers a `<meta>` tag cannot set (frame-ancestors, HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP). Cloudflare and Netlify use it automatically; on Vercel/Apache/Nginx copy the same values into that host's config.
- The dealer / commercial enquiry form (page `#/dealers`, reached from the header "Dealers" button and the footer "DEALERS" links) sanitises and length-limits every field, checks the dropdown against an allow-list, has a honeypot field, a send cooldown and a captcha, and only opens a WhatsApp chat (`wa.me`) with the message pre-filled (nothing is posted to a server). The receiving number is `WA_NUMBER` at the top of `src/Dealers.jsx`. The captcha is checked in the browser, so it stops casual bots but is not a substitute for a server-side check.
- All external links use `rel="noopener noreferrer"`; the map iframe is sandboxed.
- Run `npm audit` before each deploy and keep dependencies updated. Always serve the site over HTTPS.
