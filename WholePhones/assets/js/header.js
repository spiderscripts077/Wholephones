document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close nav when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (e.target === toggle) return;
    if (!nav.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
});
