# Plena website

Launch storefront for Plena: one freshly cooked dish per workday in Luxembourg, dropped before noon at offices, gyms and cafés.

Plain static site, no build step. Open `index.html`, or serve the folder (`python3 -m http.server`). Vercel deploys it as is.

- `index.html`: page structure
- `css/styles.css`: the cut-paper, 1950s travel-poster look (phone first)
- `js/data.js`: dishes, two-week rotation, prices, pick-up points and all copy in French and English
- `js/posters.js`: poster art for each dish, the hero and the dish card, drawn as SVG
- `js/app.js`: week board, cut-off countdown, price ladder, basket and demo checkout

Checkout is a demo: nothing is sent, stored on a server or charged. See `CLAIMS.md` for every claim and placeholder to settle before launch.
