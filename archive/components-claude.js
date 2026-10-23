class Header extends HTMLElement {
  constructor() {
    super();
    this._keyHandler = null;
    this._resizeHandler = null;
  }

  connectedCallback() {
    this._injectStyles();
    this.innerHTML = this._template();
    this._init();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._keyHandler);
    window.removeEventListener('resize', this._resizeHandler);
  }

  /* ─── Extra CSS (injected once) ──────────────────────────────────────
     The <header> markup below is the original checkbox header (plus a small
     teal eyebrow inside each submenu title), so the desktop menu layout,
     fonts, hover-to-open and full-screen submenus still come from the site's
     global CSS exactly as before.
     This block adds:
       0. a teal layer on the desktop menu (underlines, eyebrows, slide-out)
       1. the slide-in mobile panel + overlay (they live OUTSIDE <header>)
       2. a rule that keeps the old CSS-only mobile card out of the way
       3. a small right offset for the floating hamburger
  ──────────────────────────────────────────────────────────────────── */
  _injectStyles() {
    if (document.getElementById('ink-header-styles')) return;
    const s = document.createElement('style');
    s.id = 'ink-header-styles';
    s.textContent = `
:root {
  --hdr-teal:        #50e3c2;
  --hdr-white:       #ededed;
  --hdr-ease:        cubic-bezier(0.4, 0, 0.2, 1);
  --hdr-float-right: 2rem;      /* floating hamburger: distance from right edge */
}

/* 3 ── floating hamburger offset (beats the global ".header #hamburger.floating") */
header-comp .header #hamburger.floating {
  right: var(--hdr-float-right);
  margin-inline: 0;
}

/* 2 ── while the slide-in panel is open, suppress the old checkbox-driven
        card and overlay (the checkbox is still ticked so the hamburger
        keeps its X animation) and tuck the logo away */
header-comp .header.mobile-open .navbar,
header-comp .header.mobile-open .nav-overlay { display: none !important; }
header-comp .header .header-logo { transition: opacity 0.25s var(--hdr-ease); }
header-comp .header.mobile-open .header-logo { opacity: 0; pointer-events: none; }

/* ── Desktop teal layer ───────────────────────────────────────────────
   Additive only: colour, pseudo-elements, transitions. Layout, hover-to-open
   and the full-screen submenus still come from the site's own CSS. */
@media screen and (min-width: 900px) {

  /* top-level items: teal + underline that draws in from the left */
  header-comp .header .navbar .has-submenu > label,
  header-comp .header .navbar .nav-items > li > a {
    position: relative;
    transition: color 0.2s;
  }
  header-comp .header .navbar .has-submenu > label::after,
  header-comp .header .navbar .nav-items > li > a::after {
    content: '';
    position: absolute;
    left: 0; right: 0; bottom: -2px;
    height: 1.5px;
    background: var(--hdr-teal);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s var(--hdr-ease);
    pointer-events: none;
  }
  header-comp .header .navbar .has-submenu:hover > label,
  header-comp .header .navbar .submenu-toggle:checked + label,
  header-comp .header .navbar .nav-items > li > a:hover,
  header-comp .header .navbar .nav-items > li > a:focus-visible {
    color: var(--hdr-teal);
  }
  header-comp .header .navbar .has-submenu:hover > label::after,
  header-comp .header .navbar .submenu-toggle:checked + label::after,
  header-comp .header .navbar .nav-items > li > a:hover::after,
  header-comp .header .navbar .nav-items > li > a:focus-visible::after {
    transform: scaleX(1);
  }
  header-comp .header .navbar .has-submenu:hover > label .chevron,
  header-comp .header .navbar .submenu-toggle:checked + label .chevron {
    color: var(--hdr-teal);
  }

  /* submenu main title: teal eyebrow above it */
  header-comp .header .navbar .menu-title .menu-eyebrow {
    display: block;
    font-family: 'Cascadia Mono', monospace;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.15em;
    line-height: 1.4;
    color: var(--hdr-teal);
    opacity: 0.85;
    margin-bottom: 0.4em;
  }
  header-comp .header .navbar .menu-title a { transition: color 0.2s; }
  header-comp .header .navbar .menu-title a:hover,
  header-comp .header .navbar .menu-title a:focus-visible { color: var(--hdr-teal); }

  /* submenu items: teal + a line that slides out ahead of the text */
  header-comp .header .navbar .menu-items li a {
    display: inline-flex;
    align-items: center;
    transition: color 0.2s;
  }
  header-comp .header .navbar .menu-items li a::before {
    content: '';
    flex-shrink: 0;
    width: 0;
    height: 1.5px;
    margin-right: 0;
    background: var(--hdr-teal);
    transition: width 0.25s var(--hdr-ease), margin-right 0.25s var(--hdr-ease);
  }
  header-comp .header .navbar .menu-items li a:hover,
  header-comp .header .navbar .menu-items li a:focus-visible { color: var(--hdr-teal); }
  header-comp .header .navbar .menu-items li a:hover::before,
  header-comp .header .navbar .menu-items li a:focus-visible::before {
    width: 18px;
    margin-right: 0.5em;
  }
}

/* 1 ── mobile overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 998;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.35s var(--hdr-ease), visibility 0s 0.35s;
}
.mobile-overlay.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 0.35s var(--hdr-ease);
}

/* 1 ── mobile panel */
.mobile-menu {
  position: fixed;
  top: 0; right: 0;
  width: min(340px, 88vw);
  height: 100dvh;
  background: linear-gradient(160deg, #2b3457 0%, #1e1f50 50%, #313b5f 100%);
  z-index: 999;
  padding: calc(var(--header-height, 8rem) + 2em) 2em 3em;
  overflow-y: auto;
  transform: translateX(100%);
  visibility: hidden;
  transition: transform 0.4s var(--hdr-ease), visibility 0s 0.4s;
}
.mobile-menu.open {
  transform: translateX(0);
  visibility: visible;
  transition: transform 0.4s var(--hdr-ease);
}

.mobile-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
}

.mobile-nav-items {
  list-style: none;
  margin: 0; padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.mobile-menu.open .mobile-nav-items > li {
  animation: mobileFadeUp 0.45s var(--hdr-ease) both;
}
.mobile-menu.open .mobile-nav-items > li:nth-child(1) { animation-delay: 0.05s; }
.mobile-menu.open .mobile-nav-items > li:nth-child(2) { animation-delay: 0.12s; }
.mobile-menu.open .mobile-nav-items > li:nth-child(3) { animation-delay: 0.19s; }
.mobile-menu.open .mobile-nav-items > li:nth-child(4) { animation-delay: 0.26s; }

@keyframes mobileFadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.mobile-trigger {
  font-family: 'Raleway', sans-serif;
  font-size: 2.4rem;
  color: var(--hdr-white);
  letter-spacing: -0.02em;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0.3em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  transition: color 0.2s;
}
.mobile-trigger span {
  font-size: 1.6rem;
  transition: transform 0.25s var(--hdr-ease);
  display: inline-block;
}
.mobile-has-submenu.open .mobile-trigger { color: var(--hdr-teal); }
.mobile-has-submenu.open .mobile-trigger span { transform: rotate(180deg); }

.mobile-link {
  font-family: 'Raleway', sans-serif;
  font-size: 2.4rem;
  color: var(--hdr-white);
  letter-spacing: -0.02em;
  text-decoration: none;
  display: block;
  padding: 0.3em 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  transition: color 0.2s, padding-left 0.2s;
}
.mobile-link:hover { color: var(--hdr-teal); padding-left: 0.3em; }

.mobile-submenu {
  list-style: none;
  margin: 0 0 0 0.75em;
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s var(--hdr-ease);
  border-left: 2px solid var(--hdr-teal);
}
.mobile-has-submenu.open .mobile-submenu { max-height: 300px; }
.mobile-submenu a {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: rgba(237, 237, 237, 0.65);
  text-decoration: none;
  display: block;
  padding: 0.55em 1.2em;
  transition: color 0.2s;
}
.mobile-submenu a:hover { color: var(--hdr-teal); }
    `;
    document.head.appendChild(s);
  }

  /* ─── HTML template ──────────────────────────────────────────────── */
  _template() {
    return `
    
<header class="header">
  <div class="header-logo">
  <a href="/home.html" role="menuitem">
    <svg aria-label="Logo" role="img"viewBox="0 0 367 91">
      <use href="#logo" />
    </svg>
    </a>
  </div>
  <div class="header-nav">
    <input 
      type="checkbox" id="nav-toggle" class="nav-toggle"
      aria-controls="navbar">
    <label 
      for="nav-toggle" 
      class="nav-toggle-label" 
      id="hamburger"
      aria-label="navigation menu">
      <span></span>
      <span></span>
      <span></span>
    </label>
    <div class="nav-overlay"></div>
    <nav class="navbar">
      <svg class="mini-logo">
        <use href="assets/logos.svg#miniLogo">
      </svg>
      <ul class="nav-items">
        <li class="has-submenu">
          <input type="checkbox" id="ink-toggle" class="submenu-toggle"
          aria-haspopup="true">
          <label for="ink-toggle">
            Ink <span class="chevron">&#x25BE;</span>  <!-- Unicode ▼ -->
          </label>
          <ul class="submenu" role="menu">
            <div class="menu-title">
            <span><small class="menu-eyebrow" aria-hidden="true">// design</small><a href='ink.html' refer='noreferer' role='menuitem'>Graphic Design</span>
            </div>
            <div class="menu-items">
              <li><a href="ink.html#branding" refer='noreferer' role="menuitem">Brand Design</a></li>
              <li><a href="code.html" refer='noreferer' role="menuitem">Web Design</a></li>
              <li><a href="ink.html#graphic-design" refer='noreferer' role="menuitem">Print Media</a></li>
            </div>
          </ul>
        </li>
        <li class="has-submenu">
          <input type="checkbox" id="code-toggle" class="submenu-toggle">
          <label for="code-toggle">
            Code <span class="chevron">&#x25BE;</span>
          </label>
          <ul class="submenu">
          <div class="menu-title">
            <span><small class="menu-eyebrow" aria-hidden="true">// dev</small><a href='code.html' refer='noreferer' role='menuitem'>Web Services</span>
          </div>
            <div class="menu-items">
              <li><a refer='noreferer' role='menuitem' href="code.html/#webdevelop">Web Development</a></li>
              <li><a refer='noreferer' role='menuitem' href="code.html/#SEO">SEO & Performance</a></li>
              <li><a refer='noreferer' role='menuitem' href="code.html/#hosting">Web Hosting & Maintenance</a></li>
            </div>
          </ul>
        </li>
        <li><a refer='noreferer' role='menuitem' href="about.html">CTRL + Us</a></li>
        <li><a refer='noreferer' role='menuitem' href="#contact">Hit Us Up</a></li>
  </ul>
</nav>
</div>

    </header>

<div class="mobile-overlay" id="mobile-overlay" aria-hidden="true"></div>

<div class="mobile-menu" id="mobile-menu" aria-hidden="true" role="dialog" aria-label="Navigation menu">
  <div class="mobile-grain" aria-hidden="true"></div>
  <nav class="mobile-nav" aria-label="Mobile navigation">
    <ul class="mobile-nav-items">

      <li class="mobile-has-submenu">
        <button class="mobile-trigger" aria-expanded="false">
          Ink <span aria-hidden="true">&#x25BE;</span>
        </button>
        <ul class="mobile-submenu">
          <li><a href="ink.html">Graphic Design</a></li>
          <li><a href="ink.html#branding">Brand Design</a></li>
          <li><a href="code.html">Web Design</a></li>
          <li><a href="ink.html#graphic-design">Print Media</a></li>
        </ul>
      </li>

      <li class="mobile-has-submenu">
        <button class="mobile-trigger" aria-expanded="false">
          Code <span aria-hidden="true">&#x25BE;</span>
        </button>
        <ul class="mobile-submenu">
          <li><a href="code.html">Web Services</a></li>
          <li><a href="code.html/#webdevelop">Web Development</a></li>
          <li><a href="code.html/#SEO">SEO &amp; Performance</a></li>
          <li><a href="code.html/#hosting">Web Hosting &amp; Maintenance</a></li>
        </ul>
      </li>

      <li><a href="about.html" class="mobile-link">CTRL + Us</a></li>
      <li><a href="#contact"   class="mobile-link">Hit Us Up</a></li>

    </ul>
  </nav>
</div>
    `;
  }

  /* ─── Behaviour: mobile panel only (desktop menu is pure CSS) ─────── */
  _init() {
    const header = this.querySelector('.header');
    const toggle = this.querySelector('#nav-toggle');        // original checkbox
    const label = this.querySelector('#hamburger');          // original hamburger label
    const menu = this.querySelector('#mobile-menu');
    const overlay = this.querySelector('#mobile-overlay');

    const isOpen = () => menu.classList.contains('open');
    const open = () => {
      toggle.checked = true;                  // keeps the original X animation
      header.classList.add('mobile-open');
      menu.classList.add('open');
      menu.removeAttribute('aria-hidden');
      overlay.classList.add('open');
      overlay.removeAttribute('aria-hidden');
      label.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      toggle.checked = false;
      header.classList.remove('mobile-open');
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      label.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    /* Hamburger: open our panel instead of the CSS-only card */
    label.setAttribute('role', 'button');
    label.setAttribute('aria-expanded', 'false');
    label.setAttribute('aria-controls', 'mobile-menu');
    label.tabIndex = 0;
    label.addEventListener('click', e => {
      e.preventDefault();                     // stop the label ticking the checkbox itself
      isOpen() ? close() : open();
    });
    label.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); label.click(); }
    });

    overlay.addEventListener('click', close);

    this._keyHandler = e => { if (e.key === 'Escape' && isOpen()) close(); };
    document.addEventListener('keydown', this._keyHandler);

    /* If the hamburger disappears (window grew to desktop width), close the panel */
    this._resizeHandler = () => {
      if (isOpen() && getComputedStyle(label).display === 'none') close();
    };
    window.addEventListener('resize', this._resizeHandler);

    /* Accordion */
    this.querySelectorAll('.mobile-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const li = trigger.closest('.mobile-has-submenu');
        const wasOpen = li.classList.contains('open');
        this.querySelectorAll('.mobile-has-submenu.open').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.mobile-trigger').setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          li.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* Choosing a link closes the panel */
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }
}

customElements.define('header-comp', Header);

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="footer-wrapper">
      <img class="waves" src="../assets/wavesObliqPurple.svg" width="100%"
      />
      <section class="contact" id="contact">
        <div class="headline">
          <span>Get In Touch</span>
          <h2>Ready To Collaborate?</h2>
        </div>
        <script type="text/javascript"> var submitted=false</script>
        <iframe
          name="hiddenSubmit"
          id="hiddenSubmit"
          style="display: none;"
          onload="if(submitted)
          {window.location='submit.html'};">
        </iframe>
        <form
          class="contact-form"
          action="https://docs.google.com/forms/d/e/1FAIpQLSdGSbl2NHThGbI2LvTBIf-UBqRXg71cmHLuW-JlBYoeza8rBQ/formResponse"
          method="post"
          target="hiddenSubmit"
          onSubmit="submitted=true"
          >
          <input type="text" name="entry.2005620554" placeholder="Name*">
          <input type="email" name="entry.1045781291" placeholder="Email*">
          <input type="tel" name="entry.1166974658" placeholder="Phone">

          <label for="entry.839337160">I Want To Talk About...</label>
          <select name="entry.839337160" id="entry.839337160">
            <option value="Making A Website">Making A Website</option>
            <option value="Updating My Website">Updating My Website</option>
            <option value="Improving My Searches">Improving My Searches</option>
            <option value="Designing Something Pretty">Designing Something Pretty</option>
            <option value="Hosting and Maintaining My Website">Hosting and Maintaining My Website</select>
          </select>
          <textarea name="entry.1389680958" placeholder="Your Message or Questions"></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
      <footer class="footer">
        <div class="footer-logo">
          <svg alt="Logo">
            <use href="#logo"></use>
          </svg>
        </div>
        <div class="social">
          <img src="../assets/facebook.svg" width="30px"/>
          <img src="../assets/instagram.svg" width="30px"/>
          <img src="../assets/linkedIn.svg" width="30px"/>
        </div>
        <nav class="nav-footer">
          <h4>SERVICES</h4>
          <ul aria-label="Services menu">
            <li><a target="_blank" href="ink.html/#webdesign">Web Design</a></li>
            <li><a target="_blank" href="code.html/#development">Web Development</a></li>
            <li><a target="_blank" href="code.html/#SEO">Search Engine Optimization (SEO)</a></li>
            <li><a target="_blank" href="code.html/#hosting">Web Hosting</a></li>
            <li><a target="_blank" href="ink.html">Graphic Design</a></li>
          </ul>
          <h4>LINKS</h4>
          <ul aria-label="Links Menu">
            <li><a target="_blank" href="code.html/#pricing">Pricing</a></li>
            <li><a target="_blank" href="about.html">About</a></li>
          </ul>
        </nav>
        <section class="contact-us">
          <div class="contact-row">
            <img src="../assets/email.svg" width="30"/>
            <a mailto="info@inkandcode.com">info@inkandcode.com</a>
          </div>
          <div class="contact-row">
            <img src="../assets/phone.svg" width="30px">
            <span>555-555-1111</span>
          </div>
        </section>
        
      </footer>
      
    </div>
    <span class="copy-terms">&copy; 2025 Ink&Code. All rights reserved.</span>

    `;
  }
}

customElements.define('footer-component', Footer);

/* Plan Table Scripting */
const DATA = {
  web: {
    title: "Web Plans",
    description:
      "Web plans are for informational sites and can include calls to action (CTAs), forms, and contact information",
    features: [
      "Pages",
      "Web Design",
      "Responsive Design",
      "Form Submissions",
      "CMS Integration",
      "Social Media Integration",
      "SEO Analytics",
      "Third Party Interactions",
      "Monthly Maintenance"
    ],
    plans: [
      {
        name: "Launch",
        price: "$750",
        theme: "launch",
        values: ["3", "Minimal", "Mobile First", "2", "X", "X", "X", "X", "1 month"]
      },
      {
        name: "Liftoff",
        price: "$1250",
        theme: "liftoff",
        values: ["5", "Basic", "Fluid", "4", "Standard", "✔", "X", "", "3 months"]
      },
      {
        name: "Orbit",
        price: "$2499",
        theme: "orbit",
        values: ["8", "Custom", "Adaptive", "6", "Custom", "✔", "✔", "2", "3 months"]
      },
      {
        name: "Planetary",
        price: "$3900",
        theme: "planetary",
        values: ["15", "Bespoke", "Full Responsive", "10", "Advanced", "✔", "✔", "4", "6 months"]
      }
    ]
  },

  ecommerce: {
    title: "E-Commerce",
    description: "E-commerce plans can span from a simple store with a few products up to a large scale company with many customizations.",
    features: ["Storefront Design", "Products", "Product Customization", "Checkout", "Order Management", "SEO Analytics", "Maintenance"],
    plans: [
      {
        name: "Lunar",
        price: "$1200",
        theme: "liftoff",
        values: ["Basic", "25", "Standard", "Basic", "X", "", "2 months"]
      },
      {
        name: "Solar",
        price: "$1750",
        theme: "orbit",
        values: ["Custom", "50", "Moderate", "Standard", "Standard", "", "3 months"]
      },
      {
        name: "Galactic",
        price: "$2499",
        theme: "planetary",
        values: ["Bespoke", "50+", "Customized", "Advanced", "Custom", "", "6 months"]
      }
    ]
  },

  maintenance: {
    title: "Maintenance",
    description:
      "Ongoing updates, hosting, and support to keep your site fast, secure, and online.",
    features: [
      "Hosting",
      "Updates",
      "Backups",
      "Uptime Monitoring",
      "Security",
      "Support Response"
    ],
    plans: [
      {
        name: "Standby",
        price: "$39/mo",
        theme: "launch",
        values: ["Shared", "Monthly", "Monthly", "X", "Basic", "72 hr"]
      },
      {
        name: "Autopilot",
        price: "$89/mo",
        theme: "orbit",
        values: ["Shared", "Bi-Weekly", "Weekly", "✔", "Standard", "48 hr"]
      },
      {
        name: "Mission Control",
        price: "$179/mo",
        theme: "planetary",
        values: ["Managed", "Weekly", "Daily", "✔ 24/7", "Advanced", "24 hr"]
      }
    ]
  }
};

const track = document.querySelector(".pricing-track");
const tabs = document.querySelectorAll(".tab-button");
const titleEl = document.querySelector(".sidebar-title");
const descEl = document.querySelector(".sidebar-description");
const featureList = document.querySelector(".feature-label");

const leftArrow = document.querySelector(".navigation-arrow.left");
const rightArrow = document.querySelector(".navigation-arrow.right");

let activeCategory = "web";
let startIndex = 0;
function getVisibleCount() {
  const value = getComputedStyle(track).getPropertyValue("--visible");
  return parseInt(value, 10) || 1;
}

let VISIBLE_COUNT = getVisibleCount();

/* ---------- Render ---------- */

function render() {
  const data = DATA[activeCategory];
  startIndex = 0;

  // Sidebar
  titleEl.textContent = data.title;
  descEl.textContent = data.description;

  featureList.innerHTML = data.features
    .map(f => `<span>${f}</span>`)
    .join("");

  renderCards();
}

function renderCards() {
  const cards = DATA[activeCategory].plans;

  track.innerHTML = "";

  const visible = cards.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  visible.forEach(plan => {
    track.insertAdjacentHTML("beforeend", createCard(plan));
  });

  updateNavButtons(cards.length);
}

function updateNavButtons(total) {
  if (startIndex === 0) {
    leftArrow.classList.add("hidden")
  }
  else {
    leftArrow.classList.remove("hidden")
  }
  if (startIndex + VISIBLE_COUNT >= total) {
    rightArrow.classList.add("hidden")
  }
  else {
    rightArrow.classList.remove("hidden")
  }
  console.log(startIndex)
}

/* ---------- Card Builder ---------- */

function createCard(plan) {
  const features = DATA[activeCategory].features
  return `
    <div class="pricing-card">
      <div class="card-header ${plan.theme}">
        <div class="banner">
          <svg class="banner-flag">
            <use href="#banner"></use>
          </svg>
          <div class="plan-name">${plan.name}</div>
        </div>

        <div class="price-badge">
          <span class="price-text">${plan.price}</span>
        </div>
      </div>

      <div class="card-values">
        ${plan.values
      .map((value, index) => {
        const label = features[index]
        return `
            <div class="wrapper">
              <span aria-label="${label}">${value}</span>
            </div>
          `})
      .join("")}
      </div>
    </div>
  `;
}

/* ---------- Navigation ---------- */

leftArrow.addEventListener("click", () => {
  if (startIndex === 0) return;
  startIndex -= 1;
  renderCards();
});

rightArrow.addEventListener("click", () => {
  const total = DATA[activeCategory].plans.length;
  if (startIndex + VISIBLE_COUNT >= total) return;
  startIndex += 1;
  renderCards();
});

/* ---------- Tabs ---------- */

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;
    startIndex = 0;
    render();
  });
});

/* ---------- Resize ---------- */

window.addEventListener("resize", () => {
  const newCount = getVisibleCount();
  if (newCount === VISIBLE_COUNT) return;

  VISIBLE_COUNT = newCount;

  // e.g. viewing cards 3–4 of 4, then the screen widens to show 3:
  // shift back so we don't show a half-empty track
  const total = DATA[activeCategory].plans.length;
  startIndex = Math.min(startIndex, Math.max(0, total - VISIBLE_COUNT));

  renderCards();
});

/* ---------- Init ---------- */

render();