// Cerrar menú tras clickar
document.querySelectorAll('.offcanvas .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const offcanvasElement = document.getElementById('offcanvasNav');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) {
            bsOffcanvas.hide();
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
