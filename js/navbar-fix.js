/**
 * Navbar Fix - Definitieve oplossing voor het hamburger menu
 * Deze JavaScript zorgt voor een perfect werkend hamburger menu op alle pagina's
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navbar fix loaded');
    
    // Elementen selecteren
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    // Voeg has-dropdown class toe aan menu items met dropdowns
    document.querySelectorAll('.main-menu > li').forEach(function(item) {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            item.classList.add('has-dropdown');
        }
    });
    
    // Hamburger menu toggle
    if (mobileMenuToggle && nav) {
        console.log('Mobile menu toggle found');
        
        mobileMenuToggle.addEventListener('click', function(e) {
            console.log('Mobile menu toggle clicked');
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle nav display
            if (nav.style.display === 'block') {
                nav.style.display = 'none';
                console.log('Menu closed');
            } else {
                nav.style.display = 'block';
                console.log('Menu opened');
                
                // Zorg ervoor dat alle dropdowns gesloten zijn
                document.querySelectorAll('.dropdown-menu').forEach(function(dropdown) {
                    dropdown.style.display = 'none';
                    dropdown.classList.remove('active');
                });
                
                document.querySelectorAll('.main-menu > li > a').forEach(function(link) {
                    link.classList.remove('active');
                });
            }
        });
    } else {
        console.error('Mobile menu toggle or nav not found');
        if (!mobileMenuToggle) console.error('Mobile menu toggle not found');
        if (!nav) console.error('Nav not found');
    }
    
    // Dropdown menu toggle
    document.querySelectorAll('.main-menu > li > a').forEach(function(link) {
        const parentLi = link.parentElement;
        const dropdown = parentLi.querySelector('.dropdown-menu');
        
        if (dropdown) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    console.log('Dropdown link clicked');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Sluit alle andere dropdowns
                    document.querySelectorAll('.main-menu > li > a').forEach(function(otherLink) {
                        if (otherLink !== link) {
                            otherLink.classList.remove('active');
                            const otherDropdown = otherLink.parentElement.querySelector('.dropdown-menu');
                            if (otherDropdown) {
                                otherDropdown.style.display = 'none';
                                otherDropdown.classList.remove('active');
                            }
                        }
                    });
                    
                    // Toggle huidige dropdown
                    link.classList.toggle('active');
                    if (dropdown.style.display === 'block') {
                        dropdown.style.display = 'none';
                        dropdown.classList.remove('active');
                        console.log('Dropdown closed');
                    } else {
                        dropdown.style.display = 'block';
                        dropdown.classList.add('active');
                        console.log('Dropdown opened');
                    }
                }
            });
        }
    });
    
    // Sluit menu bij klikken buiten het menu
    document.addEventListener('click', function(e) {
        if (nav && nav.style.display === 'block') {
            if (!nav.contains(e.target) && e.target !== mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
                console.log('Clicked outside menu, closing');
                nav.style.display = 'none';
                
                // Sluit alle dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(function(dropdown) {
                    dropdown.style.display = 'none';
                    dropdown.classList.remove('active');
                });
                
                document.querySelectorAll('.main-menu > li > a').forEach(function(link) {
                    link.classList.remove('active');
                });
            }
        }
    });
    
    // Reset menu bij schermgrootte wijziging
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            console.log('Screen resized to desktop view');
            if (nav) {
                nav.style.display = '';
            }
            
            document.querySelectorAll('.dropdown-menu').forEach(function(dropdown) {
                dropdown.style.display = '';
                dropdown.classList.remove('active');
            });
            
            document.querySelectorAll('.main-menu > li > a').forEach(function(link) {
                link.classList.remove('active');
            });
        }
    });
    
    // Markeer actieve pagina in het menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Current page:', currentPage);
    
    document.querySelectorAll('.main-menu > li > a').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            console.log('Active link found:', href);
            link.classList.add('active');
        }
    });
});