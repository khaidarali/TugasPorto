// Highlight active nav link on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav a');

function onScroll() {
  let scrollPos = window.scrollY || window.pageYOffset;
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}

window.addEventListener('scroll', onScroll);

// Accessibility: Focus section on nav click
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const targetID = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      targetSection.focus();
    }
  });
});

