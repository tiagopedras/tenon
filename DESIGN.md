---
name: tenon-brand-guidelines
version: 0.2.0
updated: 2026-10-24
description: "Design, build, or substantially improve a page built on Tenon, the design system behind a small family of personal apps and sites, so it looks and feels like one of them. Covers two kinds of page: app screens, such as a board, a dashboard, a settings page or a tool someone works in every day, and marketing pages, such as a landing page for a side project or a page on a personal site. Use whenever a page needs Tenon's tokens, its dense type scale, its components as plain HTML or React, the tn-* page layer, and light and dark themes."
---

# Design pages like Tenon

Act as an excellent designer, editor, information architect and design engineer working on Tenon. Turn the available material into a page that looks as though it belongs beside the apps Tenon already serves. Shape the content and the interface together; do not restyle a data dump or assemble generic components.

## Tenon product and brand context

Tenon is the design system for a small family of personal apps and sites: a task board, an agents dashboard, a chat window, a personal site. Somebody should be able to open the result and take it for another screen of one of those.

Tenon pages come in two kinds, and the target look differs between them. Establish which one you are building before you start, and say which you assumed if nobody told you.

- **An app screen.** A board, a dashboard, a settings page, a log, a tool. The person is mid-task and came to get something done. Dense, quiet and fast to scan: small type, tight spacing, columns and cards, one accent. A calm editorial layout with big headings is the wrong answer here.
- **A marketing page.** A landing page for a side project, a page on a personal site. Its job is to get somebody to understand one thing and act on it. A hero with `tenon-title` is a legitimate pattern here. Everything below the hero goes back to Tenon's normal scale.

Whichever of the two, never manufacture confidence through hype, decoration or exaggerated claims, and never reach for a generic SaaS template look in place of Tenon's own.

Start with the reader's job, not the page category: what they need to understand, decide or do, and what earns it.

## Use this priority order

When requirements compete, protect them in this order:

1. Preserve supplied facts, names, numbers, privacy requirements and task constraints.
2. Preserve the caller's framework, routes, delivery surface and any Tenon setup already in the project.
3. Make the reader's job, and the answer or action that serves it, immediately clear.
4. Establish Tenon authorship through the shell, the dense type scale, the semantic tokens and Tenon's own components.
5. Choose a composition specific to this material and to which of the two page kinds it is.
6. Refine responsive behaviour, interaction and details without weakening the hierarchy.

Ask one grouped set of questions only when proceeding could change a number, a name, a privacy position or what the page asks the reader to do. Otherwise label the unknown honestly and proceed.

## Integrate with the caller's project

Preserve the host framework, file structure, routes, build system and output form. When no project exists, build the smallest runnable page: semantic HTML, CSS and a little JavaScript.

Tenon publishes its own CSS, and pages use it directly. There is no copied or translated token set. Load three stylesheets, in this order, once, at the nearest shared page boundary:

1. `tenon.css`: every `--tenon-*` token, light and dark, plus the text style classes.
2. `tenon-react.css`: every component's classes. They work on plain HTML as well as through React.
3. `tn-page.css`: the page layer documented below. It adds what Tenon does not have and declares no value of its own.

In a project with npm, install Tenon at a tag and import from the package:

```js
import '@tiagopedras/tenon/tenon.css';
import '@tiagopedras/tenon/tenon-react.css';
import '@tiagopedras/tenon/tn-page.css';
```

Standalone HTML links the tagged files:

```html
<link href="https://cdn.jsdelivr.net/gh/tiagopedras/tenon@v0.17.0/dist/tenon.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/tiagopedras/tenon@v0.17.0/dist/tenon-react.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/tiagopedras/tenon@v0.17.0/design-md/assets/tn-page.css" rel="stylesheet">
```

Keep all three on the same tag. If the CDN cannot be reached, copy `design-md/assets/tn-page.css` into the project unchanged. Never emit a `file://` URL, a placeholder URL or a CSS `@import`, and never read the stylesheets into context; use the names documented here.

Load no web font. Tenon's sans family is the system stack, so the page renders in the reader's system font.

In a React project, prefer the components (`Button`, `Card`, `Column`, `Stat`, `Field` and the rest) over their class names. Do not restyle a Tenon component to make one page work, and never add a parallel component layer.

Page-owned CSS uses only `tn-custom-*` for layout and `tn-viz-*` for visualisation marks, reads only semantic `--tenon-*` tokens, and never targets a published `tenon-*` or `tn-*` class. Never read a colour primitive such as `--tenon-color-blue-550` from page CSS; a page that does stops following the theme.

The network allowlist is the three stylesheets and user-supplied assets. Do not add chart libraries, icon kits, analytics or other scripts without being asked.

## Work in four passes

### Frame the reader's job

Inspect all available material before designing. Privately establish who opens this and what for, the answer or action that serves them, and what stays available without competing for the first read.

Never invent intent, urgency, numbers, testimonials, users or dates.

Anything the caller marks as private, such as real tasks, real names, real dates or real plans, never goes on a page. Use invented data in every example, every mock and every screenshot, and check a supplied screenshot for real names before using it.

### Choose the composition

The first viewport is the job. On an app screen that is the working surface itself: the board, the list, the controls. Do not put a heading block, a welcome message or a summary hero above it. On a marketing page it is one claim, one supporting sentence and at most two actions.

Before designing, privately name the obvious layout for this kind of page and reject it unless the material earns it. A dashboard need not be four stat boxes over a chart; a landing page need not be a hero over three feature cards.

Choose geometry before components. Magnitude or rank goes on a common scale (`tn-bar-list`). State or stage goes in columns (`tn-board` of `tenon-column`). Exact lookup goes in a table (`tn-table-wrap`). One headline number goes in a `tenon-stat`.

If every block has equal weight, redesign before coding.

### Authoritative Tenon visual system

Treat this section as the design authority. Tenon's CSS holds the exact values; this section says how to use them.

#### Authorship shell

Every standalone page uses this shell. Tenon has no logo, so `tn-identity` is the app's or site's name set as text. Never draw a mark, an emoji or an image in its place.

```html
<body class="tn-shell">
  <a class="tn-skip-link" href="#main">Skip to content</a>
  <div class="tn-page">
    <header class="tn-header">
      <a class="tn-identity" href="/">App name</a>
      <nav aria-label="Main"><ul class="tn-nav">
        <li><a href="#" aria-current="page">Board</a></li>
      </ul></nav>
    </header>
    <main id="main">...</main>
    <footer class="tn-footer">...</footer>
  </div>
</body>
```

An app screen with a sidebar replaces `tn-page` with `tn-app`, which holds a `tn-sidebar` and a `tn-main`. Inside `tn-main`, a `tn-toolbar` holds the view's title on the left and its controls on the right.

The theme follows the system. Do not add a visible theme control unless the caller asks for one, and do not use the 1984 theme unless asked.

#### Grid and alignment

`tn-page` caps the content at 1280px with 16px side padding, 32px from 768px up. `tn-grid` is 12 columns; `tn-col-4`, `tn-col-6`, `tn-col-8` and `tn-col-12` apply from 768px and everything stacks below. `tn-split` is a narrow column beside a wide one. `tn-reading` caps prose at 640px.

`tn-stack` stacks its children with a 16px gap and `tn-cluster` lays them in a wrapping row with an 8px gap. Use them before writing custom flex rules.

`tn-board` lays `tenon-column` elements side by side and scrolls sideways inside itself on a narrow screen, never pushing the page wider.

Every object aligns to a shared edge. Tables own the full width of their section. Space comes only from `--tenon-dimension-*` steps; 8px, 12px, 16px and 24px carry most of an app screen.

#### Typography and rhythm

Tenon is a dense system, and this is the single easiest thing to get wrong. Body text is 14px. `tenon-heading-1` is 28px. A page built on Tenon that reaches for 16px body copy and 40px section headings does not look like Tenon.

- App screens use `tenon-heading-3` to `tenon-heading-5` for view and section titles, `tenon-body` and `tenon-body-sm` for text, `tenon-label` for control and field names, `tenon-caption` for metadata. `tenon-title` never appears on an app screen.
- Marketing pages use `tenon-title` (56px) once, for the hero claim, and `tenon-heading-1` or `tenon-heading-2` for section heads. Nothing is ever larger than `tenon-title`.
- `tenon-code` for code, paths and identifiers only.

`tn-shell` already sets plain `h1` to `h6` and `p` to Tenon's text styles, so semantic HTML lands on the scale without classes. A class on the element overrides it.

Tenon has four weights: 400, 500, 600 and 700. Hierarchy comes from size, weight and colour together: `--tenon-text-default` for content, `--tenon-text-subtle` for secondary text, `--tenon-text-faint` for metadata. `--tenon-text-faint` is the most used text colour in Tenon's own apps; quiet metadata is part of the look.

Use `tn-numeric` for figures that line up in columns.

#### Colour, surfaces, and boundaries

The page sits on `--tenon-background-default`. Cards, columns and inputs sit on `--tenon-background-raised` with a one-pixel `--tenon-stroke-default` border. `--tenon-background-sunken` is for a sidebar or a recessed area. Prefer a border and a surface step to a shadow; `--tenon-elevation-*` is for things that float, such as a modal.

Blue is the one accent, and it marks the primary action, the current selection and links. One `tenon-button--primary` per view. Everything else is `tenon-button--secondary` or `tenon-button--ghost`.

Status colour means status. `success`, `warning`, `error` and `info` are for state, and `running` (orange) means an agent is working something. Never use amber for running or orange for warning. `--tenon-chart-1` to `--tenon-chart-10` are categorical colours for data and for labelling buckets.

Radii come from `--tenon-radius-*`: `default` (6px) for buttons and small controls, `lg` (12px) for cards and tables. A square corner reads as not-Tenon.

Hard reject decorative gradients, gradient text, glows, blobs, glass, textures and ornamental shadows.

#### Data and evidence

Show units and bases next to the number they qualify. Every bar in a `tn-bar-list` shares one scale, and its fill width encodes the value. A percentage gets its base beside it.

Tables are evidence:

- A semantic `<table>` inside one `tn-table-wrap`, with a caption, a head and a body.
- Right-align numeric columns, header included, with `data-numeric` on the `<th>` and every `<td>`.
- Group related rows rather than repeating a category in every row.

```html
<th scope="col" data-numeric>Per month</th>
<td data-numeric class="tn-numeric">£3</td>
```

#### Calculators and interaction

Interaction is part of the job, not decoration. Use Tenon's controls: `tenon-button` for actions, `tenon-field` for labelled inputs, `tenon-segmented` for a choice of views, `tenon-switch` for a setting that applies the moment it flips. A setting that needs a Save is a checkbox in a `tenon-field`.

`tenon-field` keeps its label and note with the control:

```html
<div class="tenon-field">
  <label class="tenon-field__label" for="email">Email address</label>
  <input class="tenon-field__control" id="email" type="email" aria-describedby="email-note">
  <span class="tenon-field__note" id="email-note">We never share it.</span>
</div>
```

Modal, window, dropdown, calendar, step slider and drag to reorder need Tenon's JavaScript. Use them through React, or not at all on a plain HTML page.

#### Motion and delight

Default to stillness. Motion only confirms a state change. Respect reduced motion. Delight on a Tenon page is a screen that answers the question without a second click.

#### Media and icons

Tenon has no icon set. Use text labels. Do not substitute emoji, an icon font or a downloaded SVG kit; where an icon would really help, say so to the caller. Use supplied screenshots only as evidence, never stock imagery or decorative illustration.

### Inspect and revise privately

Render the result when tooling exists. Check the first viewport, the full page, light and dark, and 375px.

1. **First read:** On an app screen, is the working surface in the first viewport? On a marketing page, is the claim and its action?
2. **Type size:** Is body text 14px? Is anything larger than `tenon-title`? Does `tenon-title` appear on an app screen?
3. **Composition:** Is there one dominant object? Is any empty space accidental?
4. **Components:** Is every button, card, column, tag, field and stat a Tenon one rather than a hand-rolled copy?
5. **Colour:** Is there one primary button per view? Does every status colour mean a status?
6. **Restraint:** Can any border, card, tag or section be removed without losing meaning? If yes, remove it.
7. **Themes and reflow:** Do light and dark hold the same hierarchy? Does the page work at 375px without overflow?
8. **Trust and access:** Are labels, focus, headings and alternatives sound? Is anything private on the page?

Fix the biggest problem, render again, and repeat. Deliver the page, not the review.

## Reject generated-design reflexes

Do not ship any of these:

- Body text at 16px or larger, section headings at 32px or larger, or anything larger than `tenon-title`.
- `tenon-title` or a hero on an app screen.
- All-caps or tracked eyebrows of the page's own, and decorative numbered section labels. The eyebrows inside `tenon-card` and `tenon-stat` are Tenon's and stay.
- Em dashes.
- Decorative gradients, glows, blobs, glass, ornamental shadows.
- A centred hero followed by a three-card feature grid.
- A row of four identical stat boxes where one composed relationship would be clearer.
- Hand-rolled buttons, cards or chips in place of Tenon's.
- More than one primary button in a view.
- Amber for an agent that is running, or orange for a warning.
- Emoji, icon tiles or a drawn logo.
- A narrow table floating in a wide section.
- Bars that do not share a scale.
- A visible theme switcher nobody asked for.
- Narration of how the page was built.

Restraint on Tenon is small type, quiet metadata and one accent, not empty space.

## Use the published CSS API

Put `tn-shell` on `<body>`, and `tn-page` or `tn-app` on the element that owns the content.

The page layer's shell and layout classes are:

`tn-shell`, `tn-page`, `tn-skip-link`, `tn-header`, `tn-identity`, `tn-nav`, `tn-footer`, `tn-app`, `tn-sidebar`, `tn-main`, `tn-toolbar`, `tn-board`, `tn-stack`, `tn-cluster`, `tn-grid`, `tn-col-4`, `tn-col-6`, `tn-col-8`, `tn-col-12`, `tn-split`, `tn-reading`.

The page layer's marketing classes are:

`tn-hero`, `tn-hero-lede`, `tn-hero-actions`, `tn-section`, `tn-section-head`, `tn-band`, `tn-feature-list`, `tn-feature`, `tn-feature-title`, `tn-feature-body`, `tn-inline-form`, `tn-inline-form-row`.

The page layer's evidence and type classes are:

`tn-table-wrap`, `tn-stat-strip`, `tn-bar-list`, `tn-bar`, `tn-bar-label`, `tn-bar-value`, `tn-bar-track`, `tn-bar-fill`, `tn-numeric`, `tn-visually-hidden`.

A `tn-hero` holds one `tenon-title` heading, one `tn-hero-lede` and one `tn-hero-actions`. A `tn-section` is a `<section>` holding a `tn-section-head` and its content; add `tn-band` to the same element to set it on a tinted strip. A short list of what a product does is a `tn-feature-list`, never a grid of cards:

```html
<ul class="tn-feature-list">
  <li class="tn-feature">
    <h3 class="tn-feature-title">Works offline</h3>
    <p class="tn-feature-body">Drop things on it anywhere.</p>
  </li>
</ul>
```

A single input with its button beside it, such as an email sign-up, is a `tn-inline-form`. It uses Tenon's field classes directly, without the `tenon-field` wrapper:

```html
<form class="tn-inline-form">
  <label class="tenon-field__label" for="email">Email address</label>
  <div class="tn-inline-form-row">
    <input class="tenon-field__control" id="email" type="email" aria-describedby="email-note">
    <button type="submit" class="tenon-button tenon-button--primary tenon-button--md">Join</button>
  </div>
  <span class="tenon-field__note" id="email-note">Used only to send you the beta.</span>
</form>
```

A `tn-stat-strip` holds `tenon-stat` elements. A `tn-bar-list` is a `<ul>` of `tn-bar` items, each with a label, a track holding a fill, and a value:

```html
<ul class="tn-bar-list" aria-label="Pages read by genre">
  <li class="tn-bar">
    <span class="tn-bar-label">Fiction</span>
    <span class="tn-bar-track"><span class="tn-bar-fill" style="width: 100%"></span></span>
    <span class="tn-bar-value">620</span>
  </li>
</ul>
```

Tenon's text style classes, from `tenon.css`, are `tenon-title`, `tenon-heading-1` to `tenon-heading-6`, `tenon-body`, `tenon-body-sm`, `tenon-label`, `tenon-caption`, `tenon-caption-sm` and `tenon-code`.

Tenon's components that work as plain HTML, from `tenon-react.css`, with their modifiers:

- `tenon-button` with `--primary`, `--secondary`, `--ghost`, `--danger`, `--confirm` or `--destructive`, and `--sm`, `--md` or `--lg`. Always give both a variant and a size.
- `tenon-card` with `--flat` or `--raised`, holding, in this order, an optional `tenon-card__eyebrow`, then `tenon-card__head` > `tenon-card__title`, then optional `tenon-card__summary`, `tenon-card__tags`, `tenon-card__meta`, `tenon-card__body`, `tenon-card__footer`. The summary sits straight under the title.
- `tenon-column` with an optional tone (`--accent`, `--success`, `--warning`, `--error`, `--running`), holding `tenon-column__head` > `tenon-column__head-row` > `tenon-column__head-start` (with `tenon-column__title`) and `tenon-column__head-end` (with `tenon-column__count`), then `tenon-column__body`.
- `tenon-stat` with an optional tone, holding `tenon-stat__eyebrow`, `tenon-stat__value`, `tenon-stat__caption`.
- `tenon-tag` with `--neutral`, `--accent`, `--success`, `--warning`, `--error`, `--info`, `--running`, `--urgent` or `--soon`.
- `tenon-pill` with `--neutral`, `--accent`, `--success`, `--warning` or `--error`.
- `tenon-badge` with `--accent`, `--neutral`, `--success`, `--warning`, `--error` or `--running`, holding a count.
- `tenon-alert` with `--neutral`, `--info`, `--success`, `--warning` or `--error`, holding `tenon-alert__title`, `tenon-alert__body` and optional `tenon-alert__actions`.
- `tenon-field`, holding `tenon-field__label`, `tenon-field__control` and `tenon-field__note`.
- `tenon-segmented`, a `role="radiogroup"` holding `tenon-segmented__option` buttons, the chosen one with `tenon-segmented__option--on`.
- `tenon-switch`, an empty `<button role="switch">`, with `tenon-switch--on` when on.

```html
<div class="tenon-stat tenon-stat--success">
  <span class="tenon-stat__eyebrow">Pages read</span>
  <span class="tenon-stat__value">1,240</span>
  <span class="tenon-stat__caption">up 18% on last month</span>
</div>
```

Use the exact names. Do not invent synonyms such as `tenon-stat__label`, and do not guess a `tn-*` or `tenon-*` class that is not listed here. If none fits, use semantic HTML and a page-owned `tn-custom-*` class.

Page-owned CSS may read only Tenon's semantic tokens:

- Backgrounds: `--tenon-background-*`, including `default`, `raised`, `sunken`, `subtle`, `hovered`, `selected`, `accent`, `neutral`, `inverse`, `input`, and each status with its `-subtle` tint.
- Text: `--tenon-text-default`, `--tenon-text-subtle`, `--tenon-text-faint`, `--tenon-text-accent`, `--tenon-text-link`, `--tenon-text-on-accent`, and each status with its `on-` pair.
- Strokes: `--tenon-stroke-default`, `--tenon-stroke-subtle`, `--tenon-stroke-strong`, `--tenon-stroke-accent`, `--tenon-stroke-focus`, and each status.
- Data: `--tenon-chart-1` to `--tenon-chart-10`.
- Text styles: `--tenon-text-<style>-size`, `-weight`, `-line-height`, `-family`, `-letter-spacing` for every style above.
- Shape and space: `--tenon-dimension-*`, `--tenon-radius-*`, `--tenon-elevation-*`, `--tenon-breakpoint-*`.

Never invent, alias or redeclare a `--tenon-*` token, and never read a `--tenon-color-*` primitive.

## Accessibility and responsive behaviour

Use landmarks, one descriptive `h1`, ordered headings, the skip link, native controls, semantic tables, accessible names and visible focus. Meet WCAG 2.2 AA and never rely on colour alone. Source order is reading order.

Do not hide page overflow. Give grid and flex children `min-width: 0`. The page must work in light and dark and from 375px up.

The target is Tenon judgment, not Tenon decoration.
