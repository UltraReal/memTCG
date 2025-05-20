// Cart Sidebar Functionality
// This file ensures the cart sidebar works consistently across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Make sure the View Cart button links to the view-cart.html page
    const viewCartBtn = document.querySelector('.view-cart');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', function() {
            window.location.href = 'view-cart.html';
        });
    }
    
    // Make sure the cart count is updated when the page loads
    updateCartCount();
});

// Update cart count in the header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let count = 0;
        
        cart.forEach(item => {
            count += item.quantity;
        });
        
        cartCount.textContent = count;
    }
}