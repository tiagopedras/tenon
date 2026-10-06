# Tenon improvements

The standing list of what is still wrong with this app and what should be built
next. It holds the state of the tool, not the work.

Read it before diagnosing anything here. If a problem is already written down,
what is wanted is progress on the fix, not another report of the symptom. When
something lands or something new turns up, edit this file rather than only saying
so in chat.

Split below into Small — a sitting change, no new data model or view — and Big —
needs a decision, a new tag, or a new piece of the app before it can be built.

## Small

- **The Card in code still stacks tags and meta above the summary, where the Figma Card now puts the summary straight under the title.**
  `Card` in `src/components/Card/Card.tsx:98` renders head, then `tags`, then `meta`, then `summary`. The Figma Card (`Containers` page, component set `Card`) was re-laid out to eyebrow, head, summary, tags, meta. Matching it is a reorder of the three `row(...)` calls at lines 98 to 100. The margins in `src/components/Card/Card.css` are written against the old neighbours (`.tenon-card__summary` 125 at line 124, `.tenon-card__tags` 075, `.tenon-card__meta` 100), so the summary's top margin wants to drop to the head-to-tags distance and the tags row needs a top margin that follows the summary. Consumers pick the new order up on their next tag bump: the to-dos board's card and the plan card are the two that set all of `tags`, `meta` and `summary`.
  Build: Sonnet. Id `card-summary-under-title`.
  Files: `src/components/Card/Card.tsx`, `src/components/Card/Card.css`, `stories/Card.stories.tsx`.
  Tests: `npm run check`.
  Open: does the spacing between summary and tags stay at the current 075? Default: yes, reuse the existing 075 and 100 margins and only move the summary's 125 down to 075.

- **The 1984 theme never got the lighter warning text the dark theme did.**
  `text.warning` and `icon.warning` in `tokens/semantic/color.1984.json:185`
  and `:251` still alias `color.amber.350`, the value the 22 Sep change moved off in
  `color.dark.json`. The error pair was left alone there too. Moving both to the dark
  theme's steps (`color.amber.300`, `color.red.350`) keeps the three themes saying the
  same thing about how loud a warning is. It measures 7.24:1 on `background.warning-subtle`
  today, so contrast is no obstacle either way.
  Build: Sonnet. Id `1984-theme-warning-text`.
  Files: `tokens/semantic/color.1984.json`.
  Tests: `npm run tokens` (rebuilds the theme and reprints the contrast report).
  Open: none.

- **Three consumers are behind the current tag.** `npm run sync` on 25 Sep 2026 reports
  the to-dos board on v0.10.0, the companion (`to-dos/companion/package.json:15`) on
  v0.7.0, agents-dashboard (`agents-dashboard/package.json:15`) on v0.9.0, and ai_canvas
  with Tenon not installed at all, although `consumers.json` lists it. The first two are
  a pin bump and an `npm install` each, in their own repos. ai_canvas is an adoption
  rather than a bump and wants its own entry in that repo's backlog once it starts.
  Build: Opus. Id `tenon-consumers-behind-tag`.
  Files: `../../to-dos/package.json`, `../../to-dos/companion/package.json`,
  `../../agents-dashboard/package.json`.
  Tests: `npm run sync`.
  Open: none.

- **The build's contrast report never measures status text on its own subtle fill.**
  The check in `scripts/build.mjs:349` measures `text.*` and `icon.*` against
  `background.default` and `background.raised`, and `text.on-X` against `background.X`,
  but not `text.warning` on `background.warning-subtle`, which is where the chips put
  it. Measured by hand on 25 Sep 2026 every pair clears 4.5:1, light warning closest at
  4.67. A third loop pairing `text.X` with `background.X-subtle` would catch it the day a
  ramp step moves.
  Build: Sonnet. Id `contrast-check-status-subtle`.
  Files: `scripts/build.mjs`.
  Tests: `npm run tokens` (reprints the contrast report with the new pairing).
  Open: none.

- ~~**The warning and error text tokens are too heavy on dark surfaces, and the fix belongs in Tenon so every app gets it.**~~ **Built by the improvements agent, 22 Sep 2026.**
  `text.warning` and `text.error` in `tokens/semantic/color.dark.json:183` and
  `:191` alias `color.amber.350` and `color.red.400`, which read loud on the to-dos
  board's "needs scoring" and "urgent" chips. Moving them to `color.amber.300` and
  `color.red.350` lightens both, and in `tokens/semantic/color.light.json:186` and
  `:194` the matching step is `color.amber.600` and `color.red.600` in place of
  `.650`. The fills (`background.warning-subtle`, `background.error-subtle`) stay
  where they are. It moves every consumer of those two tokens at once, soon and
  overdue dates and placeholders included, which is the intent, so the urgent chip
  and the overdue date beside it stay the same red. Check the light pairs still
  clear 4.5:1 on their fills before building, then tag a minor version and bump
  the pin in `to-dos/package.json`. Sits next to the urgency-colours entry below,
  which covers the timeline bars rather than text.

- ~~**`Column` gives its body a class and no props, so a caller cannot make the body a drop target.**~~ **Built by the improvements agent, 22 Sep 2026.**
  `bodyClassName` in `src/components/Column/Column.tsx` reaches the body's
  `className` and nothing else, while `...rest` goes to the outer element. The
  to-dos board's `BoardView` needed handlers and a `data-tier` on the body, and
  had to put them on the whole column, which makes the head a drop target too.
  A `bodyProps` prop spread onto the `tenon-column__body` div, typed as
  `HTMLAttributes<HTMLDivElement>` and merged with `bodyClassName`, would let it
  move them back. It is a new prop and not a breaking one, so a minor version.

- ~~**The urgency colours are too saturated for a tag to use.**~~ **Built, 25 Sep 2026.**
  `color.base.urgent` and `color.base.soon` in `tokens/primitive/color.json` now
  alias `color.red.550` and `color.amber.600` instead of the full-chroma hexes,
  and their `$description` lines drop the "full chroma" wording. `.tenon-tag--urgent`
  and `.tenon-tag--soon` join the tone classes in `Tag.css`, using
  `--tenon-status-over` and `--tenon-status-soon` as the text colour on the neutral
  chip, the way `.tenon-tag--chart` does. `TagTone` in `Tag.tsx` gains both. Built
  as v0.10.0 — still need to bump the pin in `to-dos/package.json`.

## Big
