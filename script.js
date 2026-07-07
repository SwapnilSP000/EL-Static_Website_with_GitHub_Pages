// Mobile navigation toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Active navigation highlight on scroll
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navItems.forEach((item) => item.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Reveal-on-scroll effect
const revealItems = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerPoint = window.innerHeight * 0.9;

  revealItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerPoint) {
      item.classList.add('is-visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Back-to-top button
const backToTop = document.querySelector('.back-to-top');

const toggleBackToTop = () => {
  if (window.scrollY > 500) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
};

if (backToTop) {
  window.addEventListener('scroll', toggleBackToTop);
  window.addEventListener('load', toggleBackToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
