# Tenon's DESIGN.md

`DESIGN.md` at the root of this repo teaches an agent to build a page that looks
like one of the apps Tenon serves, when it is working somewhere that has no
Tenon setup to copy from: a fresh landing page for a side project, a one-off
dashboard, a prototype. This folder holds what supports it.

It was built with the `design-md-builder` skill on 11 Oct 2026, on the model
Vercel published at vercel.com/design.md, and ships with Tenon from v0.17.0.

## The two layers, and why the second one is small

Vercel's version, and an earlier design system's before this, each ship a
stylesheet that copies the design system's values into a new prefixed
vocabulary, because the real design system could not be reached from outside
its codebase. Tenon can. `tenon.css` and `tenon-react.css` are public, tagged,
and served from jsDelivr, and the component classes in `tenon-react.css` work
on plain HTML as well as through React. From v0.17.0 `tn-page.css` is served
from the same tag.

So the first layer is Tenon itself, linked rather than copied, and it can
never drift. The second, `assets/tn-page.css`, adds only what a whole page
needs and Tenon does not have: a page shell, an app layout with a sidebar, a
row of columns, marketing sections, a table, a stat row and a bar list. It
declares no colour, size or spacing of its own. Every value is a
`var(--tenon-*)` read, and its two widths come from Tenon's breakpoint tokens
(`breakpoint-xl` for the page, `breakpoint-sm` for reading width).

## Where the values came from

| Source | What it gave |
| --- | --- |
| `dist/tenon.css`, v0.16.1, built 8 Oct 2026, rechecked against v0.17.0 | Every token, light and dark, and the text style classes |
| `dist/tenon-react.css` and `src/components/*/*.tsx` | Component class names, their markup, variants and tones |
| Tenon's Figma library, read 11 Oct 2026 | Cross-check of variables (501 in 5 collections) and the 28 text styles |
| A task board's source, scanned 11 Oct 2026 | Usage counts, which decided what DESIGN.md stresses |

The usage counts that shaped it: `--tenon-typography-size-sm` at 236 reads and
`--tenon-text-faint` at 178 are the two most used tokens in that board, which is
why DESIGN.md calls quiet metadata part of the look. `tenon-column` at 268 and
`tenon-card` at 128 are the most used components, which is why `tn-board`
exists.

## Where code and Figma disagree

Figma and code now agree on Inter, loaded from Google Fonts through
`tenon.css`. One difference remains and Tiago has accepted it: Figma's
`text/heading-6` is uppercase, and the code's is not.

## The easiest mistake

Type too big. Tenon's body text is 14px and `heading-1` is 28px, because it was
built for a dense board. An agent reaching for 16px body copy and 40px headings
produces something that is not Tenon. It is enforced in four places: the CSS
(`tn-shell` maps plain `h1` to `h6` and `p` onto Tenon's text styles at zero
specificity), the typography section, the reflex list and the private review.

## Checked, and not checked

Checked on 11 Oct 2026:

- `examples/smoke-test.html` renders correctly in light and dark at 1440px and
  at 375px, in headless Brave. The 375px renders were taken inside a 375px
  iframe, since headless Chromium on macOS will not lay out below 500px.
- `check-names` passes: every `tn-*` class in DESIGN.md exists in
  `tn-page.css`, and every one in `tn-page.css` is documented.
- Every `tenon-*` class, modifier and token named in DESIGN.md exists in
  Tenon's built CSS.
- `check-page` finds no failures in the smoke test.

Rendering caught four bugs that reading did not:

1. The plain `h1` rule tied with `.tenon-title` on specificity and won by
   loading later, so the hero rendered at 28px. Every base rule is now wrapped
   in `:where()`, so any Tenon class beats it.
2. The same tie turned a `tenon-button` link's text blue on its blue fill.
3. `tn-app` had `min-height: 100vh`, which stretched a preview inside a page
   to the full screen. It now applies only when `tn-app` is the page itself.
4. `tn-bar-fill` was an inline `span`, so its height did nothing and no bar
   showed.

Not checked: most of the prose. Scenario 3, the landing page, has been run
twice (`evals/runs/`), and no other scenario has run. Treat every rule in it as
a starting position until `evals/` says otherwise.

## Known gaps

- Light and dark only. The 1984 theme exists in `tenon.css` but DESIGN.md
  tells agents not to use it unless asked.
- No icons and no logo. Tenon has neither, so pages use text labels and set
  the app's name as text.
- No chart primitives beyond `tn-bar-list`. The `--tenon-chart-*` tokens are
  there for a page that draws its own SVG with `tn-viz-*` classes.
- Found along the way, in Tenon itself: in dark mode, `tenon-tag--soon` text
  was barely readable on its fill. Fixed in v0.17.0, where every status tag
  clears 4.5:1 in all three themes and the build checks it.
