class Header extends HTMLElement {
  constructor() {
    super();
  }


  connectedCallback() {
    this.innerHTML = `
    
<header class="header">
  <div class="header-logo">
  <a href="/home.html" target="_blank" role="menuitem">
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
        <use href="../assets/logos.svg#miniLogo">
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
            <span><a href='pages/ink.html' refer='noreferrer' target='_blank' role='menuitem'>Graphic Design</span>
            </div>
            <div class="menu-items">
              <li><a href="pages/ink.html#branding" target="_blank" refer='noreferrer' role="menuitem">Brand Design</a></li>
              <li><a href="pages/code.html" target="_blank" refer='noreferrer' role="menuitem">Web Design</a></li>
              <li><a href="pages/ink.html#graphic-design" target="_blank" refer='noreferrer' role="menuitem">Print Media</a></li>
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
            <span><a href='pages/code.html' target=_blank refer='noreferrer' role='menuitem'>Web Services</span>
          </div>
            <div class="menu-items">
              <li><a target="_blank" href="pages/code.html/#webdevelop">Web Development</a></li>
              <li><a target="_blank" href="pages/code.html/#SEO">SEO & Performance</a></li>
              <li><a target="_blank" href="pages/code.html/#hosting">Web Hosting & Maintenance</a></li>
            </div>
          </ul>
        </li>
        <li><a target="_blank" href="pages/about.html">CTRL + Us</a></li>
        <li><a target="_blank" href="#contact">Hit Us Up</a></li>
  </ul>
</nav>
</div>

    </header>
     `;
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
      <h2>Ready To Collaborate?</h2>
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
        <div class="contact-row">
          <img src="../assets/email.svg" width="30"/>
          <a mailto="info@inkandcode.com">info@inkandcode.com</a>
        </div>
        <div class="contact-row">
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
    description: "Ongoing updates, hosting, and support.",
    features: ["Updates", "Backups", "Monitoring", "Security"],
    plans: []
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


