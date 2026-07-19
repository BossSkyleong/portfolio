let projectCardsAnimation = null;
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
        gsap.set([
            '.navbar',
            '.profile-image',
            '.profile-text > *',
            '.section-title',
            '.about-text',
            '.about-info .info-item',
            '.skill-category',
            '.timeline-item',
            '.contact-card'
        ], { clearProps: 'all' });
        return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.from('.navbar', {
        duration: 0.7,
        y: -10,
        ease: 'power2.out'
    });

    gsap.from('.profile-image', {
        duration: 0.9,
        scale: 0.92,
        y: 24,
        ease: 'power3.out',
        delay: 0.15
    });

    gsap.from('.profile-text > *', {
        duration: 0.85,
        y: 28,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.25
    });

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                once: true
            },
            duration: 0.65,
            y: 24,
            ease: 'power2.out'
        });
    });

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            once: true
        },
        duration: 0.75,
        y: 24,
        ease: 'power2.out'
    });

    gsap.from('.about-info .info-item', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            once: true
        },
        duration: 0.65,
        y: 24,
        stagger: 0.1,
        ease: 'power2.out'
    });

    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 70%',
            once: true
        },
        duration: 0.7,
        y: 34,
        stagger: 0.1,
        ease: 'power2.out'
    });

    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 70%',
            once: true
        },
        duration: 0.75,
        y: 30,
        ease: 'power2.out'
    });

    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%',
            once: true
        },
        duration: 0.65,
        y: 28,
        stagger: 0.12,
        ease: 'power2.out'
    });
});

function animateProjectCards() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (projectCardsAnimation) {
        projectCardsAnimation.scrollTrigger?.kill();
        projectCardsAnimation.kill();
    }

    gsap.set('.project-card', { clearProps: 'opacity,visibility' });
    ScrollTrigger.refresh();

    projectCardsAnimation = gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            once: true
        },
        duration: 0.65,
        y: 34,
        stagger: 0.08,
        ease: 'power2.out'
    });
}
