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

