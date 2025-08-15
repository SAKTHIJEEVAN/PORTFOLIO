// Mobile Menu Toggle
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

// Show/Hide mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Hide mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Smooth Scroll Navigation - Fixed Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Handle all navigation links
    const navigationLinks = document.querySelectorAll('a[href^="#"]');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = 60; // Fixed header height
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('show-menu');
                
                // Update active link
                updateActiveLink(targetId);
            }
        });
    });
});

// Update active link function
function updateActiveLink(activeId) {
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active-link');
        }
    });
}

// Active Link Management on Scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset + 100; // Account for header height

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__link[href*=${sectionId}]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active-link'));
            // Add active class to current link
            if (correspondingLink) {
                correspondingLink.classList.add('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Skills Animation - Enhanced
function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const skillsBars = document.querySelectorAll('.skills__percentage');
    let skillsAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                skillsBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, index * 100); // Stagger the animations
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Initialize skills animation
document.addEventListener('DOMContentLoaded', animateSkills);

// Contact Form Handling - Enhanced
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Remove any existing messages
        removeFormMessages();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            showFormMessage('Please correct the errors above.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission with delay
        setTimeout(() => {
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Remove existing error messages
    removeErrorMessages();
    
    // Name validation
    if (!name || name.length < 2) {
        showFieldError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!subject || subject.length < 3) {
        showFieldError('subject', 'Please enter a subject (at least 3 characters)');
        isValid = false;
    }
    
    // Message validation
    if (!message || message.length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Add error class to field
    field.classList.add('error');
    field.style.borderColor = 'var(--color-error)';
    
    // Create and add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--space-4)';
    errorElement.style.display = 'block';
    
    formGroup.appendChild(errorElement);
}

function removeErrorMessages() {
    // Remove error classes
    const errorFields = document.querySelectorAll('.form-control.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
        field.style.borderColor = '';
    });
    
    // Remove error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
}

function removeFormMessages() {
    const formMessages = document.querySelectorAll('.form-message');
    formMessages.forEach(message => message.remove());
}

function showFormMessage(message, type) {
    const contactForm = document.getElementById('contact-form');
    
    // Remove any existing messages
    removeFormMessages();
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message status status--${type}`;
    messageElement.textContent = message;
    messageElement.style.marginTop = 'var(--space-16)';
    messageElement.style.textAlign = 'center';
    messageElement.style.padding = 'var(--space-12) var(--space-16)';
    messageElement.style.borderRadius = 'var(--radius-base)';
    messageElement.style.display = 'block';
    
    // Add message after form
    contactForm.parentNode.appendChild(messageElement);
    
    // Remove message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Header Background Change on Scroll
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// External Links Handler - Ensure they open in new tabs
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[target="_blank"]');
    externalLinks.forEach(link => {
        // Ensure target="_blank" is set
        link.setAttribute('target', '_blank');
        // Add security attributes
        link.setAttribute('rel', 'noopener noreferrer');
        
        // Add click event to ensure it works
        link.addEventListener('click', function(e) {
            // Let the default behavior handle the link opening
            console.log('Opening external link:', this.href);
        });
    });
});

// Add dynamic styles
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-header {
            background-color: rgba(252, 252, 249, 0.95) !important;
            backdrop-filter: blur(10px);
        }
        
        @media (prefers-color-scheme: dark) {
            .scroll-header {
                background-color: rgba(31, 33, 33, 0.95) !important;
            }
        }
        
        [data-color-scheme="dark"] .scroll-header {
            background-color: rgba(31, 33, 33, 0.95) !important;
        }
        
        [data-color-scheme="light"] .scroll-header {
            background-color: rgba(252, 252, 249, 0.95) !important;
        }
        
        .form-control.error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
        }
        
        .error-message {
            display: block;
            font-size: var(--font-size-sm);
            color: var(--color-error);
            margin-top: var(--space-4);
        }
        
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--color-navy-primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-md);
        }
        
        .scroll-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: var(--color-navy-hover);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
    `;
    document.head.appendChild(style);
}

// Smooth reveal animations for sections
function revealSections() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Card hover effects
function initializeCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Typing effect for home title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Preload critical sections for better performance
function preloadSections() {
    const criticalSections = ['home', 'about', 'skills'];
    criticalSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.willChange = 'transform, opacity';
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addDynamicStyles();
    revealSections();
    initializeCardEffects();
    createScrollToTop();
    preloadSections();
    
    // Initialize typing effect for home title with delay
    const homeTitle = document.querySelector('.home__title');
    if (homeTitle) {
        const originalText = homeTitle.textContent;
        setTimeout(() => {
            typeWriter(homeTitle, originalText, 80);
        }, 1000);
    }
    
    // Set initial active link
    updateActiveLink('home');
});