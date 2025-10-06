// Enhanced mobile navigation functionality
function hideShow() {
    const navLeft = document.querySelector('.nav-left');
    const hamburger = document.querySelector('.fa-bars');
    const body = document.body;

    if (navLeft.classList.contains('is-active')) {
        // Close navigation
        navLeft.classList.remove('is-active');
        hamburger.classList.remove('is-active');
        body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
    } else {
        // Open navigation
        navLeft.classList.add('is-active');
        hamburger.classList.add('is-active');
        body.style.overflow = 'hidden'; // Prevent background scrolling
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Close navigation menu');

        // Focus first navigation link for accessibility
        setTimeout(() => {
            const firstLink = navLeft.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }, 300);
    }
}

// Close mobile navigation when clicking outside
function closeMobileNavOnOutsideClick(event) {
    const navLeft = document.querySelector('.nav-left');
    const hamburger = document.querySelector('.fa-bars');

    if (navLeft.classList.contains('is-active') &&
        !navLeft.contains(event.target) &&
        !hamburger.contains(event.target)) {
        hideShow();
    }
}

// Close mobile navigation on escape key
function closeMobileNavOnEscape(event) {
    if (event.key === 'Escape') {
        const navLeft = document.querySelector('.nav-left');
        if (navLeft.classList.contains('is-active')) {
            hideShow();
            // Return focus to hamburger button
            document.querySelector('.fa-bars').focus();
        }
    }
}

// Initialize mobile navigation enhancements
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.fa-bars');

    // Set initial ARIA attributes
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');

    // Add keyboard support for hamburger button
    hamburger.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            hideShow();
        }
    });

    // Close navigation when clicking outside
    document.addEventListener('click', closeMobileNavOnOutsideClick);

    // Close navigation on escape key
    document.addEventListener('keydown', closeMobileNavOnEscape);

    // Close navigation when window is resized to desktop size
    window.addEventListener('resize', function () {
        if (window.innerWidth > 1132) {
            const navLeft = document.querySelector('.nav-left');
            const hamburger = document.querySelector('.fa-bars');
            const body = document.body;

            if (navLeft.classList.contains('is-active')) {
                navLeft.classList.remove('is-active');
                hamburger.classList.remove('is-active');
                body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Enhanced navigation link handling for mobile
    const navLinks = document.querySelectorAll('.nav-left a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Close mobile navigation when a link is clicked
            if (window.innerWidth <= 1132) {
                setTimeout(() => {
                    hideShow();
                }, 150);
            }
        });
    });
});

// Enhanced Table of Contents functionality
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for anchor links in table of contents
    const tocLinks = document.querySelectorAll('main aside a[href^="#"]');

    tocLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate offset to account for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                updateActiveSection(this);
            }
        });
    });

    // Update active section on scroll
    let ticking = false;

    function updateActiveSection(activeLink = null) {
        const sections = document.querySelectorAll('h2[id], h3[id], h4[id]');
        const headerHeight = document.querySelector('header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;

        if (activeLink) {
            // Remove active class from all links
            tocLinks.forEach(link => link.classList.remove('active'));
            // Add active class to clicked link
            activeLink.classList.add('active');
            return;
        }

        // Find current section based on scroll position
        let currentSection = null;
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                currentSection = section;
            }
        });

        // Update active state in table of contents
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === '#' + currentSection.id) {
                link.classList.add('active');
            }
        });
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', onScroll);

    // Initialize active section on page load
    updateActiveSection();
});

// Enhanced header scroll effect
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // Initialize header state
    updateHeader();
});

// Enhanced image loading with fade-in effect
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function () {
                this.style.opacity = '1';
            });
        }
    });
});

// Performance optimization: Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        // Trigger any resize-dependent calculations here
        if (window.innerWidth > 1132) {
            const navLeft = document.querySelector('.nav-left');
            const hamburger = document.querySelector('.fa-bars');
            const body = document.body;

            if (navLeft.classList.contains('is-active')) {
                navLeft.classList.remove('is-active');
                hamburger.classList.remove('is-active');
                body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    }, 250);
});