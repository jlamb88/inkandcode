class Header extends HTMLElement {
  constructor() {
    super();
    this._scrollHandler = null;
    this._outsideHandler = null;
  }

  connectedCallback() {
    this._injectStyles();
    this.innerHTML = this._template();
    this._init();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this._scrollHandler);
    document.removeEventListener('click', this._outsideHandler);
  }

  /* ─── CSS injected once into <head> ─────────────────────────────── */
  _injectStyles() {
    if (document.getElementById('ink-header-styles')) return;
    const s = document.createElement('style');
    s.id = 'ink-header-styles';
    s.textContent = `
/* ── Tokens ──────────────────────────────────────────────────────── */
:root {
  --hdr-height:      72px;
  --wide-header-height: 72px;
  --hdr-navy:        rgba(30, 31, 80, 0.72);
  --hdr-navy-solid:  rgba(30, 31, 80, 0.97);
  --hdr-teal:        #50e3c2;
  --hdr-white:       #ededed;
  --hdr-muted:       rgba(237, 237, 237, 0.65);
  --hdr-border:      rgba(80, 227, 194, 0.18);
  --hdr-ease:        cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Wrapper ─────────────────────────────────────────────────────── */
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--hdr-navy);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--hdr-border);
  transition:
    background 0.35s var(--hdr-ease),
    box-shadow 0.35s var(--hdr-ease),
    transform  0.35s var(--hdr-ease);
  overflow: visible;
}

/* Grain overlay */
.header-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
}

/* Teal accent bar — bottom-left edge */
.header-teal-bar {
  position: absolute;
  bottom: 0; left: 0;
  width: 20%;
  height: 2px;
  background: linear-gradient(to right, var(--hdr-teal), transparent);
  pointer-events: none;
}

/* Scroll states */
.header--scrolled {
  background: var(--hdr-navy-solid);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35);
}
.header--hidden {
  transform: translateY(-105%);
}

/* ── Logo ────────────────────────────────────────────────────────── */
.header-logo a {
  display: flex;
  align-items: center;
  color: var(--hdr-white);
  transition: opacity 0.2s;
}
.header-logo a:hover { opacity: 0.85; }
.header-logo svg {
  height: 64px;
  width: auto;
  fill: currentColor;
}

/* ── Desktop Nav ─────────────────────────────────────────────────── */
.navbar {
  display: none;
}
.nav-items {
  display: flex;
  align-items: center;
  gap: 0.2em;
  list-style: none;
}

/* Shared link style */
.nav-trigger,
.nav-link {
  font-family: 'Poppins', sans-serif;
  font-size: var(--fs-base);
  font-weight: 400;
  color: var(--hdr-white);
  letter-spacing: 0.02em;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5em 0.85em;
  border-radius: 4px;
  position: relative;
  transition: color 0.2s;
  white-space: nowrap;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4em;
}
.nav-trigger::after,
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px; left: 0.85em; right: 0.85em;
  height: 1.5px;
  background: var(--hdr-teal);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--hdr-ease);
}
.nav-trigger:hover,
.nav-link:hover { color: var(--hdr-teal); }
.nav-trigger:hover::after,
.nav-link:hover::after { transform: scaleX(1); }

/* Chevron */
.nav-chevron {
  display: inline-block;
  width: 0; height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid currentColor;
  transition: transform 0.25s var(--hdr-ease);
  margin-top: 2px;
}
.has-submenu.open .nav-chevron { transform: rotate(180deg); }

/* CTA pill */
.nav-link--cta {
  border: 1.5px solid var(--hdr-teal);
  border-radius: 20px;
  color: var(--hdr-teal);
  padding: 0.45em 1.2em;
  margin-left: 0.5em;
  transition: background 0.2s, color 0.2s;
}
.nav-link--cta::after { display: none; }
.nav-link--cta:hover {
  background: var(--hdr-teal);
  color: #1e1f50;
}

/* CTRL+Us gets teal pill border on focus — matching Hit Us Up */
.nav-link:not(.nav-link--cta):focus-visible {
  border: 1.5px solid var(--hdr-teal);
  border-radius: 20px;
  color: var(--hdr-teal);
  outline: none;
  padding: 0.45em 1.2em;
  background: rgba(80, 227, 194, 0.06);
}
.nav-link:not(.nav-link--cta):focus-visible::after {
  display: none;
}

/* ── Desktop Submenu ─────────────────────────────────────────────── */
.has-submenu { position: relative; }

.submenu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  min-width: 220px;
  background: rgba(18, 19, 46, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 2px solid var(--hdr-teal);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
  padding: 1.25em 0 1em;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.22s var(--hdr-ease),
    transform 0.22s var(--hdr-ease);
}
.has-submenu.open .submenu {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

/* Submenu header */
.submenu-eyebrow {
  font-family: 'Cascadia Mono', monospace;
  font-size: 1rem;
  color: var(--hdr-teal);
  letter-spacing: 0.15em;
  opacity: 0.7;
  padding: 0 1.4em;
  display: block;
  margin-bottom: 0.4em;
}
.submenu-title {
  font-family: 'Raleway', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--hdr-white);
  padding: 0 1.4em;
  display: block;
  margin-bottom: 0.75em;
  text-decoration: none;
  transition: color 0.2s;
}
.submenu-title:hover { color: var(--hdr-teal); }

/* Submenu divider */


/* Submenu links */
.submenu-list {
  list-style: none;
  margin: 0; padding: 0;
}
.submenu-list a {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--hdr-muted);
  padding: 0.5em 1.4em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  text-decoration: none;
  transition: color 0.2s, padding-left 0.2s;
  position: relative;
}
.submenu-list a::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 1px;
  background: var(--hdr-teal);
  transition: width 0.2s var(--hdr-ease);
  flex-shrink: 0;
}
.submenu-list a:hover {
  color: var(--hdr-teal);
}
.submenu-list a:hover::before { width: 12px; }

/* ── Hamburger ───────────────────────────────────────────────────── */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  z-index: 1001;
  transition: background 0.2s;
}
.hamburger:hover { background: rgba(80, 227, 194, 0.1); }

.ham-bar {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--hdr-white);
  border-radius: 2px;
  transition:
    transform 0.35s var(--hdr-ease),
    opacity   0.25s var(--hdr-ease),
    background 0.2s;
  transform-origin: center;
}
.hamburger:hover .ham-bar { background: var(--hdr-teal); }

/* Animate to X */
.hamburger.open .ham-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open .ham-bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.open .ham-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
.hamburger.open .ham-bar { background: var(--hdr-teal); }

/* ── Mobile overlay ──────────────────────────────────────────────── */
.mobile-overlay {
  position: absolute;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s var(--hdr-ease);
}
.mobile-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

/* ── Mobile Menu ─────────────────────────────────────────────────── */
.mobile-menu {
  position: fixed;
  top: 0; right: 0;
  width: min(340px, 88vw);
  height: 100dvh;
  background: linear-gradient(160deg, #2b3457 0%, #1e1f50 50%, #313b5f 100%);
  z-index: 999;
  padding: calc(var(--hdr-height) + 2em) 2em 3em;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.4s var(--hdr-ease);
}
.mobile-menu.open {
  transform: translateX(0);
}

/* Grain inside mobile menu */
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

/* Staggered entrance for mobile items */
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

/* Mobile trigger buttons */
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

/* Mobile regular links */
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

/* Mobile submenu accordion */
.mobile-submenu {
  list-style: none;
  margin: 0; padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s var(--hdr-ease);
  border-left: 2px solid var(--hdr-teal);
  margin-left: 0.75em;
}
.mobile-has-submenu.open .mobile-submenu {
  max-height: 300px;
}
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

/* ── Responsive breakpoint ───────────────────────────────────────── */
@media screen and (min-width: 900px) {
  .navbar    { display: flex; align-items: center; }
  .hamburger { display: none; }
  .mobile-menu, .mobile-overlay { display: none !important; }
}
@media screen and (max-width: 899px) {
  .navbar { display: none; }
}
    `;
    document.head.appendChild(s);
  }

  /* ─── HTML template ──────────────────────────────────────────────── */
  _template() {
    return `
<header class="header" id="site-header">
  <div class="header-grain" aria-hidden="true"></div>
  <div class="header-teal-bar" aria-hidden="true"></div>

  <div class="header-logo">
    <a href="/home.html" aria-label="Ink &amp; Code — home">
      <svg aria-label="Ink &amp; Code Logo" role="img" viewBox="0 0 367 91">
        <use href="#logo" />
      </svg>
    </a>
  </div>

  <nav class="navbar" id="navbar" aria-label="Main navigation">
    <ul class="nav-items">

      <li class="has-submenu">
        <button class="nav-trigger" aria-expanded="false" aria-haspopup="true">
          Ink <span class="nav-chevron" aria-hidden="true"></span>
        </button>
        <div class="submenu" role="menu">
          <div class="submenu-header">
            
            <a href="ink.html" class="submenu-title" role="menuitem">Graphic Design</a>
            <span class="submenu-eyebrow">// design</span>
          </div>
          <ul class="submenu-list">
            <li><a href="ink.html#branding"       role="menuitem">Brand Design</a></li>
            <li><a href="code.html"               role="menuitem">Web Design</a></li>
            <li><a href="ink.html#graphic-design" role="menuitem">Print Media</a></li>
          </ul>
        </div>
      </li>

      <li class="has-submenu">
        <button class="nav-trigger" aria-expanded="false" aria-haspopup="true">
          Code <span class="nav-chevron" aria-hidden="true"></span>
        </button>
        <div class="submenu" role="menu">
          <div class="submenu-header">
            <span class="submenu-eyebrow">// dev</span>
            <a href="code.html" class="submenu-title" role="menuitem">Web Services</a>
          </div>
          <ul class="submenu-list">
            <li><a href="code.html/#webdevelop" role="menuitem">Web Development</a></li>
            <li><a href="code.html/#SEO"         role="menuitem">SEO &amp; Performance</a></li>
            <li><a href="code.html/#hosting"     role="menuitem">Web Hosting &amp; Maintenance</a></li>
          </ul>
        </div>
      </li>

      <li><a href="about.html"  role="menuitem" class="nav-link">CTRL + Us</a></li>
      <li><a href="#contact"    role="menuitem" class="nav-link nav-link--cta">Hit Us Up</a></li>

    </ul>
  </nav>

  <button class="hamburger" id="hamburger"
    aria-label="Toggle navigation menu"
    aria-expanded="false"
    aria-controls="mobile-menu">
    <span class="ham-bar"></span>
    <span class="ham-bar"></span>
    <span class="ham-bar"></span>
  </button>

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

  <div class="mobile-overlay" id="mobile-overlay" aria-hidden="true"></div>

</header>
    `;
  }

  /* ─── Behaviour ──────────────────────────────────────────────────── */
  _init() {
    const header = this.querySelector('.header');
    const hamburger = this.querySelector('.hamburger');
    const mobileMenu = this.querySelector('.mobile-menu');
    const mobileOverlay = this.querySelector('.mobile-overlay');
    const subTriggers = this.querySelectorAll('.nav-trigger');
    const mobileTriggers = this.querySelectorAll('.mobile-trigger');

    /* ── Scroll: opaque + auto-hide ─────────────────────────────────── */
    let lastScroll = 0;
    this._scrollHandler = () => {
      const y = window.scrollY;

      // Solid background once scrolled past header height
      header.classList.toggle('header--scrolled', y > 80);

      // Hide on scroll-down, reveal on scroll-up
      if (y > lastScroll && y > 200) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
      lastScroll = Math.max(y, 0);
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });

    /* ── Desktop submenus ───────────────────────────────────────────── */
    subTriggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const li = trigger.closest('.has-submenu');
        const isOpen = li.classList.contains('open');

        // Close all first
        this._closeAllSubmenus();

        if (!isOpen) {
          li.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    this._outsideHandler = e => {
      if (!this.contains(e.target)) this._closeAllSubmenus();
    };
    document.addEventListener('click', this._outsideHandler);

    // Escape key closes submenus and mobile menu
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this._closeAllSubmenus();
        if (mobileMenu.classList.contains('open')) {
          this._closeMobile(hamburger, mobileMenu, mobileOverlay);
        }
      }
    });

    /* ── Hamburger toggle ────────────────────────────────────────────── */
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      isOpen
        ? this._closeMobile(hamburger, mobileMenu, mobileOverlay)
        : this._openMobile(hamburger, mobileMenu, mobileOverlay);
    });

    mobileOverlay.addEventListener('click', () => {
      this._closeMobile(hamburger, mobileMenu, mobileOverlay);
    });

    /* ── Mobile accordion submenus ───────────────────────────────────── */
    mobileTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const li = trigger.closest('.mobile-has-submenu');
        const isOpen = li.classList.contains('open');

        // Close siblings
        this.querySelectorAll('.mobile-has-submenu.open').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.mobile-trigger').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          li.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* ── Close mobile when a link is clicked ─────────────────────────── */
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this._closeMobile(hamburger, mobileMenu, mobileOverlay);
      });
    });
  }

  _closeAllSubmenus() {
    this.querySelectorAll('.has-submenu.open').forEach(li => {
      li.classList.remove('open');
      li.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
    });
  }

  _openMobile(hamburger, menu, overlay) {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.removeAttribute('aria-hidden');
    overlay.classList.add('open');
    overlay.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  _closeMobile(hamburger, menu, overlay) {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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
      <section class="contact" id="contact">
      <span>Get In Touch</span>
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
      <div>
        <svg alt="Logo" class="footer-logo">
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
        <div class="row">
          <img src="../assets/email.svg" width="30"/>
          <a mailto="info@inkandcode.com">info@inkandcode.com</a>
        </div>
        <div class="row">
          <img src="../assets/phone.svg" width="30px">
          <span>555-555-1111</span>
        </div>
      </section>
      <div>
      </div>
    </div>
  </footer>
   <img class="waves"
        src="../assets/wavesObliqPurple.svg" width="100%">
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
let VISIBLE_COUNT = 2; // can be adjusted dynamically later if needed

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
  renderCards();
});

/* ---------- Init ---------- */

render();