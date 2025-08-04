document.getElementById("surveyForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your feedback!");
  this.reset();
});
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
