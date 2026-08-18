# Family Member Selection

The appointment screen where a user picks which family member needs medical
assistance. React 19 + TypeScript + Vite + Tailwind CSS v4.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on http://localhost:5173 |
| `npm run build` | Type-checks with `tsc -b`, then builds to `dist/` |
| `npm run lint` | Runs **oxlint** (this project does not use ESLint — there is no `eslint.config.js`) |
| `npm run typecheck` | `tsc -b` on its own, without a full build |
| `npm run preview` | Serves the production build locally |

## Project structure

```
src/
  components/
    ui/              Reusable primitives: Button, Avatar, Pill, Modal, Input, Container
    ErrorBoundary.tsx  Last-resort guard against a blank page
    *.tsx            Screen-level components
  constants/
    relations.ts     RELATIONS array + the Relation union derived from it
  data/
    familyMembers.ts Seed family members
    avatars.ts       Placeholder avatar options
    currentUser.ts   Signed-in clinician
    navigation.ts    Nav tabs and their availability
  hooks/
    useFamilyMembers.ts  Member state and the rules that operate on it
    useNotification.ts   Single-slot toast with a managed timer
  lib/               cn (class join), createId
  types.ts           Domain types
  main.tsx           Mounts the app inside an ErrorBoundary
```

### Data layer

No component owns domain data. `useFamilyMembers` is the single seam between the
UI and where members come from — swapping the seed import for a request is the
only change needed to move to an API. Every mutation returns a result object
(`{ ok: true, ... } | { ok: false, error }`) so callers can surface a message
rather than failing silently.

`Relation` is derived from the `RELATIONS` array, so the union type and the
options the form offers cannot drift apart.

## Conventions worth knowing

**Focus indicators use `outline`, not Tailwind's `ring-*`.** `ring-*` composes
`box-shadow` from `@property`-registered custom properties. Any element that also
transitions `box-shadow` will animate the ring from its transparent initial
value, which delays or (in a non-compositing context) hides the indicator.
`outline` is immune to that. Use `FOCUS_RING` from `components/ui/styles.ts`.

**Avoid `transition-all`.** It animates `outline-width` and `outline-color`,
which makes the focus indicator fade in instead of appearing immediately. Use an
explicit property list — `TRANSITION` in `components/ui/styles.ts`, or something
narrower such as `transition-[transform,opacity]`.

**Never layer a conflicting Tailwind utility as an "override".** Two utilities
setting the same CSS property resolve by CSS source order, not by their order in
the `class` attribute. Emit exactly one utility per property, or put the variant
behind a state selector (`disabled:`, `enabled:`) that raises specificity.

**Dialogs are rendered only while open.** `Modal` has no `isOpen` prop; the
parent conditionally renders it. Unmounting on close is what guarantees a form
starts from a clean draft.

## Strictness

TypeScript runs with `strict` and `noUncheckedIndexedAccess`, so indexing an
array yields `T | undefined` and must be narrowed before use.

oxlint runs the `correctness`, `suspicious` and `perf` categories as errors.
`react/react-in-jsx-scope` is disabled on purpose: it does not apply under the
automatic JSX runtime (`"jsx": "react-jsx"`).

## Known limitations

- Avatars are remote URLs (Unsplash) rather than local assets. `Avatar` renders
  an initials fallback when one fails, but the app still depends on a third-party
  host at runtime.
- Fonts load from Google Fonts. Self-hosting Inter and Manrope would remove that
  dependency.
- Only the Appointment screen exists. The other nav tabs are marked
  `aria-disabled` and ignore activation rather than pretending to navigate.
