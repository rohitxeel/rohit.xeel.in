/* ================================================
   ROHIT KUMAR PORTFOLIO — MAIN JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- CUSTOM CURSOR ---- */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animateCursor() {
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      requestAnimationFrame(animateCursor);
    })();
    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ---- SCROLL REVEAL ---- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.skill-card, .project-card, .edu-card, .ach-item, .cert-card, .reveal, .cv-card'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = (i % 5) * 80;
    revealObserver.observe(el);
  });

  /* ---- CV MODAL ---- */
  const cvModal = document.getElementById('cvModal');
  const openModalBtn = document.getElementById('openCvPreview');
  const closeModalBtn = document.getElementById('closeCvModal');

  if (openModalBtn && cvModal) {
    openModalBtn.addEventListener('click', e => {
      e.preventDefault();
      cvModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeModalBtn && cvModal) {
    closeModalBtn.addEventListener('click', () => {
      cvModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (cvModal) {
    cvModal.addEventListener('click', e => {
      if (e.target === cvModal) {
        cvModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { cvModal.classList.remove('open'); document.body.style.overflow = ''; }
    });
  }

  /* ---- TYPED HERO TEXT ---- */
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    const roles = ['Data Engineer', 'ML Developer', 'Full-Stack Dev', 'CSE Student'];
    let ri = 0, ci = 0, deleting = false;
    function type() {
      const current = roles[ri];
      typedEl.textContent = deleting ? current.slice(0, ci--) : current.slice(0, ci++);
      if (!deleting && ci > current.length) { deleting = true; setTimeout(type, 1400); return; }
      if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
      setTimeout(type, deleting ? 45 : 90);
    }
    type();
  }

  /* ---- ACTIVE NAV HIGHLIGHT ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (sections.length && navLinks.length) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => activeObserver.observe(s));
  }

});
