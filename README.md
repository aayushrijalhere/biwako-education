# Biwako Education Consultancy – React Website

Modern, high-converting single-page website for a luxury study-in-Japan education consultancy.

## Tech Stack
- React 18
- Vite
- Pure CSS (no Tailwind / UI libraries)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Then open the local URL shown in the terminal (usually http://localhost:5173).

## Project Structure

```
biwako-react/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx          ← All components live here
│   └── index.css        ← Global styles
└── README.md
```

## Features
- Responsive, mobile-first design
- Hero with lead form
- Services, process, results, testimonials, FAQ
- Dual booking forms (hero + bottom)
- Floating WhatsApp & Call buttons
- Smooth scroll navigation
- Interactive FAQ accordion
- Controlled React forms

## Customisation
- Update phone / WhatsApp numbers in `App.jsx`
- Change colours in `src/index.css` (`:root` variables)
- Add real form backend (Formspree, Netlify Forms, or your own API)
