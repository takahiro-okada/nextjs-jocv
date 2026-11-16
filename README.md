# JOCV Connect (Portfolio App)

This is a portfolio web application built with [Next.js](https://nextjs.org/), designed to share and connect the profiles of JICA Overseas Cooperation Volunteers (JOCV).

## Features

- Google account authentication
- Register and edit your profile (name, batch, country, SNS, etc.)
- Search and view other volunteers' profiles
- Post updates or thoughts (public/private)
- List volunteers by deployment country/region
- Responsive design
- Built with TypeScript, Tailwind CSS, Prisma, NextAuth.js

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Docker](https://www.docker.com/) (for local DB)

### Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/takahiro-okada/nextjs-jocv
   cd nextjs-jocv
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Copy `.env.example` to `.env` and set your environment variables.

4. Start the database (if using Docker):

   ```sh
   docker-compose up -d
   ```

5. Run database migrations:

   ```sh
   pnpm prisma migrate dev
   ```

6. Start the development server:

   ```sh
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/                # Next.js app directory (routes, pages, layouts)
components/         # Reusable React components
constants/          # App-wide constants
hooks/              # Custom React hooks
prisma/             # Prisma schema and DB client
public/             # Static assets
utils/              # Utility functions
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Run Prettier


## Cloudflare deployment

The app runs on Cloudflare Workers through OpenNext. The tracked `wrangler.jsonc` defines its Worker, assets and any custom domains. Install dependencies with `pnpm install --frozen-lockfile`, then run `pnpm run build:cloudflare` and `pnpm run deploy:cloudflare`. GitHub pushes to `main` use the same commands through Cloudflare Builds.

Configure environment values separately in Cloudflare Builds (build time) and Worker Secrets (runtime). Local `.env.production.local` and `.dev.vars` files are ignored. Use `wrangler secret bulk` with JSON on stdin to update runtime secrets. The configuration preserves existing runtime variables on deploy.

Prisma uses its JavaScript engine and PostgreSQL driver adapter. Clients are created per request and disconnected afterward so Workers do not reuse sockets across requests. No database schema migration is required.

Use the new public URL for `NEXTAUTH_URL`, `NEXT_PUBLIC_VERCEL_URL` and `NEXT_PUBLIC_API_URL`. Add `<new URL>/api/auth/callback/google` to the existing Google OAuth client redirect URIs. The original database project is currently unavailable to the connected Supabase organization; database recovery has been deferred.
