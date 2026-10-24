# Evals

No full round has run yet. Every prose rule in `DESIGN.md` is a starting
position until one has. Scenario 3 has two single runs, recorded under
`runs/` and summarised at the end of this file.

## Scenarios

Four scenarios, confirmed on 24 Oct 2026 as the pages that get built most:

1. **A board view.** Columns of cards for items moving through stages, with a
   count per column and a toolbar. Read by the person working the list.
2. **A settings or dashboard screen.** Switches, a schedule, a recent log. Read
   by the person running the tool, to change something and leave.
3. **A landing page for a side project.** A hero, what it does, one call to
   action. Read by a stranger deciding whether to try it.
4. **A personal site page.** A case study with a short story, some evidence and
   images. Read by someone deciding whether to get in touch.

Freeze the prompt, the mock inputs and the viewport for each. Between rounds,
only `DESIGN.md` and `assets/tn-page.css` change. Use mock data: no real
tasks, no real names, no real dates.

## First comparison

Before anything else, generate scenario 3 twice with the same model, prompt
and viewport: once without `DESIGN.md`, once with it. Keep both first attempts,
no re-rolls. Shuffle them and judge blind: the supplied facts survived, the
reader's job is clear, and the type stayed on Tenon's scale.

## What a round is

Generate every scenario against the current file, on at least two models, and
review the renders side by side. Record the file version, the model and every
correction against the exact run that produced it.

## Mechanical checks

`check-page.mjs` from the design-md-builder skill already catches:

- em dashes;
- colour and font-size literals in page CSS that bypass the tokens;
- a skipped heading level, or more than one `h1`;
- a `tn-*` class used on the page that `tn-page.css` does not publish.

Still to automate, in a browser:

- horizontal overflow on the body at 375px;
- a table narrower than its section;
- text contrast below WCAG AA;
- body text computed above 14px, or any text above 56px;
- more than one `tenon-button--primary` in a view;
- a `tenon-*` class that Tenon's CSS does not publish (the current check only
  covers `tn-*`).

## The rule for adding a rule

A correction lands only after the same failure appears in more than one run,
and in the narrowest place that can enforce it: prose for judgment, the
stylesheet for reusable mechanics, a check for anything a machine can catch.
A failure in one model only stays out until it repeats. A rule that cannot
name the failure it prevents comes out.

## Runs so far

Both runs are scenario 3, one model, one first attempt each, judged by eye
from the three renders in each folder. Neither is blind: the generator had
seen DESIGN.md's history.

**`runs/2026-10-11-landing/`, DESIGN.md 0.1.0 on Tenon v0.16.1.** Facts
survived and the type stayed on Tenon's scale. It hand-rolled the two things
the page layer lacked, a facts list and a sign-up row, as `tn-custom-*`
classes, used a secondary button for the sign-up so the hero could keep the
primary, and borrowed "Used only to send you the beta" from DESIGN.md's own
example, a privacy promise nobody supplied. Those gaps became
`tn-feature-list` and `tn-inline-form`.

**`runs/2026-10-24-landing/`, DESIGN.md 0.2.0 on Tenon v0.17.0.** No
page-owned CSS at all: the three facts are a `tn-feature-list` and the sign-up
is a `tn-inline-form` inside `tn-hero-actions`, so the one primary button is
the sign-up and sits in the first viewport. Every supplied fact is on the
page, and the number carries its base. Still invented: the headline wording,
the section heading's paraphrase, "on screen or on paper", "for the Mac" in
the footer, and two nav labels. The headline number appears twice, once as
a `tenon-stat` and again as the heading beside it. Rendering it found two
bugs in `tn-page.css`, both fixed in 0.2.0: a `tn-inline-form` inside
`tn-hero-actions` shrank to its content, and the last `tn-feature` drew a
rule straight above the next section's.
