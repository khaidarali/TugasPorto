// Create animated particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

    particlesContainer.appendChild(particle);
  }
}

// Highlight active nav link on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav a');

function onScroll() {
  let scrollPos = window.scrollY || window.pageYOffset;

  // Add offset for fixed navigation
  const offset = 120;

  sections.forEach(section => {
    const top = section.offsetTop - offset;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });

  // Handle edge case for top of page
  if (scrollPos < 100) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#profile');
    });
  }
}

// Smooth scroll and focus management
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetID = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      // Calculate offset for fixed navigation
      const headerOffset = 100;
      const elementPosition = targetSection.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update active state immediately
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      link.classList.add('active');

      // Set focus for accessibility
      setTimeout(() => {
        targetSection.focus();
      }, 500);
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

// Add stagger animation to skills and projects
const skillItems = document.querySelectorAll('.skills-list li');
const projectCards = document.querySelectorAll('.project-card');

skillItems.forEach((item, index) => {
  item.style.animationDelay = (index * 0.1) + 's';
});

projectCards.forEach((card, index) => {
  card.style.animationDelay = (index * 0.2) + 's';
});

// Initialize
window.addEventListener('scroll', onScroll);
window.addEventListener('load', () => {
  createParticles();
  onScroll();
});

// Add loading state
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// Add hover effect for project cards
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});