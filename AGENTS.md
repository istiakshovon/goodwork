<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project shape

Single Next.js 16 App Router app (not a monorepo). Source lives in `src/`; the path alias `@/*` maps to `./src/*`. Entrypoints: `src/app/layout.tsx`, `src/app/page.tsx`. Package manager is **npm** (`package-lock.json`); don't introduce pnpm/yarn/bun lockfiles.

## Commands

- Dev server: `npm run dev` (Turbopack; also regenerates the `nextjs-agent-rules` block above)
- Lint: `npm run lint` (runs bare `eslint` with the flat config in `eslint.config.mjs`)
- Typecheck: `npx tsc --noEmit` — there is no `typecheck` script
- There are **no tests, no CI workflows, and no formatter config**; don't invent test commands.
- Verify with: `npm run lint` -> `npx tsc --noEmit` -> `npm run build`

## Next.js 16 specifics actually used here

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (plus `babel-plugin-react-compiler`). Components must follow React Compiler rules; don't add `useMemo`/` useCallback` noise for memoization.
- Root layout uses the generated global type `LayoutProps<"/">` instead of hand-typed props — keep using these generated route types.
- Consult `node_modules/next/dist/docs/` (esp. `01-app/`) for any unfamiliar API before writing code.

## UI stack (differs from defaults you may assume)

- **shadcn style `base-nova` built on Base UI (`@base-ui/react`), NOT Radix.** Components in `src/components/ui/` wrap Base UI primitives (e.g. `Button` from `@base-ui/react/button`). Add new components with `npx shadcn add <component>` (`components.json` is configured); don't hand-port Radix-based examples.
- `cn` comes from the `cn` npm package — UI components `import { cn } from "cn"` directly. `src/lib/utils.ts` only re-exports it; don't replace it with a local clsx/tailwind-merge implementation.
- **Tailwind CSS v4, CSS-first**: no `tailwind.config.*`. Theme tokens are CSS variables + `@theme inline` in `src/app/globals.css`, loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`. Add design tokens there, not in JS config.
