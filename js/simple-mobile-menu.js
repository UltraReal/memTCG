/**
 * Enhanced Mobile Menu
 * A smooth and responsive implementation for mobile menu functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced mobile menu loaded');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Add has-dropdown class to menu items with dropdowns
    const menuItems = document.querySelectorAll('.main-menu > li');
    menuItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            item.classList.add('has-dropdown');
        }
    });
    
    // Toggle mobile menu
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active classes
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Close all dropdowns when closing the menu
            if (!nav.classList.contains('active')) {
                closeAllDropdowns();
            }
        });
    }
    
    // Handle dropdown menus
    const dropdownLinks = document.querySelectorAll('.main-menu > li.has-dropdown > a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.nextElementSibling;
                const isActive = this.classList.contains('active');
                
                // Close all other dropdowns
                closeAllDropdowns();
                
                // Toggle current dropdown if it wasn't active before
                if (!isActive) {
                    this.classList.add('active');
                    if (dropdown) {
                        dropdown.classList.add('active');
                    }
                }
            }
        });
    });
    
    // Close all dropdowns
    function closeAllDropdowns() {
        document.querySelectorAll('.main-menu > li > a.active').forEach(activeLink => {
            activeLink.classList.remove('active');
        });
        
        document.querySelectorAll('.dropdown-menu.active').forEach(activeDropdown => {
            activeDropdown.classList.remove('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && e.target !== mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                closeAllDropdowns();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // Reset mobile menu state on desktop
            if (nav) {
                nav.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            closeAllDropdowns();
        }
    });
    
    // Set active menu item based on current page
    function setActiveMenuItem() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        
        document.querySelectorAll('.main-menu > li > a').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active menu item
    setActiveMenuItem();
});