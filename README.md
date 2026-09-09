# Miskolci Csendháborítás

Official website for the **Miskolci Csendháborítás** music festival. Built with Next.js (App Router) and powered by Sanity as a headless CMS.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 |
| Styling | Tailwind CSS 4 · tailwindcss-animate · clsx + tailwind-merge + CVA |
| CMS | Sanity (`next-sanity`) |
| Carousel | embla-carousel-react |
| Icons | lucide-react |
| Analytics | @vercel/analytics + @vercel/speed-insights |
| Deploy | Vercel |

See [PLAN.md](PLAN.md) for the design and content plan.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Routes

| Route | Description |
|---|---|
| `/` | Kezdőlap (home) |
| `/program` | Program |
| `/helyszin` | Helyszín (venue) |
| `/fellepok/[slug]` | Fellépők — individual band page |
| `/hazirend` | Házirend (house rules) |
| `/tamogatok` | Támogatók (sponsors) |
| `/kapcsolat` | Kapcsolat (contact) |

## Project structure

```
app/                 Next.js App Router routes + API endpoints
src/components/       Layout, section, and UI components
src/lib/              Data helpers and Sanity client/queries
src/sanity/schemas/   Sanity content schemas (event, band)
src/config/           Colors, fonts, and layout tokens
```

## Content management

Content is authored in Sanity. On publish, the `/api/revalidate` webhook triggers
on-demand revalidation of the affected pages.

## Deployment

Deployed on [Vercel](https://vercel.com). Pushing to the default branch triggers a
production deploy.
