// Main JavaScript file - Initialize all components
import { initHeader } from './header.js?v=12.0';
import { initFooter } from './footer.js?v=12.0';
import { initSliders } from './slider.js?v=12.0';
import { initAnimations } from './animations.js?v=12.0';
import { initForms } from './forms.js?v=12.0';
import { initPortfolio } from './portfolio.js?v=12.0';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js ES6 modules loaded successfully');

    // Removed complex viewport height calculations

    // Initialize Lenis smooth scroll first
    initLenisScroll();

    // Core components
    initHeader();
    initFooter();

    // Feature components
    initSliders();
    initAnimations();
    initForms();
    initPortfolio();

    // Additional functionality
    initTestimonials();
    initUtilities();
    initScrollLock();
    initHeroParallax();
    initPageLoader();
    initButtonTextRoll();
});

// Removed complex viewport height function - using simple 90vh instead

// Page loader - smooth fade in on load
function initPageLoader() {
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 400);
            }, 200);
        }
    });
}

// Lenis Smooth Scroll initialization
function initLenisScroll() {
    // Check if Lenis is available
    if (typeof Lenis === 'undefined') {
        console.warn('Lenis library not loaded');
        return;
    }

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Store globally for debugging
    window.lenis = lenis;

    console.log('✅ Lenis smooth scroll initialized successfully!');
}

// Testimonials cycling
function initTestimonials() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    let currentTestimonialIndex = 0;
    
    if (testimonialSlides.length === 0) return;
    
    function cycleTestimonials() {
        testimonialSlides[currentTestimonialIndex].classList.remove('active');
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
        testimonialSlides[currentTestimonialIndex].classList.add('active');
    }
    
    setInterval(cycleTestimonials, 6000);
}


// Hero parallax effect - disabled on mobile for better performance
function initHeroParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    // Disable parallax on mobile devices
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        console.log('Parallax disabled on mobile device');
        return;
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.2; // 20% movement
        heroBackground.style.transform = `translateY(-${scrolled * parallaxSpeed}px)`;
    }, { passive: true });
}

// Prevent scrolling below footer
function initScrollLock() {
    let maxScroll = 0;

    function calculateMaxScroll() {
        const footer = document.querySelector('.footer, footer');
        if (footer) {
            const footerRect = footer.getBoundingClientRect();
            const footerBottom = window.scrollY + footerRect.bottom;
            maxScroll = footerBottom - window.innerHeight;
        }
    }

    // Calculate on load and resize
    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);

    // Lock scroll at footer bottom
    window.addEventListener('scroll', function() {
        if (window.scrollY > maxScroll) {
            window.scrollTo(0, maxScroll);
        }
    }, { passive: false });

    // Recalculate on content changes
    const observer = new MutationObserver(calculateMaxScroll);
    observer.observe(document.body, { childList: true, subtree: true });
}

// Utility functions
function initUtilities() {
    // External link handling
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[target="_blank"]');
        if (link) {
            link.rel = 'noopener noreferrer';
        }
    });

    // Image lazy loading fallback
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Button text roll animation with GSAP
function initButtonTextRoll() {
    // Wait for GSAP to load from CDN
    const checkGSAP = setInterval(() => {
        if (typeof gsap !== 'undefined') {
            clearInterval(checkGSAP);

            document.querySelectorAll('.btn_default_text').forEach(el => {
                const label = el.getAttribute('data-label') || el.textContent.trim();
                const alt = el.getAttribute('data-alt') || label;

                // Build structure
                el.innerHTML = `
                    <span class="roll__viewport">
                        <span class="roll__inner">
                            <span class="roll__line">${label}</span>
                            <span class="roll__line">${alt}</span>
                        </span>
                    </span>
                `;

                const inner = el.querySelector('.roll__inner');
                gsap.set(inner, { yPercent: 0 });

                const btn = el.closest('.btn_default_wrap');
                if (btn) {
                    btn.addEventListener('mouseenter', () => gsap.to(inner, { yPercent: -50, duration: 0.35, ease: 'power2.out' }));
                    btn.addEventListener('mouseleave', () => gsap.to(inner, { yPercent: 0, duration: 0.35, ease: 'power2.out' }));
                    btn.addEventListener('focusin', () => gsap.to(inner, { yPercent: -50, duration: 0.35, ease: 'power2.out' }));
                    btn.addEventListener('focusout', () => gsap.to(inner, { yPercent: 0, duration: 0.35, ease: 'power2.out' }));
                }
            });

            console.log('✅ Button text roll animation initialized!');
        }
    }, 100);

    // Timeout after 5 seconds if GSAP doesn't load
    setTimeout(() => clearInterval(checkGSAP), 5000);
}