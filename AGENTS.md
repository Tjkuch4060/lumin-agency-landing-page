# Repository Guidelines

## Project Structure & Module Organization
Core React/Vite source sits at the repository root. `index.tsx` mounts the app defined in `App.tsx`, while page sections live in `components/`. Shared primitives (buttons, cards, skeleton loaders) belong in `components/ui/`. Tests reside in `tests/` with global setup in `tests/setup.ts` and smoke specs in `tests/smoke/`. Use the `@/` alias from `vite.config.ts` for root-relative imports and keep assets next to the components that use them.

## Build, Test & Development Commands
- `npm run dev`: launch the hot-reloading dev server.
- `npm run build`: emit an optimized bundle in `dist/`.
- `npm run preview`: serve the built output for sign-off.
- `npm run lint` / `npm run lint:fix`: check or auto-fix ESLint issues across `.ts`/`.tsx`.
- `npm run format` / `npm run format:write`: confirm or apply Prettier formatting.
- `npm run test`, `npm run test:watch`, `npm run test:coverage`: run Vitest once, in watch mode, or with coverage reports.

## Coding Style & Naming Conventions
Favor TypeScript functional components and hooks. Trust Prettier defaults (2-space indentation, double quotes, semicolons) and keep imports ordered from external to local. Name components and files in PascalCase (`StatsSection.tsx`), hooks in `useCamelCase`, and utilities in `camelCase.ts`. Reach for `@/` only when a relative path would be ambiguous.

## Testing Guidelines
Vitest with Testing Library validates UI behavior. Place new specs beside existing smoke tests, using the `.test.tsx` suffix and assertions from `@testing-library/jest-dom`. Stub network calls or timers to keep tests deterministic. Use `npm run test:coverage` to review v8 coverage output and ensure new flows are exercised before merging.

## Commit & Pull Request Guidelines
Write focused commits with imperative subjects under 72 characters (e.g., `Add ROI calculator animation`). Reference related issues in the body and document user-facing changes. Pull requests should include: a short summary, screenshots or clips for UI changes, test evidence (`npm run test` output or coverage notes), and any configuration or dependency callouts. Request a review only after automated checks pass and feedback is resolved.

## Environment & Configuration
Create `.env.local` (gitignored) and supply `GEMINI_API_KEY=<your key>` so Vite can expose it through `process.env`. Rotate keys outside of git and record new settings in `README.md` plus `vite.config.ts`. When adding configuration, prefer `loadEnv` for consistency and document sensible defaults.
