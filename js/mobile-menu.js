/**
 * Mobile Menu Handler
 * Handles the mobile menu toggle and dropdown functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu script loaded');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        console.log('Mobile menu toggle found');
        
        mobileMenuToggle.addEventListener('click', function(e) {
            console.log('Mobile menu toggle clicked');
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the active class
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                console.log('Menu closed');
            } else {
                nav.classList.add('active');
                console.log('Menu opened');
            }
            
            // Close all dropdowns when closing the menu
            if (!nav.classList.contains('active')) {
                document.querySelectorAll('.dropdown-menu.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                document.querySelectorAll('.main-menu > li > a.active').forEach(link => {
                    link.classList.remove('active');
                });
            }
        });
    } else {
        console.log('Mobile menu toggle or nav not found');
        if (!mobileMenuToggle) console.log('Mobile menu toggle not found');
        if (!nav) console.log('Nav not found');
    }
    
    // Handle dropdown menus
    const menuItems = document.querySelectorAll('.main-menu > li');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (dropdown && link) {
            // Add has-dropdown class to parent li
            item.classList.add('has-dropdown');
            
            // For mobile touch
            link.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle active class on the link
                    this.classList.toggle('active');
                    
                    // Toggle the dropdown
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    menuItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherDropdown = otherItem.querySelector('.dropdown-menu');
                            const otherLink = otherItem.querySelector('a');
                            if (otherDropdown && otherDropdown.classList.contains('active')) {
                                otherDropdown.classList.remove('active');
                                if (otherLink) otherLink.classList.remove('active');
                            }
                        }
                    });
                }
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && e.target !== mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                document.querySelectorAll('.main-menu > li > a.active').forEach(link => {
                    link.classList.remove('active');
                });
            }
        }
    });
    
    // For desktop hover
    if (window.innerWidth >= 992) {
        menuItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown-menu');
            if (dropdown) {
                item.addEventListener('mouseenter', function() {
                    dropdown.classList.add('active');
                });
                
                item.addEventListener('mouseleave', function() {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // Reset mobile menu state on desktop
            if (nav) nav.classList.remove('active');
            
            // Setup desktop hover
            menuItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) {
                    item.addEventListener('mouseenter', function() {
                        dropdown.classList.add('active');
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        dropdown.classList.remove('active');
                    });
                }
            });
        } else {
            // Remove desktop hover events on mobile
            menuItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) {
                    item.removeEventListener('mouseenter', null);
                    item.removeEventListener('mouseleave', null);
                }
            });
        }
    });
});