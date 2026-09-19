# Handover: Tenon into the to-dos board

Rewritten 19 Sep 2026, part way through the type migration. The original
handover planned three parts; all three are built. What is left is one
decision and the work that follows from it.

## Where things stand

Tenon is at **v0.4.0**, on `main` and tagged, public at
`github.com/tiagopedras/tenon`. 327 colour primitives, 90 semantic tokens per
theme, one dimension scale, seven React components.

Three consumers, reaching it two different ways:

| Consumer | How | State |
| --- | --- | --- |
| `to-dos` board | `npm i github:tiagopedras/tenon#v0.4.0`, CSS copied into `kanban/dist/` by its own vite build | on v0.4.0 |
| `to-dos` companion | same install, imported in `main.tsx` | on v0.4.0 |
| `PACKAGES/ai_chat_engine` | no install at all — every `--aic-*` default is `var(--tenon-…, <old literal>)` | live |

`ai_chat_engine` is the second kind on purpose: it is dropped into hosts it
does not control, so it must not require one to load a stylesheet first. A
host with Tenon gets the design system's colours, a host without gets exactly
what it had before. `npm run sync` cannot see that and should not try to;
`consumers.json` says so.

`ai_canvas` is the one listed consumer not installed. He is not using it and
does not want it done.

## What is committed

**`to-dos`**, all on `main`:

- `4c0d9d3` the token swap — `board.css` defines nothing, reads `--tenon-*`
- `ba6c7d3` tokens built into `kanban/dist/`, companion onto Tenon, Vercel builds
- `d088bdb` the component swap — Card, Column, Badge and Stat come from Tenon
- `ff37727` `board.css` stops repeating what Tenon already says
- `ee9cc75` every radius on Tenon's scale — **ahead of origin, not pushed**

**`PACKAGES/tenon`** at `8f9e037`, pushed. **`PACKAGES/ai_chat_engine`** at
`7cb638c`, pushed.

Two unmerged branches in `to-dos`, neither mine: `planning-floor` (the
planning agent's schedule, finished, and carrying one stray commit of mine —
`8de13cc`, an IMPROVEMENTS entry) and `improve/2026-09-16`.

## The one decision left

Radius is migrated. Font sizes are not, and cannot be until Tenon's scale can
express them.

The board uses **17 distinct font sizes across 250 declarations**, twelve of
them between 9px and 15px. Tenon's semantic scale is 11, 12, 13, 14, 16, 19,
23, 28. Everything from 11px up lands within half a pixel of a step. Below
that, 25 declarations have nowhere to go: 10.5px (8 uses), 10px (12), 9.5px
(3), 9px (2) — the card eyebrow, the tag chips, the timeline labels.

He asked for **multiples of 8 starting at 4, closest match**. Run literally
against a 4px grid, this is what happens:

```
 board  uses   grid   move         board  uses   grid   move
 9.0px     2    8px   -1.0        13.0px    39   12px   -1.0
 9.5px     3    8px   -1.5        13.5px    11   12px   -1.5
10.0px    12    8px   -2.0        14.0px     6   12px   -2.0
10.5px     8   12px   +1.5        15.0px     5   16px   +1.0
11.0px    37   12px   +1.0        16.0px     2   16px    0.0
11.5px    39   12px   +0.5        17.0px     1   16px   -1.0
12.0px    40   12px    0.0        18.0px     1   16px   -2.0
12.5px    42   12px   -0.5        19.0px     1   20px   +1.0
                                  56.0px     1   56px    0.0
```

**244 of the 250 collapse onto three sizes: 8px, 12px and 16px.** Body text at
13px becomes 12px, the card title at 13.5px becomes 12px, and the 10px labels
become 8px, which is below what the board can be read at. That is one text
size for almost the whole application.

It may be what he wants — one body size, one label size, one heading size is a
real position, and twelve sizes inside a 6px band is the same unexamined
sprawl the radii were. But it restyles every piece of text in the app, so
**ask before applying it**. The alternative that honours the same intent
without the collapse is a 2px grid at the small end and 4px above — 8, 10, 12,
14, 16, 20, 24, 28 — which is exactly what Tenon's `dimension` scale already
is, and which every board value lands on within a pixel.

Two things are settled whichever way it goes:

- **A Title step**, which he asked for. The Reports headline figure is 56px
  and `heading-1` is 28px. `typography.size` has `7xl` at 59px already; a 56px
  primitive would sit on the 8-grid exactly. One token, one call site.
- **`typography.size.2xs` is already 10px** and no semantic style reads it, so
  a step at the small end costs one alias rather than a new primitive.

## How to change Tenon without breaking a consumer

`scripts/build.mjs` refuses to write `dist/` if any of five checks fail: light
and dark must hold the identical key set, every `{alias}` must resolve, no
semantic token may alias another semantic, no component CSS may name a colour
primitive, and every `--tenon-` name a component reads must be one the build
emits. The last exists because a `var()` naming a token that does not exist
falls back silently and looks completely fine. That has now happened three
times, most recently in the board's own `bucket-colors.json`, which stored
`var(--b4)` as a literal string and lost a bucket's colour without a word.

Renaming a semantic token is free while nothing reads it and costs every call
site afterwards. Three things read it now.

Release: `npm version minor`, `npm run all` so the stamp matches the version,
commit, tag, push, then `npm run sync` to see who is behind. A consumer moves
forward by editing its own `package.json`, which is the point of pinning.

## How to check a change to the board without trusting your eyes

The thing most worth keeping from this session. Serve the old stylesheet
beside the new one and diff computed styles on the same DOM:

1. `cp kanban/board.css kanban/dist/board.before.css` — `kanban/dist/` is
   already served, so the page can fetch it.
2. In the page, snapshot `getComputedStyle` for every node; append a second
   `<link>` at the old file so it wins; snapshot again; remove it.
3. Anything that differs is your change and nothing else.

Two mistakes to avoid. Do not compare snapshots taken minutes apart — the list
is live and the diff fills up with content changes; the A/B has to happen
inside one page against one DOM. And the Browser pane must be on screen for a
screenshot, but `read_page`, `get_page_text` and `javascript_tool` all work
while it is hidden.

`npm test` renders Tenon's components against the string builders in
`kanban/js/09-columns.js` and fails on any difference. It is the only thing
keeping the two halves of a half-ported board drawing the same card: the
Board, the Timeline and the drawer are still HTML strings, while Plans,
Reports, Projects, Backups and Overview are React. 54 cases.

## Things that will bite

**Check the branch before every commit.** Another session switched this
working tree to a new branch mid-flow and a commit of mine landed on it
unnoticed. `git branch --show-current` first, every time.

**`COORDINATION.md` at the repo root is real.** More than one session runs on
`to-dos` at once. Read it before starting, append when you change something
another session could depend on. It is gitignored, so it is per-checkout.

**`to-dos` keeps an `IMPROVEMENTS.md`.** Per `~/Code/CLAUDE.md`, say what a
change touches and wait, before making it. So does `ai_chat_engine`, and so
does Tenon since today.

**Vercel now runs a build.** `vercel.json` gained a `buildCommand` because
that deployment had never run one — it was serving a page that linked
`board-ui.js`, the React half of every view, into a 404. If a deploy fails,
that is new and that is where to look.

**The board's data holds literal CSS strings.** `bucket-colors.json` stores
the swatch the picker wrote. `loadBucketColors()` in `kanban/js/08-buckets.js`
translates the old `var(--bN)` names on the way in rather than migrating the
file, because `data/` is his and has one writer. Anything else that persists a
token name needs the same treatment.

**What is left in `board.css` under a `.tenon-` selector is a real override.**
The verbatim repeats are gone. Nearly all of what remains is the type
migration above; the rest is deliberate — the column's two-layer shadow, the
stat box sitting on the page rather than raised, the card's hover border, the
stat eyebrow one step fainter.
