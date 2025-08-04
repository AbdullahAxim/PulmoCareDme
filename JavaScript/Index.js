// === Scroll-triggered animation for About Section ===
window.addEventListener('scroll', () => {
  const aboutSection = document.querySelector('.about-section');
  const sectionTop = aboutSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100) {
    aboutSection.classList.add('active');
  }
});

// === Scroll-triggered animation for Services ===
const serviceItems = document.querySelectorAll('.service.fade-in-up');

const serviceObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

serviceItems.forEach(item => {
  serviceObserver.observe(item);
});

// === Smooth scroll animation for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === Optional: Animated page transition (for external links) ===
document.querySelectorAll('a:not([href^="#"])').forEach(link => {
  link.addEventListener('click', function (e) {
    if (!this.href.startsWith(window.location.origin)) return; // skip external domains

    e.preventDefault();

    // Add exit animation
    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = this.href;
    }, 400); // duration should match CSS animation
  });
});

// Scroll Explore button
  const exploreBtn = document.querySelector(".btn-primary");

  exploreBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Show confirmation popup before starting
    const confirmExplore = confirm(
      "You have entered Explore Mode.\nThe website will scroll automatically.\nScrolling manually will exit Explore Mode."
    );

    if (!confirmExplore) return;

    const scrollStep = 1;          // Pixels per step (slower scroll)
    const scrollIntervalTime = 15; // Lower = smoother
    let scrolling;
    let userInteracted = false;

    function scrollDown() {
      scrolling = setInterval(() => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight
        ) {
          clearInterval(scrolling);
          setTimeout(() => {
            scrollToTop();
          }, 5000); // Wait 5 seconds at bottom
        } else {
          window.scrollBy(0, scrollStep);
        }
      }, scrollIntervalTime);
    }

    function scrollToTop() {
      const topScroll = setInterval(() => {
        if (window.scrollY <= 0) {
          clearInterval(topScroll);
        } else {
          window.scrollBy(0, -scrollStep * 2); // Scroll up slightly faster
        }
      }, scrollIntervalTime);
    }

    function stopScrollingOnUserInteraction() {
      if (!userInteracted) {
        clearInterval(scrolling);
        window.removeEventListener("wheel", stopScrollingOnUserInteraction);
        window.removeEventListener("touchstart", stopScrollingOnUserInteraction);
        userInteracted = true;
      }
    }

    // Listen for manual scroll interaction to stop
    window.addEventListener("wheel", stopScrollingOnUserInteraction);
    window.addEventListener("touchstart", stopScrollingOnUserInteraction);

    scrollDown();
  });