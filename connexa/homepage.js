// JavaScript code to toggle menu when hamburger button is clicked
const menuIcon = document.querySelector('.menu-icon');
const bodyEl = document.querySelector('body');

menuIcon.addEventListener('click', function() {
  bodyEl.classList.toggle('menu-open');
});

