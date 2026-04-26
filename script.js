// ── NAV HAMBURGER ──
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('#nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('active');
    });
});

// ── NAV HEIGHT (zoom fix) ──
function setNavHeight() {
    const nav = document.getElementById('navbar');
    if (nav) document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');
}
setNavHeight();
window.addEventListener('resize', setNavHeight);

// ── FAQ ──
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => btn.parentElement.classList.toggle('active'));
});

// ── FORMULÁRIO ──
const form = document.getElementById('contact-form');
const submitBtn = form.querySelector('.btn-primary');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const segmento = document.getElementById('segmento').value;
    if (!segmento) {
        alert('Por favor, selecione o segmento do seu negócio.');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';

    emailjs.send('service_kmg7bxh', 'template_muqq3lq', {
        from_name: document.getElementById('nome').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('mensagem').value,
        user_segment: segmento,
        user_phone: document.getElementById('telefone').value
    })
        .then(() => {
            submitBtn.innerText = 'Mensagem Enviada ✓';
            form.reset();
            setTimeout(() => {
                submitBtn.innerText = 'Enviar Mensagem';
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(err => {
            console.error(err);
            submitBtn.innerText = 'Erro ao enviar';
            submitBtn.disabled = false;
        });
});

// ── COOKIE BANNER ──
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
        banner.style.display = 'flex';
    } else if (consent === 'accepted') {
        loadAnalytics();
    }

    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.style.display = 'none';
        loadAnalytics();
    });

    document.getElementById('reject-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        banner.style.display = 'none';
    });
});

function loadAnalytics() {
    const GA_ID = 'G-W8CGEN7YPE';
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);
}

// ── SWIPER ──
const swiper = new Swiper('.portfolio-container.swiper', {
    loop: true,
    speed: 800,
    centeredSlides: true,
    navigation: {
        nextEl: '.portfolio-button-next',
        prevEl: '.portfolio-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    on: {
        init(s) { updateCounter(s); },
        slideChange(s) { updateCounter(s); },
    },
});

function updateCounter(s) {
    const counter = document.getElementById('swiper-counter');
    if (!counter) return;
    const current = String(s.realIndex + 1).padStart(2, '0');
    const total = String(s.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length).padStart(2, '0');
    counter.innerText = `${current} / ${total}`;
}

// ── SCROLL REVEAL ──
const observerConfig = (threshold = 0.12) => ({
    threshold,
    rootMargin: '0px 0px -40px 0px'
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
            target.classList.add('visible');
            revealObserver.unobserve(target);
        }
    });
}, observerConfig());

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
            target.querySelectorAll('.diff-item, .plan-card, .process-card, .skill-item')
                .forEach((child, i) => {
                    child.style.transitionDelay = `${i * 100}ms`;
                    child.classList.add('stagger-visible');
                });
            staggerObserver.unobserve(target);
        }
    });
}, observerConfig(0.1));

document.querySelectorAll('.diff-grid, .plans-grid, .process-grid, .sobre-skills')
    .forEach(el => staggerObserver.observe(el));

const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
            target.classList.add('divider-animated');
            dividerObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.divider').forEach(el => dividerObserver.observe(el));

const labelObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
            target.classList.add('label-visible');
            labelObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-label').forEach(el => labelObserver.observe(el));