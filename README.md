# Shaathveegaa's portfolio

A responsive, self-contained static portfolio with a locally served Three.js core. No build step or package installation is needed.

## Run

From this directory run `node serve.mjs`, then open `http://127.0.0.1:5173`.
Deploy the contents of `dist/` to a static host. The development server binds to loopback only.

## Content

Edit `dist/data.js` for skills, interests, projects, and contact information. Profile links, portrait, CV and contact endpoint are empty until verified information is supplied. Project slots are explicitly placeholders, not completed project claims. The current case study presentation labels missing details honestly.

Set `profile.contactEndpoint` to an HTTPS endpoint accepting JSON `{name,email,subject,message}`. A successful HTTP response is treated as delivery confirmation, so the endpoint must only return success after accepting the message. Implement validation, rate limiting and spam protection on that service. Without an endpoint the form validates locally and clearly says nothing was sent.

## Files

- `dist/index.html`: hero, navigation, document metadata
- `dist/app.js`: sections and interface interactions
- `dist/styles.css`: responsive presentation and motion
- `dist/core.js`: optimized 3D scene, visibility controls and WebGL fallback
- `dist/data.js`: editable content
- `dist/vendor/`: pinned Three.js 0.180.0 modules

The Motion control and OS reduced-motion preference pause animation. The scene also pauses when off-screen or in a hidden tab. The terminal executes only predefined responses and never system commands. Missing links are disabled. Fonts fall back to local sans-serif when Google Fonts is unavailable.
