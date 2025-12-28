// Animations Component - Scroll animations and counter effects

export function initAnimations() {
    initScrollAnimations();
    initCounterAnimations();
    initSectionTitleAnimations();
}

function initScrollAnimations() {
    // Prevent zoom on mobile during animations
    const isMobile = window.innerWidth <= 768;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use CSS classes instead of direct style manipulation to prevent mobile zoom
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-item, .portfolio-item, .gallery-item, .stat-item, .testimonial-card, .value-card'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

function initCounterAnimations() {
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Hero stats observer - disabled on mobile to prevent zoom issues
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, just show the stats without animation
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            const statNumbers = heroStats.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                // Just ensure numbers are visible without animation
                stat.style.opacity = '1';
            });
        }
        console.log('Hero stats animation disabled on mobile');
    } else {
        // Desktop: Use intersection observer for animations
        const heroStatsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const numberElement = stat.childNodes[0] || stat;
                        const target = parseInt(numberElement.textContent);
                        if (!isNaN(target)) {
                            stat.style.willChange = 'contents';
                            animateCounter(numberElement, target);
                            setTimeout(() => {
                                stat.style.willChange = 'auto';
                            }, 2100);
                        }
                    });
                    heroStatsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe stats sections on desktop only
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            heroStatsObserver.observe(heroStats);
        }
    }

    // About stats observer
    const aboutStatsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace('+', ''));
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                        // Add back the + sign after animation
                        setTimeout(() => {
                            if (!stat.textContent.includes('+')) {
                                stat.textContent = stat.textContent + '+';
                            }
                        }, 2000);
                    }
                });
                aboutStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe about stats sections
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        aboutStatsObserver.observe(aboutStats);
    }

    const experienceStats = document.querySelector('.experience-stats');
    if (experienceStats) {
        aboutStatsObserver.observe(experienceStats);
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        aboutStatsObserver.observe(statsSection);
    }
}

function initSectionTitleAnimations() {
    const sectionTitleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    const sectionTitleFillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fill-animate');
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px 0px 0px'
    });

    // Observe section titles
    const titles = document.querySelectorAll('.section-title, .services-title, .about-title');
    titles.forEach(title => {
        sectionTitleObserver.observe(title);
        sectionTitleFillObserver.observe(title);
    });
}

// Utility function for manual counter animation
export function animateCounterManual(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}