// Main JavaScript file for MemeTCG website

document.addEventListener('DOMContentLoaded', function() {
    // Create menu overlay
    const body = document.body;
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking on overlay
    menuOverlay.addEventListener('click', function() {
        mainMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
    });
    
    // Dropdown menu functionality
    const menuItems = document.querySelectorAll('.main-menu li');
    
    menuItems.forEach(item => {
        if (item.querySelector('.dropdown-menu')) {
            item.classList.add('has-dropdown');
            
            // For desktop hover
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth >= 992) {
                    this.querySelector('.dropdown-menu').classList.add('active');
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (window.innerWidth >= 992) {
                    this.querySelector('.dropdown-menu').classList.remove('active');
                }
            });
            
            // For mobile touch
            const link = item.querySelector('a');
            
            // Handle click on parent menu items with dropdowns
            link.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    // If this link has a dropdown menu, prevent default action and toggle dropdown
                    if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
                        e.preventDefault();
                        const dropdown = this.nextElementSibling;
                        
                        // Close all other dropdowns and reset active links
                        menuItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.querySelector('.dropdown-menu.active')) {
                                otherItem.querySelector('.dropdown-menu').classList.remove('active');
                                if (otherItem.querySelector('a.active')) {
                                    otherItem.querySelector('a').classList.remove('active');
                                }
                            }
                        });
                        
                        // Toggle this dropdown
                        dropdown.classList.toggle('active');
                        
                        // Toggle active class on the link for arrow animation
                        this.classList.toggle('active');
                    }
                }
            });
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
});