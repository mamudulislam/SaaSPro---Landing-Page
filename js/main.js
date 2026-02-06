/**
 * SaaSPro - Agency Engine V5.0
 * Signature Interactions (Softvence Inspired)
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Agency Preloader Logic
    const preloader = document.querySelector('.agency-preloader');
    const percent = document.querySelector('.loader-percent');

    if (preloader && percent) {
        let count = 0;
        const interval = setInterval(() => {
            count += Math.floor(Math.random() * 10) + 5;
            if (count > 100) count = 100;
            percent.innerText = count + '%';

            if (count === 100) {
                clearInterval(interval);
                // Exit Animation
                const tl = gsap.timeline();
                tl.to('.loader-percent', { y: -100, opacity: 0, duration: 0.5, delay: 0.2 })
                    .to('.loader-text', { opacity: 0, duration: 0.3 }, "<")
                    .to(preloader, { yPercent: -100, duration: 1, ease: 'power4.inOut' })
                    .from('.hero-agency > *', { y: 100, opacity: 0, stagger: 0.1, duration: 1, ease: 'power2.out' }, "-=0.5");
            }
        }, 50);
    }

    // 2. Custom Cursor (Logic continues...)
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 6,
                y: e.clientY - 6,
                duration: 0.1
            });
            gsap.to(follower, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.3
            });
        });

        // Interactive States
        const links = document.querySelectorAll('a, button, .project-card');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 4, opacity: 0.5 });
                gsap.to(follower, { scale: 1.5, borderColor: '#fff' });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, opacity: 1 });
                gsap.to(follower, { scale: 1, borderColor: 'rgba(178, 255, 64, 0.3)' });
            });
        });
    }

    // 2. Smooth Scroll (Lenis)
    let lenis;
    try {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    } catch (e) {
        console.warn('Lenis failed to initialize:', e);
    }

    // 3. GSAP Core Animations
    gsap.registerPlugin(ScrollTrigger);

    // Agency Reveal Logic
    const reveals = document.querySelectorAll('[data-reveal]');
    reveals.forEach((el, index) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                onEnter: () => el.classList.add('active'),
                once: true
            }
        });
    });

    // Giant Marquee Loop
    const marquee = document.querySelector('.agency-marquee');
    if (marquee) {
        gsap.to(marquee, {
            xPercent: -50,
            repeat: -1,
            duration: 30,
            ease: 'none'
        });
    }

    // Project Card Perspective (Softvence Style)
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 50;
            const rotateY = (x - centerX) / 50;

            gsap.to(card.querySelector('.project-img'), {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.project-img'), {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // 4. Parallax Text (Softvence Inspired)
    const agencyTitle = document.querySelector('.agency-title');
    if (agencyTitle) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            gsap.to(agencyTitle, {
                y: scroll * 0.1,
                duration: 0.5,
                ease: 'power1.out'
            });
        });
    }


    // 5. Mobile Menu Logic (Stagger Reveal)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileOverlay.classList.add('active');
            gsap.to(mobileLinks, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        });

        const closeMenu = () => {
            mobileOverlay.classList.remove('active');
            gsap.to(mobileLinks, {
                y: 30,
                opacity: 0,
                duration: 0.3
            });
        };

        mobileClose.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    console.log('SaaSPro Agency Engine V5.0 Active');
});