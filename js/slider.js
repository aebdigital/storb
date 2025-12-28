// Slider Component - Hero slider and other slider functionality


export function initSliders() {
    initHeroSlider();
    // initTextSlider(); // Disabled - using static subtitle now
    initCarousel();
}

function initHeroSlider() {
    const heroImages = document.querySelectorAll('.hero-bg-image');
    let currentImageIndex = 0;
    
    if (heroImages.length === 0) return;
    
    // Disable hero slider on mobile to prevent zoom/stretch issues
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        console.log('Hero image slider disabled on mobile device');
        // Keep only the first image active on mobile
        heroImages.forEach((img, index) => {
            if (index === 0) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
        return;
    }
    
    function cycleHeroImages() {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }
    
    // Cycle images every 5 seconds (desktop only)
    setInterval(cycleHeroImages, 5000);
}

function initTextSlider() {
    const slides = document.querySelectorAll('.hero-subtitle-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active', 'slide-out');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add slide-out class to current slide
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('slide-out');
        }
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide and dot after delay
        setTimeout(() => {
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('active');
            }
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        }, 200);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                showSlide(index);
            }
        });
    });
    
    // Auto-advance slides every 4 seconds
    setInterval(nextSlide, 4000);
    
    // Initialize first slide as active
    setTimeout(() => {
        if (slides[0]) {
            slides[0].classList.add('active');
        }
        if (dots[0]) {
            dots[0].classList.add('active');
        }
    }, 500);
}

function initCarousel() {
    let currentSlide = 0;
    const carousel = document.querySelector('.services-carousel');
    const cards = document.querySelectorAll('.services-carousel .service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!carousel || cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 40; // card width + gap
    const maxSlides = Math.max(0, cards.length - 3); // Show 3 cards at a time
    
    function updateCarousel() {
        const translateX = -(currentSlide * cardWidth);
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide >= maxSlides;
    }
    
    function nextSlide() {
        if (currentSlide < maxSlides) {
            currentSlide++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Initialize carousel
    updateCarousel();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newCardWidth = cards[0].offsetWidth + 40;
        if (newCardWidth !== cardWidth) {
            location.reload(); // Simple solution for responsive updates
        }
    });
}

// Export slider configuration for customization
export const sliderConfig = {
    heroImageInterval: 5000,
    heroTextInterval: 4000,
    transitionDuration: 200
};

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.initSliders = initSliders;
    window.initHeroImageSlider = initHeroSlider;
    window.initHeroTextSlider = initTextSlider;
}