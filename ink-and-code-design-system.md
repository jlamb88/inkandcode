# Ink & Code Design System

Brand guide and design tokens for the Ink & Code website (inkandcode). Follow these rules when designing or writing code for the site. Values come from the site's CSS (`css/load.css` and the page stylesheets).

## Brand guide

Ink & Code is a small studio with two sides: **Ink** (brand and graphic design) and **Code** (websites, SEO, hosting). The visual system is one navy world with two accents: teal for code and precision, purple for ink and craft. Navy bands hold the voice; light bands hold the detail.

### Content fundamentals

- **Voice:** confident, short, a little swagger. Sentences are punchy fragments: "Your site loads in a flash. Users stay. Leads convert. No excuses." Headlines push back on a cliché: "Affordable Doesn't Mean Ordinary."
- **Person:** "we" for the studio, "you" for the client. Never "I".
- **Casing:** headings and CTA labels in Title Case ("Let's Create", "Our Story", "Fixed-Rate Packages"). Eyebrows are lowercase comments: `// what.we.do`.
- **Punctuation as brand:** a trailing teal slash on section and card titles ("Our Pricing/", "Branding & Identity/"). Numbered items read `01/`, `02/`.
- **Code-flavoured copy** belongs to the Code side only: dotted eyebrows (`// the.lineup`), shell prompts (`$ audit --site=…`), `✓` checks. The Ink side uses plain-word eyebrows and a handwritten Caveat aside instead.
- **No emoji.** Arrows are `➜` (U+279C); checks are `✓`.

### Color

- Ground the page in `navy` for header, hero and footer; content sections sit on `off-white` (`bg` light). The site's body runs a gradient from `navy-mid` through `navy` and `slate` to a light gray, so the top of every page is navy.
- `teal` is the signature accent: eyebrows, slashes, the CTA arrow pill, focus underlines. Use it as text only on navy. On light grounds it is decoration, never words.
- `purple` is the Ink accent: the CTA's hard drop shadow (`shadow-cta`), purple waves, text-shadows on feature lists. `purple-dark` is for deep inset shadows.
- `dark-green` is a deep blue in practice. Use it for links, CTA labels and Code-side labels on light grounds (6.6:1 on `off-white`).
- Text pairs: `text-head` and `text-body` on `bg`, `surface`, `surface-alt` in both themes. `white-soft` on `navy`. `slate-light` / `text-muted` only on navy, or as non-essential text at 24px+ on light (2.3:1 there).
- Plan tiers on Code have their own hues: `launch`, `liftoff`, `orbit`, `planetary`. Use them only to mark a tier.
- `alert` is for errors; `primary` is the form accent-color and toggle fill.

The **Navy** theme mirrors the site's navy bands (header, hero, footer, contact), not a dark mode the site ships.

### Type

Six Google Fonts faces, each with one job. Load them with
`https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&family=Poppins:wght@100..900&family=Raleway:wght@100..900&family=Caveat:wght@400..700&family=Orbit&family=Cascadia+Mono:wght@200..700&display=swap`.

- **Poppins** (`display`): h1 (`display-h1`), the default h2 (`h2-display`), hero words, form fields, terminal labels.
- **Raleway** (`headline`): big section titles (`section-title`, 700, tracking -0.03em) and card headings (`h3`).
- **Nunito** (`body`): everything you read. `body` is 21px on 28px; headline paragraphs use `body-light` (300).
- **Cascadia Mono** (`mono`): eyebrows, labels, numerals, terminal text. Always small, always tracked.
- **Caveat** (`script`): one handwritten aside per section, Ink side only.
- **Orbit** (`numerals`): hero numerals only.

Sizes are fluid in the source (CSS `clamp()`, root font-size 62.5% so 1rem = 10px). Each style lists its desktop size; its usage note gives the phone size. The source pins h1 and hero line-height at 30px, so keep those to one line.

### Spacing and layout

- Sections are 86vw wide, capped at `content-max` (1600px), centred, stacked as flex columns. Spacing inside is in `em`, so it scales with the fluid type.
- The page grid is header / hero / main / footer. The header is `header-height` tall (`header-height-wide` on wide screens).
- Grid gaps between cards are `grid-gap` (24px).
- Mobile first; layouts change at 900px.

### Shape, depth and motion

- Radii: pills (`radius-pill`) for buttons, `radius-card` for cards, `radius-lg` for windows and floating panels, `radius-input` for fields. Code plan cards cut two opposite corners only (`radius-plan`).
- Shadows are soft and tinted navy (`shadow-card`); hover lifts turn teal (`shadow-card-hover`). The CTA's `shadow-cta` is the one hard, offset shadow.
- Motion is short and eased: 0.2s for overlays and fields, 0.25–0.3s for colors and cards, 0.4s for the slide-out nav. Hover reveals are sweeps (the CTA pill widening, the card's teal edge growing). Respect reduced motion.
- Focus: show a 2px solid `teal` outline, 3px offset, on navy and light. The site does not ship one yet; this is the rule going forward.

### Imagery and iconography

- Logos are in **Logos**: full wordmark, mini mark, watermark. Inline the `currentColor` marks to color them.
- Icons are in **Icons**: the footer's white social and contact glyphs. There is no general UI icon set; use the `➜` and `✓` characters.
- Patterns are in **Patterns**: oblique teal and purple waves, one per section, matched to the side (Code teal, Ink purple).
- Hero art is illustration (SVG splash art and desk photography per page), set right-aligned and bleeding off the bottom of the hero.

### Not covered by this guide

Built from the local `inkandcode` folder at commit `dedfa82`. Components are static CSS renditions (`bundle.css`), not a script library; the site's header and footer are vanilla Web Components in `components.js` and are not included. Skipped: the hamburger and slide-out nav, the plan comparison chart on Code, the feature-list panel, city-page hero gradients (`#1a2d20` Augusta green), and the 86vw section width (not a token-able length). Fonts are hosted by Google Fonts, so no font files are stored. `archive/` was not read.

## Color tokens

Use the CSS custom property `--<name>`. Where a token has two values, the first is for light sections and the second for navy sections (header, hero, footer, contact).

| Token | Light | Navy | Usage |
|---|---|---|---|
| `navy` | `#1e1f50` | same | The brand ink. Header, hero and footer grounds; headings on light surfaces. |
| `navy-deep` | `#2b3457` | same | Second navy: terminal gradient end, raised panels on navy. |
| `navy-mid` | `#313b5f` | same | Top stop of the page's navy-to-light body gradient; surface-alt on navy. |
| `slate` | `#4b5566` | same | Body copy on light grounds; the mid stop of the body gradient. |
| `slate-light` | `#9da2ab` | same | Muted copy on navy (terminal descriptions, paths). Fails contrast on light grounds (2.3:1 on off-white): decorative only there. |
| `teal` | `#50e3c2` | same | The signature accent. Eyebrows, slash accents, CTA arrow pill, focus underline, Caveat notes, terminal prompt and checks. Text on navy only; never text on light (1.6:1). |
| `teal-glow` | `rgba(80, 227, 194, 0.35)` | same | Eyebrow rule gradient start; glow halos around teal elements. |
| `teal-dim` | `rgba(80, 227, 194, 0.15)` | same | Tinted fills and the terminal bar's bottom rule. |
| `teal-num` | `rgba(80, 227, 194, 0.55)` | same | Pricing-card index numerals (01/, 02/). Decorative: low contrast on white. |
| `teal-label` | `rgba(80, 227, 194, 0.65)` | same | Contact form labels on navy. |
| `teal-a08` | `rgba(80, 227, 194, 0.08)` | same | Contact field background on focus. |
| `purple` | `#8a7093` | same | The ink-side accent. CTA drop shadow, feature-list text shadow, purple wave pattern. 4.4:1 on white: avoid for small text. |
| `purple-dark` | `#531368` | same | Deep plum for inset shadows and the Ink (design) side's emphasis. |
| `dark-green` | `#0f5b8e` | same | Despite the name, a deep blue. Link color, CTA label, section-label text and rule on light grounds. 6.6:1 on off-white; about 2.5:1 on navy, so never text on navy. |
| `indigo` | `#4245ba` | same | Light-ground h2 accent (the source's --h2-light). |
| `primary` | `#196ec2` | same | Form accent-color, toggles and flash messages. |
| `alert` | `#df2020` | same | Error and destructive states only. |
| `white` | `#ffffff` | same | CTA pill fill, hero headline fill, terminal labels. |
| `white-soft` | `#ededed` | same | Light text on navy (nav links, footer headings, outline-text stroke). 13:1 on navy. |
| `off-white` | `#f4f4f2` | same | Light page ground under the content area. |
| `stone` | `#eceae8` | same | Alternate light band (surface-mid on Ink, surface-alt on city pages). |
| `white-a08` | `rgba(255, 255, 255, 0.08)` | same | Dividers between terminal lines. |
| `white-a10` | `rgba(255, 255, 255, 0.1)` | same | Ghost CTA fill; hairline borders on navy. |
| `white-a20` | `rgba(255, 255, 255, 0.2)` | same | Contact field background on navy. |
| `white-a25` | `rgba(255, 255, 255, 0.25)` | same | Ghost CTA arrow pill at rest. |
| `white-a35` | `rgba(255, 255, 255, 0.35)` | same | Ghost CTA border. |
| `placeholder` | `rgba(237, 237, 237, 0.5)` | same | Input placeholder text on navy. |
| `launch` | `#f43068` | same | Code plan tier: Launch. |
| `liftoff` | `#2c96de` | same | Code plan tier: Liftoff. |
| `orbit` | `#43c3a6` | same | Code plan tier: Orbit. |
| `planetary` | `#4245ba (= indigo)` | same | Code plan tier: Planetary (same value as indigo). |
| `term-red` | `#f4506e` | same | Terminal window dot 1. |
| `term-yellow` | `#f4c430` | same | Terminal window dot 2 (dot 3 is dark-green). |
| `bg` | `#f4f4f2` | `#1e1f50` | Page ground. Light content bands use off-white; hero, header and footer bands use navy. |
| `surface` | `#ffffff` | `#2b3457` | Cards and panels on bg. |
| `surface-alt` | `#eceae8` | `#313b5f` | Alternate band behind a section. |
| `border` | `rgba(30, 31, 80, 0.1)` | `rgba(255, 255, 255, 0.1)` | Hairline card and section borders. |
| `border-teal` | `rgba(80, 227, 194, 0.45)` | same | Card border on hover. |
| `text-head` | `#1e1f50` | `#ededed` | Headings on bg, surface and surface-alt. |
| `text-body` | `#4b5566` | `#ededed` | Running copy on bg and surface (7:1 light, 13:1 navy). |
| `text-muted` | `#9da2ab` | same | Captions and meta. Passes on navy (6:1); fails on light grounds (2.3:1), so use it there only at 24px+ or for non-essential text. |
| `link` | `#0f5b8e` | `#50e3c2` | Inline links and the footer contact line. |
| `on-teal` | `#0f5b8e` | same | Text and arrows on a teal fill (CTA arrow pill). |

## Typography

All faces load from Google Fonts. Root font-size is 62.5% (1rem = 10px). Sizes below are desktop values; usage notes give phone sizes.

| Family key | CSS stack |
|---|---|
| `display` | `"Poppins", sans-serif` |
| `headline` | `"Raleway", sans-serif` |
| `body` | `"Nunito", sans-serif` |
| `mono` | `"Cascadia Mono", monospace` |
| `script` | `"Caveat", cursive` |
| `numerals` | `"Orbit", monospace` |

### Display (`display`)

| Style | Size | Line height | Weight | Letter spacing | Usage |
|---|---|---|---|---|---|
| `display-h1` | 72px | 30px | 600 | 0.18px | Page h1. Fluid 48px → 72px (--fs-h1). The source pins line-height at 30px; keep h1s to one line. |
| `hero-text` | 37px | 30px | 600 | 0.18px | Stacked hero words on navy, outlined except the first (see OutlineText). Fluid 28px → 37px. |
| `h2-display` | 37px | 1.2 | 400 |  | Default h2. Fluid 28px → 37px (--fs-xl). |
| `field` | 15.5px | 1.4 | 300 |  | Contact form input text. |

### Headline (`headline`)

| Style | Size | Line height | Weight | Letter spacing | Usage |
|---|---|---|---|---|---|
| `section-title` | 75px | 1 | 700 | -0.03em | Big section titles on About and city pages. Fluid 35px → 75px. |
| `h3` | 24px | 1.15 | 700 | -0.02em | Card and service headings, often closed with a teal slash. |
| `menu-title` | 28px | 1.2 | 500 |  | Submenu titles in the slide-out nav. |

### Body (`body`)

| Style | Size | Line height | Weight | Letter spacing | Usage |
|---|---|---|---|---|---|
| `subheading` | 30px | 28px | 400 |  | Headline subheads (--fs-lg). Fluid 23px → 30px. |
| `body` | 21px | 28px | 400 |  | Running copy (--fs-base). Fluid 17px → 21px. |
| `body-light` | 21px | 28px | 300 |  | Headline paragraphs under an h2. |
| `card-copy` | 15px | 1.5 | 400 |  | Pricing-card paragraphs. |
| `small` | 16px | 1.4 | 400 |  | Small copy and terminal descriptions (--fs-sm). Fluid 13px → 16px. |
| `xs` | 12px | 1.4 | 400 |  | Legal and fine print (--fs-xs). |

### Mono (`mono`)

| Style | Size | Line height | Weight | Letter spacing | Usage |
|---|---|---|---|---|---|
| `eyebrow` | 12px | 1.4 | 400 | 0.16em | Section eyebrow, teal, above an h2. Lowercase, // prefix. |
| `section-label` | 13px | 1.4 | 400 | 0.2em | Code-side eyebrow in dark-green with a trailing rule. |
| `form-label` | 14px | 1.4 | 400 | 0.12em | Contact form labels in teal-label. |
| `index-num` | 16px | 1.4 | 400 |  | Pricing-card numerals in teal-num. |
| `terminal` | 16px | 1.4 | 400 | 0.03em | Terminal prompt and path. |

### Accents (`script`)

| Style | Size | Line height | Weight | Letter spacing | Usage |
|---|---|---|---|---|---|
| `caveat-note` | 26px | 1.2 | 500 |  | Handwritten aside in teal on the Ink (design) side. One per section at most. |
| `numbers` (numerals) | 14px | 30px | 400 | 0.08px | Orbit numerals in the hero. |

## Spacing and layout

| Token | Value | Usage |
|---|---|---|
| `body-padding` | `20px` | Page padding (10px under 900px on Home). |
| `grid-gap` | `24px` | Gap between plan cards and grid items on Code. |
| `plan-row` | `32px` | Row height in Code plan cards. |
| `header-height` | `80px` | Header bar height. |
| `header-height-wide` | `100px` | Header height at wide widths. |
| `nav-width` | `160px` | Desktop nav column width. |
| `plan-header` | `175px` | Header block height in Code plan cards. |
| `content-max` | `1600px` | Max width of section and main. Sections are 86vw wide up to this. |

## Corner radius

| Token | Value | Usage |
|---|---|---|
| `radius-xs` | `2px` | Hamburger bars. |
| `radius-sm` | `4px` | Selects. |
| `radius-input` | `6px` | Inputs, textareas, form buttons (top corners only on the contact page). |
| `radius-card` | `8px` | Pricing cards, slide-out nav panel. |
| `radius-lg` | `12px` | Terminal window, feature panel, floating hamburger. |
| `radius-plan` | `16px` | Code plan cards, on two opposite corners only (0 16px 0 16px). |
| `radius-pill` | `24px` | CTA buttons and their arrow pill. |
| `radius-round` | `50%` | Terminal dots and avatars. |

## Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-card` | `0 2px 14px rgba(30, 31, 80, 0.06)` | Pricing cards at rest. |
| `shadow-card-hover` | `0 6px 24px rgba(80, 227, 194, 0.1)` | Pricing cards on hover: a teal lift. |
| `shadow-cta` | `2px 2px 4px 0px #8a7093` | Solid CTA buttons: a hard purple offset. |
| `shadow-float` | `0 4px 12px rgba(0, 0, 0, 0.25)` | Floating hamburger button. |
| `shadow-terminal` | `0 6px 36px rgba(30, 31, 80, 0.6)` | Terminal window. |
| `shadow-material` | `0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)` | Generic raised element (--box-shadow). |
| `shadow-inset` | `0 1px 3px rgba(0, 0, 0, 0.14) inset` | Pressed or recessed controls. |

## Layering (z-index)

| Token | Value | Usage |
|---|---|---|
| `z-nav-overlay` | `199` | Blur overlay behind the open nav. |
| `z-navbar` | `205` | Slide-out nav panel. |
| `z-nav-toggle` | `210` | Hamburger toggle. |
| `z-header` | `1000` | Header bar and floating hamburger. |

## Components

Reference CSS for each component is in the "Component CSS" section at the end. Class names are prefixed `ic-`; on the live site the equivalents are `.cta-btn`, `.section-eyebrow`, `.section-label`, `.caveat-accent`, `.slash-accent`, `.pricing-card`, `.form-group`, and `.seo-terminal`.

### CtaButton

The site's one call-to-action: a white pill with a teal arrow pill that sweeps across the label on hover.

**Use** once per section, to move people toward contact or the next page ("Let's Create", "Our Story"). Use `.ic-cta--ghost` on navy bands, the solid form on light bands.

**You provide** an `<a>` (or `<button>`) with class `ic-cta`, a `.ic-cta__text` label of two or three words in title case, and a `.ic-cta__arrow` holding `&#x279C;` (➜).

**Behaviour.** On hover the arrow pill widens to 100% in 0.2s and the label turns `navy` on the `teal` sweep. Ghost: border `white-a35`, fill `white-a10`; on hover the pill turns `teal` and the label `navy`.

**Do** keep the label on one line. **Don't** put two solid CTAs side by side; pair a solid with a ghost.

**Accessibility.** Never put `white` text on the `teal` sweep (1.6:1); `navy` on `teal` reads clearly. The `:focus-visible` teal ring is an addition; the site had none. The source also writes `aria-role="button"`, which is not a real attribute; drop it for links.

Example markup:

```html
<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center;font-family:var(--font-body)">
  <div style="padding:24px;background:var(--off-white);border-radius:var(--radius-card)">
    <a href="#" class="ic-cta"><span class="ic-cta__text">Let's Create</span><span class="ic-cta__arrow">&#x279C;</span></a>
  </div>
  <div class="ic-navy" style="padding:24px;border-radius:var(--radius-card)">
    <a href="#" class="ic-cta ic-cta--ghost"><span class="ic-cta__text">Our Story</span><span class="ic-cta__arrow">&#x279C;</span></a>
  </div>
</div>
```

### Eyebrow

A small monospace line above a section heading, written like a code comment.

**Variants.** `.ic-eyebrow` (Ink and Home): `teal`, 12px, tracking 0.16em, a 48px `teal-glow` rule trailing off to the right. Use on navy. `.ic-label` (Code): `dark-green`, 13px, tracking 0.2em, a rule up to 160px. Use on light grounds.

**You provide** the text, lowercase, starting with `//`. Code-side labels join words with dots (`// what.we.build`); Ink-side ones use spaces and may lead with a section number (`01 // what we deliver`). Number only when the sections are a real sequence.

**Don't** use `.ic-eyebrow` on light grounds: `teal` text there is 1.6:1.

Example markup:

```html
<div style="display:grid;gap:16px">
  <div class="ic-navy" style="padding:20px 24px;border-radius:var(--radius-card)">
    <div class="ic-eyebrow">01 // what we deliver</div>
    <h2 style="margin:0;font-family:var(--font-display);font-weight:400;font-size:30px;color:var(--white-soft)">Stand out visually</h2>
  </div>
  <div style="padding:20px 24px;background:var(--off-white);border-radius:var(--radius-card)">
    <div class="ic-label">// the.lineup</div>
    <h2 style="margin:0;font-family:var(--font-headline);font-weight:700;font-size:34px;letter-spacing:-0.03em;line-height:1;color:var(--navy)">We Build</h2>
  </div>
</div>
```

### Accents

Three small type accents that give Ink & Code its voice: the Caveat note, the teal slash, and outlined hero words.

- `.ic-caveat`: a handwritten aside in `teal` Caveat 26px. At most one per section, on navy, on the Ink (design) side.
- `.ic-slash`: wrap a trailing `/` in an h3 or h2 ("Branding & Identity/", "Our Pricing/"). The slash is the brand's punctuation; use it on card titles and section heads.
- `.ic-hero-words`: stacked Poppins 600 words; the first is filled `white`, the rest are 0.8px `white` outlines. Navy grounds only. `.ic-outline` is the single-word version (1px `white-soft` stroke, 46px).

**You provide** the words. Outline text needs at least 28px to stay legible; keep anything a reader must read filled.

Example markup:

```html
<div class="ic-navy" style="padding:24px;border-radius:var(--radius-card);display:grid;gap:14px">
  <span class="ic-caveat">where ideas get inked</span>
  <h3 style="margin:0;font-family:var(--font-headline);font-weight:700;font-size:24px;letter-spacing:-0.02em;color:var(--white-soft)">Branding &amp; Identity<span class="ic-slash">/</span></h3>
  <div class="ic-hero-words"><span>Design.</span><span>Code.</span><span>Grow.</span></div>
</div>
```

### PricingCard

A white card for a pricing option or service, numbered in teal mono, that grows a teal edge on hover.

**You provide** a `.ic-pricing-card` containing a `.ic-pricing-card__num` (`01/`, `02/`), an `h3` and one short `p`. Lay cards in a grid with `grid-gap` (24px).

**States.** Rest: `surface`, 1px `border`, `radius-card`, `shadow-card`. Hover: border `border-teal`, `shadow-card-hover`, and a 3px `teal` bar grows top to bottom on the left edge in 0.3s.

**Do** keep copy to one or two sentences. **Don't** add buttons inside the card; put one CTA after the grid.

The numeral is `teal-num` (decorative, low contrast); the number is repeated by order, so nothing is lost.

Example markup:

```html
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;padding:16px;background:var(--bg)">
  <div class="ic-pricing-card">
    <div class="ic-pricing-card__num">01/</div>
    <h3>Fixed-Rate Packages</h3>
    <p>Simple, clear, and predictable. Know exactly what you're paying before we start.</p>
  </div>
  <div class="ic-pricing-card">
    <div class="ic-pricing-card__num">02/</div>
    <h3>Hourly Rates</h3>
    <p>Pay for the time spent, nothing more. Ideal for smaller updates or ongoing work.</p>
  </div>
</div>
```

### ContactField

A labelled input for the contact form, set on navy, with a mono teal label and a teal underline on focus.

**You provide** a `.ic-field` wrapper with a `label` (lowercase, one word) and one `input`, `select` or `textarea` with a matching `id`. Place fields in a single-column grid on a navy band.

**Styles.** Input: Poppins 300 at 15.5px, `white-soft` text on `white-a20`, a 1px `white-a10` bottom border, top corners `radius-input`. Focus: background `teal-a08`, bottom border `teal`. Placeholder: `placeholder`. Selects use a teal chevron as a background image in the source.

**Accessibility.** The label's `teal-label` passes on navy. The input's bottom border at rest is faint (`white-a10`); the fill carries the field's shape.

Example markup:

```html
<form class="ic-navy" style="padding:24px;border-radius:var(--radius-card);display:grid;gap:16px;max-width:420px" onsubmit="event.preventDefault()">
  <div class="ic-field"><label for="cf-name">name</label><input id="cf-name" type="text" placeholder="Jordan Smith"></div>
  <div class="ic-field"><label for="cf-email">email</label><input id="cf-email" type="email" placeholder="you@company.com"></div>
  <div class="ic-field"><label for="cf-msg">project</label><textarea id="cf-msg" rows="3" placeholder="Tell us what you want to build."></textarea></div>
</form>
```

### Terminal

A fake shell window that lists Code-side features as passed checks.

**You provide** a path (`seo_audit.sh`), a prompt line (`$ audit --site=inkandcode.com`), and two to four lines, each a `✓`, a short Poppins label and a one-sentence description.

**Styles.** Window: `navy` to `navy-deep` gradient, `radius-lg`, `shadow-terminal`. Bar dots: `term-red`, `term-yellow`, `dark-green`. Prompt, cursor and checks: `teal`; labels `white`; descriptions `slate-light`. The cursor blinks every 1.1s and stops under reduced motion.

**Use** only on the Code side. **Accessibility.** Don't set text in `dark-green` inside the window: on navy it is about 2.5:1. `dark-green` stays on the third window dot only.

Example markup:

```html
<div style="padding:16px;background:var(--off-white)">
<div class="ic-terminal">
  <div class="ic-terminal__bar">
    <span class="ic-terminal__dot ic-terminal__dot--r"></span><span class="ic-terminal__dot ic-terminal__dot--y"></span><span class="ic-terminal__dot ic-terminal__dot--g"></span>
    <span class="ic-terminal__path">seo_audit.sh</span>
  </div>
  <div class="ic-terminal__body">
    <p class="ic-terminal__prompt">$ audit --site=inkandcode.com <span class="ic-terminal__cursor">&#9612;</span></p>
    <div class="ic-terminal__line"><span class="ic-terminal__check">&#10003;</span><span class="ic-terminal__label">Speed that shreds</span><span class="ic-terminal__desc">Your site loads in a flash. Users stay. Leads convert. No excuses.</span></div>
    <div class="ic-terminal__line"><span class="ic-terminal__check">&#10003;</span><span class="ic-terminal__label">Mobile-first muscle</span><span class="ic-terminal__desc">A responsive site that plays loud and clear on every screen size.</span></div>
  </div>
</div>
</div>
```

## Assets

### Logos

The Ink & Code marks, copied from the site's `assets/` folder.

- `Full Logo.svg`: the full wordmark, filled black. On navy the site renders it inline and sets it to `white`; as an `<img>` it stays black, so use it on light grounds only.
- `mini-logo.svg`: the compact mark used at the top of the slide-out nav. Its ink is `currentColor`, so as an `<img>` it renders black. Inline it and set `color: var(--white)` on navy.
- `Watermark.svg`: the large background watermark, also `currentColor`. Set it inline at low opacity behind a section.

Give the full logo clear space of at least its own height on every side. Never recolor it to teal or purple.

### Icons

Contact and social icons from the site footer, each a single-color SVG.

- `email.svg`, `phone.svg`, `facebook.svg`, `Instagram.svg`, `linkedIn.svg`: white ink, for navy grounds (the footer). They disappear on light grounds.
- `X-icon.svg`: a close icon, red `#961010` ink, used on the Ink page.

Size social icons at 40–45px in the footer. There is no general UI icon set; arrows are the `➜` character (U+279C) and checks are `✓`.

### Patterns

The oblique wave patterns that separate the two sides of the brand.

- `wavesObliqGreen.svg`: teal (`#50E3C2`) waves for the Code side.
- `wavesObliqPurple.svg`: purple waves for the Ink (design) side.

Use one per section as a background accent, never both together. They are pictures, not content: keep text off them.

The asset files are in the site's `assets/` folder.

## Component CSS

```css
/* Ink & Code components. Static CSS renditions of the site's own rules
   (css/home.css, ink.css, code.css, contact.css, load.css), prefixed ic-. */

/* ---- Navy band: the ground most components sit on ---- */
.ic-navy {
  background: var(--navy);
  color: var(--white-soft);
}

/* ---- CtaButton (home.css .cta-btn) ---- */
.ic-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  padding-inline: 0.75em 2.5em;
  padding-block: 0.75em;
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  border: 0;
  border-radius: var(--radius-pill);
  background-color: var(--white);
  box-shadow: var(--shadow-cta);
  overflow: hidden;
  cursor: pointer;
  transition: color 0.3s ease;
}
.ic-cta__text {
  position: relative;
  white-space: nowrap;
  color: var(--dark-green);
  margin-inline-end: 1.5em;
  z-index: 10;
  transition: color 0.3s ease;
}
.ic-cta__arrow {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  padding-inline-end: 10px;
  background-color: var(--teal);
  color: var(--on-teal);
  font-size: 24px;
  font-weight: 400;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.2s ease;
  z-index: 1;
}
.ic-cta:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 3px;
}
@media (hover: hover) {
  .ic-cta:hover .ic-cta__arrow { width: 100%; }
  .ic-cta:hover .ic-cta__text { color: var(--navy); }
}
.ic-cta--ghost {
  background: var(--white-a10);
  border: 1.5px solid var(--white-a35);
  box-shadow: none;
}
.ic-cta--ghost .ic-cta__text { color: var(--white); }
.ic-cta--ghost .ic-cta__arrow {
  background: var(--white-a25);
  color: var(--white);
}
@media (hover: hover) {
  .ic-cta--ghost:hover .ic-cta__arrow { background: var(--teal); color: var(--navy); }
  .ic-cta--ghost:hover .ic-cta__text { color: var(--navy); }
}

/* ---- Eyebrow (ink.css .section-eyebrow, code.css .section-label) ---- */
.ic-eyebrow {
  display: flex;
  align-items: center;
  margin-bottom: 0.3em;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--teal);
}
.ic-eyebrow::after {
  content: "";
  display: inline-block;
  width: 48px;
  height: 1px;
  margin-inline-start: 0.6em;
  background: linear-gradient(to right, var(--teal-glow), transparent);
}
.ic-label {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 0.6em;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.2em;
  color: var(--dark-green);
}
.ic-label::after {
  content: "";
  flex: 1;
  height: 1px;
  max-width: 160px;
  background: linear-gradient(to right, var(--dark-green), transparent);
}

/* ---- Accents (ink.css .caveat-accent, .slash-accent; load.css .outline) ---- */
.ic-caveat {
  display: block;
  margin-bottom: 8px;
  font-family: var(--font-script);
  font-size: 26px;
  font-weight: 500;
  color: var(--teal);
}
.ic-slash { color: var(--teal); }
.ic-outline {
  font-size: 46px;
  -webkit-text-stroke: 1px var(--white-soft);
  color: transparent;
  margin-inline-end: 0.2em;
}
.ic-hero-words {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1em 0.3em;
  font-family: var(--font-display);
  font-size: 37px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 0.18px;
}
.ic-hero-words span {
  -webkit-text-stroke: 0.8px var(--white);
  color: transparent;
}
.ic-hero-words span:first-child {
  -webkit-text-stroke: 0;
  color: var(--white);
}

/* ---- PricingCard (home.css .pricing-card) ---- */
.ic-pricing-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 20px 40px;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.ic-pricing-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 0;
  background: var(--teal);
  transition: height 0.3s ease;
}
.ic-pricing-card:hover {
  border-color: var(--border-teal);
  box-shadow: var(--shadow-card-hover);
}
.ic-pricing-card:hover::before { height: 100%; }
.ic-pricing-card__num {
  margin-bottom: 0.75em;
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--teal-num);
}
.ic-pricing-card h3 {
  margin: 0 0 0.3em;
  font-family: var(--font-headline);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--text-head);
}
.ic-pricing-card p {
  margin: 0;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.5;
  color: var(--text-body);
}

/* ---- ContactField (contact.css .form-group) ---- */
.ic-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ic-field label {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.12em;
  color: var(--teal-label);
}
.ic-field input,
.ic-field select,
.ic-field textarea {
  width: 100%;
  padding: 0.5em 0.85em;
  font-family: var(--font-display);
  font-size: 15.5px;
  font-weight: 300;
  color: var(--white-soft);
  background: var(--white-a20);
  border: none;
  border-bottom: 1px solid var(--white-a10);
  border-radius: var(--radius-input) var(--radius-input) 0 0;
  transition: background 0.2s ease, border-color 0.2s ease;
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
}
.ic-field input::placeholder,
.ic-field textarea::placeholder { color: var(--placeholder); }
.ic-field input:focus,
.ic-field select:focus,
.ic-field textarea:focus {
  outline: none;
  background: var(--teal-a08);
  border-bottom-color: var(--teal);
}

/* ---- Terminal (code.css .seo-terminal) ---- */
.ic-terminal {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%);
  box-shadow: var(--shadow-terminal);
}
.ic-terminal__bar {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.7em 1em;
  background: rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid var(--teal-dim);
}
.ic-terminal__dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: var(--radius-round);
}
.ic-terminal__dot--r { background: var(--term-red); }
.ic-terminal__dot--y { background: var(--term-yellow); }
.ic-terminal__dot--g { background: var(--dark-green); }
.ic-terminal__path {
  margin-inline-start: 0.6em;
  font-family: var(--font-mono);
  font-size: 16px;
  letter-spacing: 0.05em;
  color: var(--slate-light);
}
.ic-terminal__body { padding: 1.4em 1.4em 1.6em; }
.ic-terminal__prompt {
  margin: 0 0 1.2em;
  font-family: var(--font-mono);
  font-size: 16px;
  letter-spacing: 0.03em;
  color: var(--teal);
}
.ic-terminal__cursor { animation: ic-blink 1.1s steps(1) infinite; }
@keyframes ic-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .ic-terminal__cursor { animation: none; } }
.ic-terminal__line {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.3em 0.7em;
  padding-block: 0 0.9em;
  margin-bottom: 0.9em;
  border-bottom: 1px solid var(--white-a08);
}
.ic-terminal__line:last-child { border-bottom: none; padding-block-end: 0; margin-bottom: 0; }
.ic-terminal__check {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--teal);
}
.ic-terminal__label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.2px;
  color: var(--white);
}
.ic-terminal__desc {
  flex-basis: 100%;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 140%;
  color: var(--slate-light);
}
```
