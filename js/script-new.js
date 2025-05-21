// Main JavaScript file for MemTCG website

document.addEventListener('DOMContentLoaded', function() {
    // Basic mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Add has-dropdown class to menu items with dropdowns
    const menuItems = document.querySelectorAll('.main-menu > li');
    
    menuItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            item.classList.add('has-dropdown');
            
            // For desktop hover
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth >= 992) {
                    dropdown.classList.add('active');
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (window.innerWidth >= 992) {
                    dropdown.classList.remove('active');
                }
            });
            
            // For mobile touch
            const link = item.querySelector('a');
            
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth < 992) {
                        // If this link has a dropdown menu, prevent default action and toggle dropdown
                        if (dropdown) {
                            e.preventDefault();
                            dropdown.classList.toggle('active');
                            this.classList.toggle('active');
                        }
                    }
                });
            }
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send this to your backend
                alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
                emailInput.value = '';
            }
        });
    }

    // Product image hover effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const img = card.querySelector('.product-image img');
        if (img) {
            card.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Add window resize event listener
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // Close mobile menu on larger screens
            const nav = document.querySelector('nav');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            }
        }
    });
});