# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server on http://localhost:3000
- `npm run build` — production build (`output: "standalone"`)
- `npm start` — serve production build (requires prior `npm run build`)
- `npm run lint` — ESLint over the whole repo (`eslint-config-next` Core Web Vitals + TypeScript rules); lint one file with `npx eslint <path>`

There is no test runner configured.

Commit subjects follow `(Added|Fixed|Updated) <what>`; releases are a `Version: x.y.z` commit plus a `vx.y.z` tag.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 RC with the **React Compiler** enabled (`reactCompiler: true` in `next.config.ts`)
- `reactStrictMode: false` is set in `next.config.ts`, but `<StrictMode>` is wrapped manually inside `BaseLayout`
- TypeScript strict mode, SCSS modules via `sass`
- `@hakit/core` + `@hakit/components` for Home Assistant integration
- `class-variance-authority` (CVA) + `clsx` for component variants
- Radix primitives: `react-slot` (implements `asChild`), `react-slider`, `react-dropdown-menu`, `react-select`
- `react-responsive` (wrapped in `useBreakpoint` hook), `react-leaflet`, `motion`, `@mdi/js`

## Architecture

The app has two independent UIs that share one Home Assistant connection and one UI kit:

- **Home Assistant dashboard** (`/home-assistant/*`) — responsive card dashboard for phones/tablets/desktop.
- **PC terminal** (`/terminal/*`) — a fixed 12×7 button grid (stream-deck style) that controls a PC through HA entities; meant for a wall tablet / Quest 3 browser.

The codebase follows a **Feature-Sliced Design**-style layering under `src/`. Layers may only depend downward (there is no `entities` layer):

```
app → layouts → views → widgets → features → shared
```

| Layer | Purpose |
|---|---|
| `app/` | Next.js App Router pages, route groups, root `layout.tsx`. Pages should be thin and delegate to a view. |
| `app/layouts/` | Page-level layout shells (`base-layout`, `home-assistant-connect`, `home-assistant-dashboard-layout`, `terminal-layout`). Note these live under `app/` despite the FSD-style name. |
| `views/` | The actual page implementations rendered by route `page.tsx` files (e.g. `views/home-assistant/home` → `HomeView`). |
| `widgets/` | Composite UI used inside views: `home-assistant-cards/*` for the dashboard, `terminal-buttons/*` for the terminal. |
| `features/` | Self-contained interactive units (`leaflet-map`, `query-modal-control`, `terminal-modal`, `agent-disabled-provider`, `pc-disabled-provider`, `service-worker`). |
| `shared/` | `ui-kit/` (primitives), `hooks/`, `contexts/`, `constants/`, `helpers/`, `styles/`, `types/`. |

### Module structure convention

Every non-trivial module follows the same shape and is imported through its `index.tsx` barrel:

```
<module>/
  index.tsx                       # public barrel re-export
  ui/<module>/<module>.tsx        # implementation
  ui/<module>/<module>.module.scss
  types/types.ts                  # optional
  helpers/                        # optional
```

Stick to this pattern when adding new components — pages, layouts, widgets, features, and UI-kit primitives all use it. Views additionally keep their page-private pieces next to `ui/`: `views/home-assistant/home/{segments,modals}/` and `views/terminal/*/segments/`. A segment lives in `segments/<name>-segment/<name>-segment.tsx` and exports `<Name>Segment`.

### Routing

Routes use the `(router)` route group to keep `app/` tidy:

- `/` — server redirect only: user agent containing `Quest 3` → `/terminal/main`; otherwise `/dev` if `DEV_INDEX_PAGE` is set, else `/home-assistant/home`.
- `/(router)/home-assistant/{home,energy,music,security,server}` — wrapped by `HomeAssistantDashboardLayout` (sidebar `NavbarCard` + greeting + status chips header). The navbar item list is declared inline in `src/app/(router)/home-assistant/layout.tsx`; items support `modal`, `hideOnMobile`, and `forUsers` (matched against the HA user name).
- `/(router)/terminal/(with-routing)/{main,system,light,record,faker}` — wrapped by `TerminalLayout`. The nested `(with-routing)` layout renders the top navigation row of the grid.
- `/(router)/ui-kit` — component showcase for the shared UI kit; add a `*-part` there when adding a primitive.
- `/(router)/dev` — dev index linking to the sections above.

Build terminal URLs with `buildPath()` / `buildHaPath()` from `src/shared/helpers/terminal-path-builder.ts`. `buildHaPath(true)` appends `?from-terminal`, which makes the dashboard header show a "Terminal" chip to navigate back.

### Home Assistant connection

`BaseLayout` wraps the app in `HomeAssistantConnect`, which client-side dynamically imports `HassConnect` from `@hakit/core` with `ssr: false`. The HA URL comes from `process.env.HOME_ASSISTANT_URL`, read in the server component `BaseLayout` and passed down as a prop. The root layout is `force-dynamic` so the value is read at container runtime rather than baked in at build time — don't remove it.

`src/shared/constants/development.ts` exports `DISABLE_HOME_ASSISTANT` (must be `false` when committed). Setting it to `true` skips the HA provider entirely; any component calling `@hakit/core` hooks will then throw, so it is only useful for pure UI-kit work.

Entity ids are hard-coded string literals at the call site (e.g. `button.navatusein_pc_lock_pc`). Type entity props with the template-literal types in `src/shared/types/ha-domains.ts`. Custom HA services (e.g. `fullyKiosk`) are declared by augmenting `@hakit/core` in `src/shared/types/hakit.d.ts`.

### Dashboard modals

Room/personal modals on the home view are driven by the URL: `QueryModalControl` opens a `ModalPopUp` when `?modal=<name>` matches and closes by pushing the bare pathname. To add one, create it under `views/home-assistant/home/modals/`, mount it in `HomeView`, and add a navbar item with the same `modal` value.

A modal body is `ModalPopUp.Header` (fixed; its children, e.g. a row of chips, stay fixed with it) followed by `ModalPopUp.Content`, which is the only part that scrolls. Anything placed outside `ModalPopUp.Content` is clipped when it does not fit.

### Terminal grid

- `TerminalLayout` renders one `Grid` (12 columns × 7 rows); `TerminalModal` overlays a second grid of the same size.
- Terminal views return a **fragment** of `Grid.Section`s — they must not add wrapper elements, since every button has to be a direct grid item. `Grid.Section` with `direction` auto-places its children from `rowStart`/`colStart`.
- All buttons wrap `BaseButton` (`widgets/terminal-buttons/base-button`), which handles click / double-click / long-press / release through `useGestures` and takes Tabler SVG components as icons. Entity-bound variants (`ToggleButton`, `ButtonButton`, `SelectButton`, `SliderButton`, …) take an `entity` id and use `resolveStatefulVisuals` for `icon|color|image` + `*Enabled` / `*Disabled` props.
- `DisabledContext` greys out and disables every `BaseButton` below it. Wrap segments in `AgentDisabledProvider` (PC agent not running) or `PcDisabledProvider` (PC off) instead of passing `disabled` per button.

### State management

No Redux/Zustand. State is React Context + local hooks. Shared contexts: `ModalContext` (`isOpen` / `close`, provided by `ModalPopUp` and `TerminalModal`) and `DisabledContext` (see above).

### UI kit and responsive layout

- All primitives live in `src/shared/ui-kit/` and are re-exported from `src/shared/ui-kit/index.tsx`. They are built with CVA over SCSS modules and accept `asChild` (via `@radix-ui/react-slot`) where polymorphism is needed.
- Breakpoints are defined once in `src/shared/constants/breakpoints.ts`: `xl, lg, md, sm, xs, xxs` (1440 / 1280 / 1024 / 768 / 425 / 375). Use these tokens — not raw pixel values — when wiring responsive behaviour.
- `BootstrapGrid.Row` / `BootstrapGrid.Column` is a 24-column grid where each breakpoint accepts either a number (span) or `{span, offset, order}`.
- For show/hide toggles use `ResponsiveToggler` (declarative) or the `useBreakpoint(token, above?)` hook (imperative).

### PWA

`src/app/manifest.ts` plus `public/sw.js`, registered by the `ServiceWorker` feature in the root layout. The worker is network-first with a cache fallback for same-origin GETs, so it can serve stale pages when the dev server is down.

## Path aliases

`tsconfig.json`:

- `@/*` → `src/*`
- `@public/*` → `public/*`

`next.config.ts` also adds `src/` to `sassOptions.includePaths`, so SCSS files can `@use "shared/styles/..."` without `@/` prefixes.

## Assets

SVGs are loaded as React components via `@svgr/webpack` — configured under `turbopack.rules` in `next.config.ts`. Import them as JSX components, not as URLs.

Two icon sources, by UI: the dashboard uses `@mdi/js` path strings; the terminal uses the Tabler SVG set in `public/icons/<category>/` (`import BulbIcon from "@public/icons/home-automation-and-buildings/bulb.svg"`). Application logos for launcher buttons are PNGs in `public/applications/`.

## Environment

See `example.env`.

- `HOME_ASSISTANT_URL` — required; base URL of the Home Assistant instance.
- `DEV_ALLOWED_ORIGINS` — comma-separated list passed to `allowedDevOrigins` (needed to open the dev server from another device).
- `DEV_INDEX_PAGE` — when set, `/` redirects to `/dev`. It is a truthiness check on the string, so `DEV_INDEX_PAGE=false` still enables it; leave it unset to disable.
- `FAKER_CONFIG_PATH` — path to the JSON config of the terminal Faker page (profiles, field generators, buttons, templates), read server-side on each request; mounted from a ConfigMap in k8s. `faker.example.json` documents the format; the real `faker.json` is git-ignored.
- `DEV_DISABLE_HOME_ASSISTANT` — **not** wired to anything; the real toggle is the `DISABLE_HOME_ASSISTANT` constant (see above).

## Release and deployment

Pushing a `v*.*.*` tag runs `.github/workflows/build-release-image.yml`: it builds the multi-arch `Dockerfile` image (Next standalone output), pushes it to `ghcr.io/navatusein/home-dashboard`, then opens a PR in the `Navatusein/Home-Lab` GitOps repo bumping the image tag in the Kubernetes HelmRelease. Keep `package.json` `version` in sync with the tag.
