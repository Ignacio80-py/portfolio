/* ========== NAVEGACIÓN MÓVIL ========== */
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// Mostrar/ocultar menú móvil
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('active'); // Animación hamburguesa → X
    });
}

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
    });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
    }
});

/* ========== AÑO DINÁMICO EN FOOTER ========== */
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* ========== HEADER SCROLL (Sombra al hacer scroll) ========== */
const header = document.querySelector('.header');

const scrollHeader = () => {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
};

window.addEventListener('scroll', scrollHeader);

/* ========== SCROLL REVEAL ANIMATION ========== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target); // Solo animar una vez
        }
    });
}, observerOptions);

// Aplicar a todas las secciones
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.classList.add('reveal-element');
    revealObserver.observe(section);
});

// Aplicar a las tarjetas de proyecto individualmente
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.classList.add('reveal-element');
    card.style.transitionDelay = `${index * 0.1}s`; // Efecto escalonado
    revealObserver.observe(card);
});

// Aplicar a las tarjetas de contacto
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.classList.add('reveal-element');
    card.style.transitionDelay = `${index * 0.1}s`;
    revealObserver.observe(card);
});

/* ========== ACTIVE LINK EN NAVEGACIÓN ========== */
const navSections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    navSections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
};

window.addEventListener('scroll', scrollActive);

/* ========== SMOOTH SCROLL PARA ENLACES INTERNOS ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignorar enlaces vacíos o solo "#"
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});