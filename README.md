# DSA Web (frontend)
`npm install && npm run dev`

- `src/data/content.js` – all copy and data in one place (swap for API calls later)
- `src/components/` – one file per section; `src/hooks/` – reusable hooks
- `src/styles/tokens.css` – palette and fonts sampled from the DSA seal
- Next: add react-router for /societies, /events, /portal and connect the DSA-MIS API.

## Routes
/ , /societies , /societies/:slug , /events , /services
Deploying: configure the host to fall back to index.html for unknown paths (SPA).
Colours: edit the variables in `src/styles/tokens.css` (single theme, sampled from the DSA seal).

## Admin (/admin)
Not linked from the public site. Demo login: `admin` / `dsa-admin-2026` (see `src/admin/config.js`).
Data is kept in the browser (`src/admin/store.jsx`) and login is front-end only: replace `login()` in
`src/admin/auth.jsx` and the actions in `store.jsx` with real API calls before storing real student data.
