## Copilot / AI Assistant Instructions for Melad-Website

Short, actionable guidance so an AI can be productive in this repo immediately.

- Project tech: Next.js (App Router, Next v15), React 19, TypeScript, Tailwind CSS, Mongoose (MongoDB). See `package.json`.
- Package manager: pnpm is used in this workspace (there is a `pnpm-lock.yaml`) — prefer `pnpm` when suggesting install/run commands (e.g. `pnpm dev`).

Key files & structure (what to read first):
- `app/` — Next.js App Router pages, `layout.tsx` is the root layout and wraps pages with `Providers` and `ClientLayout`.
- `components/` — UI components; `components/ui/` contains low-level primitives (Radix + wrappers). Use these for consistent design patterns.
- `contexts/` — e.g. `contexts/cart-context.tsx` (cart state and methods). Many components import context via `@/contexts/*`.
- `lib/` — server utilities such as `mongodb.ts`, `auth.ts`, `get-server-session.ts` (DB + auth helpers used by API routes).
- `models/` — Mongoose schemas (e.g. `Product`, `Order`, `User`). Follow existing schema shapes when creating or updating data.
- `app/api/` — Next.js route handlers (server routes). Use these instead of legacy `pages/api` (App Router route handlers with `route.ts`).

Important conventions and patterns (avoid suggesting contrary changes):
- Use the TypeScript path alias `@/*` for imports (configured in `tsconfig.json`). Example: `import { useCart } from '@/contexts/cart-context'`.
- Client vs Server: components that run in the browser include the `"use client"` directive at the top (see `components/add-to-cart-button.tsx`). Server code (API route handlers, `lib/` helpers that access DB) should be written without `"use client"`.
- Local cart handling: the codebase uses a Cart context + `localStorage` and a custom `cartUpdated` window event for cross-tab updates (see `components/add-to-cart-button.tsx` and `contexts/cart-context.tsx`). When modifying cart behavior, update both context and localStorage patterns.
- UI primitives: reuse `components/ui/*` controls (Button, Input, Dialog) rather than inventing new class names — this keeps styling consistent.
- Mongoose + Next: interact with DB through `lib/mongodb.ts` and models in `models/`. Keep DB calls in server-side code (API routes or server components) and return JSON-friendly objects.

Build & run (developer workflows):
- Install: `pnpm install` (or fallback `npm install` if pnpm unavailable). Repo contains `pnpm-lock.yaml`.
- Dev: `pnpm dev` → runs `next dev` (default Next dev server).
- Build: `pnpm build` then `pnpm start` for production.
- Lint: `pnpm lint` runs `next lint`.

Project-specific caveats for edits and PRs:
- `next.config.mjs` disables TypeScript and ESLint build-time errors (`ignoreDuringBuilds` / `ignoreBuildErrors`) — the repo may intentionally allow some type/ESLint issues. Still, prefer fixes that keep types sound.
- Image handling: `images.unoptimized = true` in `next.config.mjs`; don't assume Next image optimization on CI.
- Keep imports aligned with the `@/` alias and avoid relative import churn.

Examples (copyable patterns):
- Import a component or context:
  - `import Header from '@/components/header'`
  - `import { addItem } from '@/contexts/cart-context'`
- Create a new API route (App Router style):
  - add `app/api/your-route/route.ts` exporting HTTP handlers (GET/POST) that use `lib/mongodb.ts` and `models/*`.

When changing data models or API contracts:
- Update the corresponding Mongoose model in `models/` and any API responses in `app/api/*`.
- Update `components/` that render that data (search repository for references to the model name).

Testing / verification guidance for the AI:
- There are no automated tests in the repo; validate changes by running `pnpm dev` and manually testing critical flows: auth, cart add/remove, API endpoints under `app/api/`.
- Quick sanity checks: server logs, browser console (cart events/logs), and Mongo connection in `lib/mongodb.ts`.

If you need to change global styles or tokens:
- Edit `app/globals.css` and Tailwind config (`tailwind.config.ts`). Prefer utility-first classes already present rather than large new CSS files.

Follow-ups: if anything referenced above is missing or unclear (e.g., the intended DB connection URI location or where environment vars are loaded), ask the maintainers and point to `lib/mongodb.ts` and `next.config.mjs` as the primary places to check.

End of instructions — ask for clarification if you need specific routing, data-shape, or deployment details.
