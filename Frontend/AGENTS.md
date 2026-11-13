# Frontend workflow

- Run `npm run dev -- --host 127.0.0.1` for the local Vite server.
- Verify changes with `npm run build` and `npm run lint`.
- Collection categories and product descriptions live in `src/data/collections.js`; product images live in `public/Collections/`. Keep image filenames and case intact.
- The contact form currently uses local submitted state only; it is not connected to an enquiry delivery service.
- The scroll sequence before Collections uses naturally sorted images from `public/ScrollFrames/`. Original supplied frames 046–092 were absent; serialization preserves the supplied order, not missing animation content.
