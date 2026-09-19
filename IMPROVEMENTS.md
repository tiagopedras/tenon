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

- **There is no Storybook, so the only place to see a component is one hand-written page.**
  `playground/main.tsx` is a single 284-line `App` that lays out every component
  in `Row`s by hand, run by `npm run dev` through `vite.playground.ts`, and a new
  component or variant shows up there only when someone remembers to add it. The
  Storybook replaces it, with one `stories/<Component>.stories.tsx` per component
  in a new top-level `stories/` folder rather than beside the components, so
  `tsconfig.json` gains `"stories"` in `include` (`npm run check` then type-checks
  them) while the `dts()` plugin in `vite.config.ts` keeps `include: ['src']` and
  never emits them into `dist/types`. The variant, size and tone unions in files
  like `Button.tsx:5` become controls, and the JSDoc already on props (`iconOnly`
  in `ButtonProps`) feeds the docs page. `.storybook/preview.ts` imports
  `../dist/tenon.css` the way `playground/main.tsx` does, so stories render
  against the built token file consumers get, and a toolbar global for
  system, light and dark drives `data-theme` on `document.documentElement` in a
  decorator, the same switch `next()` makes today. The `storybook` script runs
  `npm run tokens` first so that file exists. Storybook gets its own
  `vite.storybook.ts` with the React plugin only, named in `.storybook/main.ts`
  through `viteConfigPath`, since the default lookup would find the library-mode
  `vite.config.ts`.

  Once every component has a story, `playground/`, `vite.playground.ts` and the
  `dev` script go, `npm run dev` starts Storybook on the same port 5199, and the
  README lines that describe the playground (the build block near line 119, the
  `localhost:5199` block near 229 and the paragraph on hard-coded values near 259)
  are rewritten to say Storybook. Storybook 10.6.0 (`@storybook/react-vite`)
  lists Vite `^8.0.0` in its peer range and the repo is on 8.3.0, so it installs
  as the current release without pinning anything older.
