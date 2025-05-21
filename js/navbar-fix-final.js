/**
 * Navbar Fix - Definitieve oplossing voor het hamburger menu
 * Deze JavaScript zorgt voor een perfect werkend hamburger menu op alle pagina's
 */
window.addEventListener('DOMContentLoaded', function() {
    console.log('Navbar fix loaded');
    
    // Elementen selecteren
    var mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('nav');
    
    // Voeg has-dropdown class toe aan menu items met dropdowns
    var menuItems = document.querySelectorAll('.main-menu > li');
    for (var i = 0; i < menuItems.length; i++) {
        var item = menuItems[i];
        var dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            item.classList.add('has-dropdown');
        }
    }
    
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
                var allDropdowns = document.querySelectorAll('.dropdown-menu');
                for (var i = 0; i < allDropdowns.length; i++) {
                    allDropdowns[i].style.display = 'none';
                    allDropdowns[i].classList.remove('active');
                }
                
                var allLinks = document.querySelectorAll('.main-menu > li > a');
                for (var i = 0; i < allLinks.length; i++) {
                    allLinks[i].classList.remove('active');
                }
            }
        });
    } else {
        console.error('Mobile menu toggle or nav not found');
        if (!mobileMenuToggle) console.error('Mobile menu toggle not found');
        if (!nav) console.error('Nav not found');
    }
    
    // Dropdown menu toggle
    var dropdownLinks = document.querySelectorAll('.main-menu > li > a');
    for (var i = 0; i < dropdownLinks.length; i++) {
        var link = dropdownLinks[i];
        var parentLi = link.parentElement;
        var dropdown = parentLi.querySelector('.dropdown-menu');
        
        if (dropdown) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    console.log('Dropdown link clicked');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    var thisLink = this;
                    var thisDropdown = this.parentElement.querySelector('.dropdown-menu');
                    
                    // Sluit alle andere dropdowns
                    var allLinks = document.querySelectorAll('.main-menu > li > a');
                    for (var j = 0; j < allLinks.length; j++) {
                        var otherLink = allLinks[j];
                        if (otherLink !== thisLink) {
                            otherLink.classList.remove('active');
                            var otherDropdown = otherLink.parentElement.querySelector('.dropdown-menu');
                            if (otherDropdown) {
                                otherDropdown.style.display = 'none';
                                otherDropdown.classList.remove('active');
                            }
                        }
                    }
                    
                    // Toggle huidige dropdown
                    thisLink.classList.toggle('active');
                    if (thisDropdown.style.display === 'block') {
                        thisDropdown.style.display = 'none';
                        thisDropdown.classList.remove('active');
                        console.log('Dropdown closed');
                    } else {
                        thisDropdown.style.display = 'block';
                        thisDropdown.classList.add('active');
                        console.log('Dropdown opened');
                    }
                }
            });
        }
    }
    
    // Sluit menu bij klikken buiten het menu
    document.addEventListener('click', function(e) {
        if (nav && nav.style.display === 'block') {
            if (!nav.contains(e.target) && e.target !== mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
                console.log('Clicked outside menu, closing');
                nav.style.display = 'none';
                
                // Sluit alle dropdowns
                var allDropdowns = document.querySelectorAll('.dropdown-menu');
                for (var i = 0; i < allDropdowns.length; i++) {
                    allDropdowns[i].style.display = 'none';
                    allDropdowns[i].classList.remove('active');
                }
                
                var allLinks = document.querySelectorAll('.main-menu > li > a');
                for (var i = 0; i < allLinks.length; i++) {
                    allLinks[i].classList.remove('active');
                }
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
            
            var allDropdowns = document.querySelectorAll('.dropdown-menu');
            for (var i = 0; i < allDropdowns.length; i++) {
                allDropdowns[i].style.display = '';
                allDropdowns[i].classList.remove('active');
            }
            
            var allLinks = document.querySelectorAll('.main-menu > li > a');
            for (var i = 0; i < allLinks.length; i++) {
                allLinks[i].classList.remove('active');
            }
        }
    });
    
    // Markeer actieve pagina in het menu
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Current page:', currentPage);
    
    var menuLinks = document.querySelectorAll('.main-menu > li > a');
    for (var i = 0; i < menuLinks.length; i++) {
        var link = menuLinks[i];
        var href = link.getAttribute('href');
        if (href === currentPage) {
            console.log('Active link found:', href);
            link.classList.add('active');
        }
    }
});