// Professional LinkedIn Media Kit - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Navigation bar scroll effect
    initNavbarScrollEffect();
    
    // Counter animations for statistics
    initCounterAnimations();
    
    // Card hover effects
    initCardEffects();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in-up class to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-up');
        observer.observe(section);
    });
    
    // Also observe individual cards for staggered animation
    const cards = document.querySelectorAll('.card, .topic-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Navigation bar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = [
        { element: document.querySelector('.hero-stats .stat-number'), target: 1464, suffix: '' },
        { element: document.querySelectorAll('.hero-stats .stat-number')[1], target: 55, suffix: 'K' },
        { element: document.querySelectorAll('.hero-stats .stat-number')[2], target: 16.7, suffix: 'K' }
    ];
    
    const metricCounters = [
        { element: document.querySelector('.analytics .metric-value'), target: 1464, suffix: '' },
        { element: document.querySelectorAll('.analytics .metric-value')[1], target: 55262, suffix: '', format: true },
        { element: document.querySelectorAll('.analytics .metric-value')[2], target: 16710, suffix: '', format: true },
        { element: document.querySelectorAll('.analytics .metric-value')[3], target: 1.72, suffix: '%' }
    ];
    
    function animateCounter(counter) {
        if (!counter.element) return;
        
        const duration = 2000; // 2 seconds
        const start = performance.now();
        const startValue = 0;
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (counter.target - startValue) * easeOutQuart;
            
            if (counter.format && counter.target > 1000) {
                counter.element.textContent = Math.floor(currentValue).toLocaleString() + counter.suffix;
            } else if (counter.target % 1 !== 0) {
                counter.element.textContent = currentValue.toFixed(1) + counter.suffix;
            } else {
                counter.element.textContent = Math.floor(currentValue) + counter.suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Observe hero section for counter animation
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Observe analytics section for metric animation
    const analyticsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                metricCounters.forEach(counter => animateCounter(counter));
                analyticsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const analyticsSection = document.querySelector('.analytics');
    if (analyticsSection) {
        analyticsObserver.observe(analyticsSection);
    }
}

// Enhanced card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.card, .topic-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Add pulse effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Add typing effect to hero tagline
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0077B5, #00A0DC);
        z-index: 10000;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize additional effects after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add active nav link highlighting
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = '#0077B5';
                link.style.fontWeight = '600';
            } else {
                link.style.fontWeight = '500';
            }
        });
    });
}

// Initialize active nav highlighting
document.addEventListener('DOMContentLoaded', function() {
    initActiveNavHighlight();
});

// Add smooth reveal animations for demographics items
function initDemographicsAnimations() {
    const demoItems = document.querySelectorAll('.demo-item');
    
    const demoObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });
    
    demoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease-out';
        demoObserver.observe(item);
    });
}

// Initialize demographics animations
document.addEventListener('DOMContentLoaded', function() {
    initDemographicsAnimations();
});

// Add click tracking for analytics (optional)
function trackButtonClicks() {
    const buttons = document.querySelectorAll('.btn, .contact-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Initialize button click tracking
document.addEventListener('DOMContentLoaded', function() {
    trackButtonClicks();
});