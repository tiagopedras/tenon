# Handover: Tenon into the to-dos board

Rewritten 19 Sep 2026, after the type migration. Everything the original
handover planned is built, and the one decision it was holding is taken. What
is left is a look at it in a browser.

## Where things stand

Tenon is at **v0.7.0**, on `main` and tagged, public at
`github.com/tiagopedras/tenon`. 327 colour primitives, 90 semantic tokens per
theme, one dimension scale that type and spacing now share, eighteen React
components.

Three consumers, reaching it two different ways:

| Consumer | How | State |
| --- | --- | --- |
| `to-dos` board | `npm i github:tiagopedras/tenon#v0.7.0`, CSS copied into `kanban/dist/` by its own vite build | needs v0.7.0 for the chat window, tag not pushed yet |
| `to-dos` companion | same install, imported in `main.tsx` | on v0.5.0 |
| `PACKAGES/ai_chat_engine` | devDependency by relative path, built into its own output | live, on v0.7.0 |

`ai_chat_engine` is the second kind on purpose: it is dropped into hosts it
does not control, so it must not require one to load a stylesheet first. Its
window is React on Tenon's components (rewritten 19 Sep 2026), and it ships
Tenon inside its one-file bundle, plus a `chat.standalone.css` that carries the
tokens and component styles for a page that has neither. `npm run sync` cannot
see that and should not try to; `consumers.json` says so. It devDepends on
`../tenon` by path until v0.7.0 is tagged, after which it should point at the
tag like the others.

`ai_canvas` is the one listed consumer not installed. He is not using it and
does not want it done.

## What is committed

**`to-dos`**, all on `main`:

- `4c0d9d3` the token swap — `board.css` defines nothing, reads `--tenon-*`
- `ba6c7d3` tokens built into `kanban/dist/`, companion onto Tenon, Vercel builds
- `d088bdb` the component swap — Card, Column, Badge and Stat come from Tenon
- `ff37727` `board.css` stops repeating what Tenon already says
- `ee9cc75` every radius on Tenon's scale
- `dd2113a` every font size on Tenon's scale, and both packages onto v0.5.0

**`PACKAGES/tenon`** at `4808422`, tagged `v0.5.0` and pushed.
**`PACKAGES/ai_chat_engine`** at `7cb638c`, pushed.

`planning-floor` is merged. **`improve/2026-09-16` is still unmerged and
should be binned**: both its commits are already on `main` in fuller form, and
it branched from 15 Sep, so its `board.css` additions still name `--accent`
and `--line`. Merging it would drag older copies back.

## The type migration, done

He chose the 2px-then-4px scale: **8, 10, 12, 14, 16, 20, 24, 28**, which is
what `dimension` already was, so a font size and a gap now come off the same
grid. The literal 4px grid was the other option and would have collapsed 244
of 250 declarations onto three sizes.

**Tenon v0.5.0** carries it. `2xs` is 8, `xs` 10, `xl` 20, `2xl` 24, `base`
(13) is gone, and `7xl` moved 59 to 56 so the largest figure on a page sits on
the 8-grid. Four semantic styles moved with it: `heading-2` 23 to 24,
`heading-3` 19 to 20, `body-sm` 13 to 12, `caption` 11 to 10. No component
reads a size primitive directly, so nothing under `src/components` was touched.
`text.title` is new, 56px bold, for the Reports headline.

**`to-dos` at `dd2113a`**, pushed: 280 font-size declarations across
`kanban/board.css` and the companion's two stylesheets now read
`--tenon-typography-size-*`. Six steps carry the whole application — 10, 12,
14, 16, 20, 56. All 40 `--tenon-` names either file reads were checked against
the emitted CSS and every one resolves. `npm test` passes, both builds pass.

**It has not been looked at in a browser.** Type moves by up to a pixel and a
half everywhere, which is the point, but nobody has seen it.

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
The verbatim repeats are gone and so is the type migration, so what remains is
deliberate — the column's two-layer shadow, the stat box sitting on the page
rather than raised, the card's hover border, the stat eyebrow one step
fainter.
