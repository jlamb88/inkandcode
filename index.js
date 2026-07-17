const header = document.querySelector(".header");
const stopper = document.getElementById("stopper");
const hamburger = document.getElementById("hamburger");

let lastScroll = 0;
let pastStopper = false;

// Track whether we've passed the stopper
const observer = new IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            // Stopper visible → not past it yet
            pastStopper = false;
            header.classList.remove("unstuck");
            header.classList.remove("hidden");
            hamburger.classList.remove("floating");
        } else {
            // Scrolled past stopper → enable scroll behavior
            pastStopper = true;
            header.classList.add("unstuck");
        }
    },
    { threshold: 0 }
);

observer.observe(stopper);

// Scroll behavior only after stopper
window.addEventListener("scroll", () => {
    if (!pastStopper) return;

    const currentScroll = window.scrollY;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    if (isMobile) {
        // MOBILE LOGIC
        if (currentScroll < lastScroll) {
            // Scrolling UP past stopper → show floating hamburger
            hamburger.classList.add("floating");
        } else {
            // Scrolling DOWN past stopper → hide it
            hamburger.classList.remove("floating");
        }
    } else {
        // DESKTOP LOGIC
        if (currentScroll > lastScroll) {
            header.classList.add("hidden");
            header.classList.remove("unstuck");
        } else {
            header.classList.remove("hidden");
            header.classList.add("unstuck");
        }
    }

    lastScroll = currentScroll; // update for both modes
});


function hideIfPastStopper() {
    const stopperRect = stopper.getBoundingClientRect();
    const past = stopperRect.top < 0;
    if (past) {
        header.classList.add("hidden");
        header.classList.remove("unstuck")
        pastStopper = true;
    }
}

window.addEventListener("load", hideIfPastStopper);

// Run on hashchange (when in-page navigation happens)
window.addEventListener("hashchange", () => {
    // wait a tick for scroll to finish
    setTimeout(hideIfPastStopper, 0);
});

// Run when clicking nav links directly
document.querySelectorAll('.header a, .hero-text a').forEach(link => {
    link.addEventListener("click", () => {
        setTimeout(hideIfPastStopper, 0); // allow scroll
    });
});

window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty("--scrollY", window.scrollY + "px");
});
