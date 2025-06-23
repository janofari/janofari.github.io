document.addEventListener('DOMContentLoaded', () => {
  const collapseEl = document.getElementById('mainNav');
  const toggler  = document.querySelector('.navbar-toggler');

  // 1) Cerrar al clicar en un enlace
  document.querySelectorAll('#mainNav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // 2) Cerrar al clicar fuera de la sidebar cuando esté abierta
  document.addEventListener('click', (e) => {
    const isOpen = collapseEl.classList.contains('show');
    if (!isOpen) return;

    // Si el click no fue ni en la sidebar ni en el toggler
    if (!collapseEl.contains(e.target) && !toggler.contains(e.target)) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

// Lazy loading
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.project-card, .project-image');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const bg = el.getAttribute('data-bg');
                    el.style.backgroundImage = `url(${bg})`;
                    el.classList.add('loaded');
                    obs.unobserve(el);
                }
            });
        }, {
            rootMargin: '0px 0px 100px 0px',
            threshold: 0.1
        });

        cards.forEach(card => observer.observe(card));
    } else {
        cards.forEach(el => {
            el.style.backgroundImage = `url(${el.getAttribute('data-bg')})`;
            el.classList.add('loaded');
        });
    }
});

// Typewriter effect in hero heading
document.addEventListener('DOMContentLoaded', function () {
  const phrases = [
    'no llegar a tus metas',
    'verte delgado',
    'no ganar músculo',
    'ese michelín'
  ];
  const holdDuration = 3000; // time to hold the full phrase
  const typeDuration = 1000; // total time to type a phrase
  const deleteDuration = 1000; // total time to delete a phrase

  let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  const textEl = document.getElementById('typewriter-text');

  function type() {
    const full = phrases[index] + '?';
    const interval = (isDeleting ? deleteDuration : typeDuration) / full.length;

    if (isDeleting) {
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        index = (index + 1) % phrases.length;
        charIndex = 0;
      }
    } else {
      charIndex++;
      if (charIndex === full.length) {
        isDeleting = true;
        textEl.textContent = full;
        setTimeout(type, holdDuration);
        return;
      }
    }
    textEl.textContent = full.substring(0, charIndex);
    setTimeout(type, interval);
  }

  if (textEl) {
    type();
  }
});

// Mostrar la navbar en móvil solo al hacer scroll hacia arriba
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const collapseEl = document.getElementById('mainNav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    if (window.innerWidth >= 768) {
      navbar.style.transform = '';
      return;
    }

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScroll && currentScroll > 50) {
      if (!collapseEl.classList.contains('show')) {
        navbar.style.transform = 'translateY(-100%)';
      }
    } else {
      navbar.style.transform = '';
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });
});
