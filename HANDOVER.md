# Handover: Tenon into the to-dos board

Written 19 Sep 2026, at the end of the session that built Tenon.

**All three parts are built.** Part 1 shipped as v0.4.0, on `main` and tagged.
Parts 2 and 3 are on the `tenon-tokens` branch in `to-dos`, not merged. What
follows is the plan as it was written; four things came out differently.

1. Green and amber fill at ramp step 600 rather than 550, because at 550
   neither clears 4.5:1 under white. `running` got six tokens rather than
   three, so the solid/subtle rule holds for it too.
2. `--shadow` is `elevation-overlay`, not `elevation-raised`. The board's
   shadow is two layers and raised is one.
3. The tokens reach the page from `kanban/dist/`, built there by vite, not
   from a `server.py` route. The Vercel deployment has no server and no
   `node_modules`, and it never ran a build at all, so it had been serving a
   page linking `board-ui.js` into a 404 for as long as that file existed.
4. Part 3 was bigger than it reads below. Only half the board is React; the
   Board, the Timeline and the drawer draw cards as HTML strings. Swapping
   only the React four would have put two different cards on one board, so
   `colHTML()` and `cardShellHTML()` emit Tenon's markup too and the 90
   `.card`/`.col` selectors in `board.css` were renamed onto it.

Two things are left, neither urgent. `board.css` still carries the card and
column declarations Tenon now also provides, under the new names — renaming
was the safe move, thinning them is a separate pass with the board in front of
you. And radius, spacing and type never moved, which is the conversation Part
2 said it would be.

## Where things stand

Tenon lives at `~/Code/PACKAGES/tenon`, is public at
`github.com/tiagopedras/tenon`, and `main` is at `v0.3.0`. It has 327 colour
primitives across 17 hues, 76 semantic tokens in two themes, one dimension
scale, and seven React components: `Button`, `Card`, `Column`, `Badge`, `Tag`,
`Stat`, `Field`. `README.md` explains the structure and why it is that shape.

Nothing consumes it yet. `npm run sync` will tell you that.

Four of the seven components were taken from the to-dos board rather than
written here, because the board's versions had already survived five views.
`Card` came from `kanban/ui/Card.tsx`, `Column` from `Column.tsx`, `Badge`
from `NumberBadge.tsx`, `Stat` from `StatCard.tsx`. They are copies, and that
is the reason this work is worth doing soon: two copies of one component
drifting apart is a worse position than either one alone.

## Three decisions, already taken

**`--hot` becomes a fifth tone called `running`.** On the board it is an
orange meaning a queue an agent is working, and it is orange rather than amber
because amber already means warning. Tenon's `Column` tones are
accent/success/warning/error, so there is nowhere for it to land today. Add
`background.running`, `text.running`, `stroke.running` on the orange ramp, and
`tone="running"` to `Column`. Do not collapse it into warning: a running queue
and an overdue task should not look the same.

**The status colours get restructured to behave like accent.** Today
`background.accent` is a solid blue with `text.on-accent` on top, while
`background.success` is a pale wash meant to sit behind dark green text. So
the five are not one family and a solid green button cannot be built from
them. The fix, for success, warning, error and info:

- `background.X` becomes the solid fill
- `text.on-X` is added
- today's pale wash moves to `background.X-subtle`

The rule afterwards is one sentence: `background.X` is solid, `background.X-subtle`
is the tint. Do this before anything installs Tenon — renaming a semantic
token is free while nothing reads it and costs every call site afterwards.

`Tag` currently reads the pale washes and will need repointing at the
`-subtle` names. `Badge`'s success/warning/error tones read `stroke.X` as a
stand-in for a solid fill and should move to `background.X`.

**Scope: the token swap first, the component swap second.** Two passes, not
one. The token swap is reversible and proves the palette across every view;
the component swap is the larger change and carries the test rewrite with it.

## Part 1 — the Tenon changes

In `~/Code/PACKAGES/tenon`, before touching to-dos at all.

1. The `running` tone: three semantic tokens in both
   `tokens/semantic/color.light.json` and `color.dark.json`, then
   `tone="running"` in `src/components/Column/Column.tsx` and its CSS.
2. The status restructure, as above, in both theme files, then repoint `Tag`
   and `Badge`.
3. Two `Button` variants for the board's solid green and red buttons:
   `confirm` and `destructive`, reading the new `background.success` /
   `background.error` and `text.on-success` / `text.on-error`. Keep the
   existing tinted `danger`, which is the board's `.btn.danger`.
4. `npm run build`, check the playground at `npm run dev`, tag `v0.4.0`.

The status restructure is breaking, so it is a minor bump and the tag matters.

## Part 2 — the token swap in to-dos

`to-dos/kanban/board.css` carries its own two-tier token block at the top of
the file, lines 1 to roughly 135. That block comes out and `tenon.css` goes
in. Everything from line 136 down keeps working, because it reads semantic
names and only the names change.

Install it at the to-dos root, which already has React 18, Vite and
TypeScript:

```bash
cd ~/Code/to-dos && npm i github:tiagopedras/tenon#v0.4.0
```

`server.py` already serves a sibling package's assets twice over —
`ai_chat_static` and `work_streams_static`, both around line 1916. A third
route of the same shape serves `tenon.css`, and `kanban/index.html` links it
before `board.css`, where `/kanban/board.css` is linked today at line 13.

### The mapping

34 semantic names, and the call-site counts are why some rows deserve more
care than others.

| board | uses | Tenon |
| --- | --- | --- |
| `--bg` | 28 | `--tenon-background-default` |
| `--panel` | 56 | `--tenon-background-raised` |
| `--ink` | 78 | `--tenon-text-default` |
| `--ink-soft` | 84 | `--tenon-text-subtle` |
| `--ink-faint` | 170 | `--tenon-text-faint` |
| `--line` | 88 | `--tenon-stroke-default` |
| `--line-soft` | 23 | `--tenon-stroke-subtle` |
| `--chip` | 39 | `--tenon-background-neutral` |
| `--accent` | 95 | **split, see below** |
| `--accent-ink` | 3 | `--tenon-text-on-accent` |
| `--red` | 27 | `--tenon-text-error` |
| `--red-bg` | 13 | `--tenon-background-error-subtle` |
| `--amber` | 42 | `--tenon-text-warning` |
| `--amber-bg` | 15 | `--tenon-background-warning-subtle` |
| `--green` | 25 | `--tenon-text-success` |
| `--green-bg` | 6 | `--tenon-background-success-subtle` |
| `--hot` | 5 | `--tenon-text-running` / `--tenon-background-running` |
| `--shadow` | 4 | `--tenon-elevation-raised` |
| `--agree` / `--agree-ink` | 3 | `--tenon-background-success` / `--tenon-text-on-success` |
| `--reject` / `--reject-ink` | 3 | `--tenon-background-error` / `--tenon-text-on-error` |
| `--tl-over` | 2 | `--tenon-status-over` |
| `--tl-soon` | 2 | `--tenon-status-soon` |
| `--b1` … `--b10` | 10, in JS | `--tenon-chart-1` … `--tenon-chart-10` |

### The one row that is not a find-and-replace

`--accent` is used 95 times and Tenon has three different tokens behind it:

- 24 as `color:` → `--tenon-text-accent`
- 22 as `background:` → `--tenon-background-accent`
- 18 as a border → `--tenon-stroke-accent`, except on a focus ring, which is
  `--tenon-stroke-focus`
- 6 in a `box-shadow:` → usually the focus ring, so `--tenon-stroke-focus`

Every one of those needs reading. A blind swap to any single token will look
right in most places and wrong in the rest, and the wrong ones will be the
focus rings, which nobody notices until somebody tabs.

### The bucket colours

`--b1` to `--b10` barely appear in `board.css`. They are referenced from
`kanban/js/`, one `var(--bN)` each, applied as inline styles. Ten edits, in
JS rather than CSS.

### Radius and spacing

Do not migrate these in this pass. `board.css` declares `--r-*`, `--sp-*` and
`--t-*` scales at the bottom of its token block that nothing reads — they were
written for a migration that never happened. Tenon's dimension scale replaces
them, but the call sites are 246 raw pixel font-sizes and 69 raw radii, and
changing those changes how the board looks everywhere. That is its own pass
and its own conversation.

### What is not a colour

`--bc`, `--card`, `--mono`, `--step-cap`, `--step-color`, `--pcols`, `--cols`,
`--refcols`, `--header-h`, `--gear`, `--w`, `--tllabelw`, `--lockbar-h`,
`--tldaypx`, `--r-pill`. Layout and geometry the board sets, most of them from
JS. They stay exactly as they are. `--bc` is the card stripe colour and is
`Card`'s `accent` prop once the components are swapped, but not in this pass.

## Part 3 — the component swap, later

Not this pass. Recorded so it is not rediscovered.

`kanban/ui/Card.tsx`, `Column.tsx`, `NumberBadge.tsx` and `StatCard.tsx` are
deleted and imported from `@tiagopedras/tenon` instead. `PlanCard.tsx` and the
views change at each call site: `cls`→`className`, `stripe`→`accent`,
`position`→`lead`, `note`→`footer`, `attrs`→spread props, `heading`→`titleAs`,
`body`→`children`.

`kanban/ui/test_primitives.mjs` holds the board's components and its string
builders side by side and fails if they disagree. Tenon's markup uses
different class names, so that suite is rewritten as part of this, not after.

## Things that will bite

**Check the branch before every commit.** `~/Code/CLAUDE.md` inherits a Twinkl
policy that forbids committing to `main`. This session broke it twice, both
times by committing straight after the user merged a branch, without noticing
the checkout had moved. `git branch --show-current` first, every time.

**to-dos has an `IMPROVEMENTS.md`.** Per `~/Code/CLAUDE.md`, say what a change
touches and wait, before making it.

**Tenon's build has four checks and they are the point of it.** Light and dark
must hold the identical key set; every `{alias}` must resolve; no semantic
token may alias another semantic; and every `--tenon-` name a component reads
must be one the build emits. The last one exists because a `var()` naming a
token that does not exist falls back silently and looks completely fine — it
happened twice in one session.

**The playground and the token preview carry no hard-coded values on purpose.**
`npm run dev` for the components, and `python3 -m http.server 8787` then
`/preview/index.html` for the tokens. Anything that looks wrong on either is a
token that is wrong or missing, which is how the first of those two silent
failures was caught.
