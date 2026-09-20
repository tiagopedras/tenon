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

- **`Column` gives its body a class and no props, so a caller cannot make the body a drop target.**
  `bodyClassName` in `src/components/Column/Column.tsx` reaches the body's
  `className` and nothing else, while `...rest` goes to the outer element. The
  to-dos board's `BoardView` needed handlers and a `data-tier` on the body, and
  had to put them on the whole column, which makes the head a drop target too.
  A `bodyProps` prop spread onto the `tenon-column__body` div, typed as
  `HTMLAttributes<HTMLDivElement>` and merged with `bodyClassName`, would let it
  move them back. It is a new prop and not a breaking one, so a minor version.

- **The urgency colours are too saturated for a tag to use.** `color.base.urgent`
  (`#ff1e2d`) and `color.base.soon` (`#ffa600`) in `tokens/primitive/color.json:1357`
  are full chroma and carry `$description` lines saying fills only, never text;
  `color.status.over` and `color.status.soon` in `tokens/semantic/color.light.json:362`
  alias them straight through, same in both themes. Picking quieter values for
  those two hexes is the whole change — the names, the aliases and the timeline
  wiring stay as they are, and the `$description` lines get their "full chroma"
  wording dropped. Then `.tenon-tag--urgent` and `.tenon-tag--soon` join the tone
  classes in `Tag.css`, using `--tenon-status-over` and `--tenon-status-soon` as
  the text colour on the neutral chip the way `.tenon-tag--chart` already does.
  Check the timeline bars still read as urgent at the new values before running
  the build.

## Big
