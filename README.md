# Mainframe — Independent creative studio

A complete responsive React + TypeScript studio website, built with Vite. The original red, character-led A.R.I.A. landing screen, boy video, pointer-driven head turn, typewriter greeting, and pill actions are preserved. Additional content and pages extend that original experience. The exact original video is bundled locally, alongside CSS-generated concept artwork, so no external media service is required at runtime.

**Preserve the original character experience when making future changes.** Do not replace the boy or his head-turn animation with an abstract graphic. The additional abstract motion study belongs in Labs and its below-the-fold teaser only.

## Run locally

Requires Node 22.12+ (22.x) or Node 24+.

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. On Windows, if PowerShell consumes npm command-line flags, run `node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173` directly.

## Build and verify

```sh
npm run format:check
npm run build
npx playwright install chromium
npm test
npm run preview
```

The build performs TypeScript checking and creates `dist/`. Browser tests cover desktop and mobile navigation, every page, project filters, shop selection persistence, invalid storage recovery, enquiry validation, Labs controls, motion preferences, and automated WCAG A/AA checks. GitHub Actions repeats the checks for pushes to main and pull requests.

For a locally installed Chrome instead of Playwright's downloaded browser, set `PLAYWRIGHT_CHROME_PATH` to the executable path before running tests. The optional environment variable is only used by the test runner.

## Pages and interactions

- Home: original A.R.I.A. boy video and cursor-driven head turn, original typewriter greeting and pill buttons, followed by selected work, studio introduction, services, Labs preview, and project enquiry links. The video also responds to horizontal touch drags while allowing vertical page scrolling.
- Work: filterable portfolio and four individual case studies (Forma, Offscript, Noma, Signal), including strategy, identity palette, deliverables, and next-project navigation.
- Studio: point of view, values, and four-stage process.
- Labs: a real-time 3D object studio (three shapes, three materials, drag rotation, keyboard rotation, expansion, pause, reset); a 700-point reactive particle field (sphere/ring/wave and pulse); editable kinetic typography (three movement styles and tempo); and the original CSS orbit/helix/bloom experiment.
- Openings: collaborator network overview and three detailed expressions of interest.
- Shop: three product concepts, category filters, persistent saved selections, removal, and a prepared availability enquiry.
- Contact: required-field validation, service preselection, optional budget, generated email draft, clipboard copy, and a plain-text fallback.
- Privacy & info: an explanation of local storage, email handoff, and concept content.
- Unknown routes: a designed 404 page with a working home link.

Navigation uses hash URLs (for example `/#/work/forma`). Refresh, browser history, and deep links work on static hosting without server rewrites. Assets use a relative base, so deployment in a subdirectory is supported. Page titles update on navigation. For per-page SEO and social metadata, migrate to server-rendered or prerendered path routes before a search-focused launch.

## Presenting the site

A useful walkthrough is Home → Work → Forma → Studio → Labs → Shop → Contact. In Labs, change the form and colour; in Shop, save an object and refresh; in Contact, prepare a brief to demonstrate the complete enquiry flow without sending an email.

The extended site follows the original hero's crimson, black, and white palette. Home adds an object-studio teaser and a native-scroll three-chapter story, while portfolio cards respond with subtle pointer depth. The original hero component, styles, and video are unchanged by this visual extension.

Interaction references include [Lusion](https://lusion.co/), [Lusion Labs](https://labs.lusion.co/), and [Bruno Simon](https://bruno-simon.com/). These informed the emphasis on tactile 3D and playful controls; their assets and source code are not used.

Three.js loads only as the object studio approaches the viewport. Rendering pauses offscreen and in hidden tabs, pixel density is capped, and GPU resources are disposed on navigation. A CSS preview remains available when WebGL cannot initialize. The separate 3D chunk is about 137 KB gzipped; Vite's default 500 KB uncompressed chunk warning applies to that lazy chunk. Reduced motion disables automatic movement while keeping direct controls available.

The footer motion control persists across visits. The operating system's reduced-motion preference always takes precedence. Menus, filters, forms, links, and experiment controls support keyboard use. Automated accessibility checks supplement, rather than replace, assistive-technology testing.

## Content and launch assumptions

This is a client-presentation-ready front end. Business integrations were not present in the original repository and are not fabricated:

- **Portfolio:** all four projects are explicitly labelled self-initiated concepts. Replace them with approved client material before presenting them as completed commissions. No client results or endorsements are invented.
- **Contact:** the address `hello@mainframe.co` is retained from the original code; ownership and delivery have not been verified. The form prepares a `mailto:` draft and never claims to have sent it. The visitor sends through their own email app. For automatic submission, add a server-side email or CRM integration with suitable validation and spam protection.
- **Shop:** objects are preview concepts, not confirmed stock. There are no invented prices, checkout, payment collection, or fulfilment claims. The selection produces an email enquiry. A real store requires approved products, prices, inventory, payments, and policies.
- **Openings:** listings are expressions of interest for an independent collaborator network, not confirmed employment vacancies. Replace or approve them before public recruitment.
- **Privacy:** this application stores only a motion boolean and selected product IDs locally. Contact form data remains in component memory until passed to the visitor's email application. Review the privacy copy against any future hosting, analytics, and backend services.

## Editing

- `src/config.ts`: shared email address and navigation.
- `src/AriaHero.tsx`: preserved original hero, typewriter greeting, pointer/touch video scrubbing, copy-email feedback, and functional pill actions.
- `public/media/aria-head.mp4`: exact original 810,684-byte character video, copied from the CloudFront URL in the initial repository; kept locally to make the original animation independent of the external host.
- `src/data.ts`: projects, product concepts, and collaborator listings.
- `src/pages/`: individual pages and flows.
- `src/components.tsx`: shared artwork, buttons/links, section headings, and CTA.
- `src/hooks/useStored.ts`: guarded, validated local preferences.
- `src/index.css`: design tokens, responsive layouts, CSS artwork, animation, and reduced-motion styles.
- `src/theme.css`: crimson/black/white extension theme and interactive-section layouts; original hero rules remain in `index.css`.
- `src/experience/`: lazy 3D scene, particle field, kinetic type, scroll story, and motion/depth hooks.
- `tests/site.spec.ts`: browser and accessibility regression coverage.
- `tests/experience.spec.ts`: interactive-object, particle, typography, and scroll-chapter regression coverage.

Dependencies are pinned and the npm lockfile is committed. Use `npm run format` after edits.

## Deploy

Build command: `npm run build`. Publish directory: `dist`. Use the repository root as the application root and Node 22 or 24.

For Vercel or Netlify, import this repository and select Vite. Other static hosts can serve the contents of `dist/` directly. No server-side secrets are needed for the current front end. Pushing the repository does not by itself create a hosting deployment; an existing connected host may deploy automatically.
