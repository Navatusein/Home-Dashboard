# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server on http://localhost:3000
- `npm run build` — production build
- `npm start` — serve production build (requires prior `npm run build`)
- `npm run lint` — ESLint via `eslint-config-next` (Core Web Vitals + TypeScript rules)

There is no test runner configured.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 RC with the **React Compiler** enabled (`reactCompiler: true` in `next.config.ts`)
- `reactStrictMode: false` is set in `next.config.ts`, but `<StrictMode>` is wrapped manually inside `BaseLayout`
- TypeScript strict mode, SCSS modules via `sass`
- `@hakit/core` + `@hakit/components` for Home Assistant integration
- `class-variance-authority` (CVA) + `clsx` for component variants
- `@radix-ui/react-slot` (used to implement `asChild` on UI-kit primitives)
- `react-responsive` (wrapped in `useBreakpoint` hook), `react-leaflet`, `motion`, `@mdi/js`

## Architecture

The codebase follows a **Feature-Sliced Design**-style layering under `src/`. Layers may only depend downward:

```
app → layouts → views → widgets → features → entities → shared
```

| Layer | Purpose |
|---|---|
| `app/` | Next.js App Router pages, route groups, root `layout.tsx`. Pages should be thin and delegate to a view. |
| `app/layouts/` | Page-level layout shells (`base-layout`, `home-assistant-connect`, `home-assistant-dashboard-layout`, `terminal-layout`). Note these live under `app/` despite the FSD-style name. |
| `views/` | The actual page implementations rendered by route `page.tsx` files (e.g. `views/home-assistant/home` → `HomeView`). |
| `widgets/` | Composite UI used inside views (`home-assistant-cards/navbar-card`, `terminal-buttons/*`). |
| `features/` | Self-contained interactive units (`open-street-map`, `query-modal-control`). |
| `shared/` | `ui-kit/` (primitives), `hooks/`, `contexts/`, `constants/`, `styles/`, `types/`. |

### Module structure convention

Every non-trivial module follows the same shape and is imported through its `index.tsx` barrel:

```
<module>/
  index.tsx                       # public barrel re-export
  ui/<module>/<module>.tsx        # implementation
  ui/<module>/<module>.module.scss
  types/types.ts                  # optional
```

Stick to this pattern when adding new components — pages, layouts, widgets, features, and UI-kit primitives all use it.

### Routing

Routes use the `(router)` route group to keep `app/` tidy:

- `/(router)/home-assistant/{home,energy,music,security,server}` — wrapped by `HomeAssistantDashboardLayout` (sidebar `NavbarCard` + status chips header). The navbar item list is declared inline in `src/app/(router)/home-assistant/layout.tsx`.
- `/(router)/terminal/(with-routing)/main` — wrapped by `TerminalLayout`. The nested `(with-routing)` group exists to scope sub-routing.
- `/(router)/ui-kit` — component showcase for the shared UI kit.
- `/` — placeholder "Hello World" page.

### Home Assistant connection

`BaseLayout` wraps the app in `HomeAssistantConnect`, which client-side dynamically imports `HassConnect` from `@hakit/core` with `ssr: false`. The HA URL comes from `process.env.HOME_ASSISTANT_URL` (typed in `src/shared/types/env.d.ts`).

**Important dev gotcha:** `src/shared/constants/development.ts` exports `DISABLE_HOME_ASSISTANT`. The file comment says `correct-value: false`, but the value is currently `true`, which short-circuits `HomeAssistantConnect` and skips the HA provider entirely. Flip it to `false` when working on anything that needs real entity data.

### State management

No Redux/Zustand. State is React Context + local hooks. The only shared context today is `ModalContext` (`src/shared/contexts/modal-context.ts`), consumed by `NavbarCard` children and modal pop-ups.

### UI kit and responsive layout

- All primitives live in `src/shared/ui-kit/` and are re-exported from `src/shared/ui-kit/index.tsx`. They are built with CVA over SCSS modules and accept `asChild` (via `@radix-ui/react-slot`) where polymorphism is needed.
- Breakpoints are defined once in `src/shared/constants/breakpoints.ts`: `xl, lg, md, sm, xs, xxs` (1440 / 1280 / 1024 / 768 / 425 / 375). Use these tokens — not raw pixel values — when wiring responsive behaviour.
- `BootstrapGrid.Row` / `BootstrapGrid.Column` is a 24-column grid where each breakpoint accepts either a number (span) or `{span, offset, order}`.
- For show/hide toggles use `ResponsiveToggler` (declarative) or the `useBreakpoint(token, above?)` hook (imperative).

## Path aliases

`tsconfig.json`:

- `@/*` → `src/*`
- `@public/*` → `public/*`

`next.config.ts` also adds `src/` to `sassOptions.includePaths`, so SCSS files can `@use "shared/styles/..."` without `@/` prefixes.

## Assets

SVGs are loaded as React components via `@svgr/webpack` — configured under `turbopack.rules` in `next.config.ts`. Import them as JSX components, not as URLs.

## Environment

See `example.env`. Required variable:

- `HOME_ASSISTANT_URL` — base URL of the Home Assistant instance.

`DEV_DISABLE_HOME_ASSISTANT` exists in `example.env` but is **not** wired to anything — the runtime toggle is the `DISABLE_HOME_ASSISTANT` constant in `src/shared/constants/development.ts` (see above).
