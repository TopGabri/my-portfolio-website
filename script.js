function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Navigate when a clickable project card is activated (click or keyboard)
document.addEventListener('click', function (e) {
  // Find closest clickable ancestor (could be the element itself)
  const card = e.target.closest && e.target.closest('.clickable');
  if (!card) return; // not clicking a clickable card

  // If the actual click target is an interactive element inside (a, button, input), don't navigate
  const interactiveTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  if (interactiveTags.includes(e.target.tagName)) return;

  // Also if the target or any ancestor up to the card has an onclick attribute or role="button" we'll skip
  let node = e.target;
  while (node && node !== card) {
    if (node.getAttribute && node.getAttribute('onclick')) return;
    if (node.getAttribute && node.getAttribute('role') === 'button') return;
    node = node.parentNode;
  }

  const href = card.getAttribute('data-href');
  if (href) {
    // small press visual feedback: add active class briefly
    card.classList.add('pressed');
    setTimeout(() => card.classList.remove('pressed'), 120);
    // navigate
    window.location.href = href;
  }
});

// Keyboard support: Enter or Space activates the card when focused
document.addEventListener('keydown', function (e) {
  const active = document.activeElement;
  if (!active || !active.classList || !active.classList.contains('clickable')) return;

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const href = active.getAttribute('data-href');
    if (href) window.location.href = href;
  }
});