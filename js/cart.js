// Shopping Cart Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Cart elements
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Cart data
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Initialize cart
    updateCartDisplay();
    
    // Open cart sidebar
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close cart sidebar
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close cart when clicking on overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');
            
            // Check if item is already in cart
            const existingItemIndex = cart.findIndex(item => item.id === id);
            
            if (existingItemIndex > -1) {
                // Item exists, increase quantity
                cart[existingItemIndex].quantity += 1;
            } else {
                // Add new item to cart
                cart.push({
                    id,
                    name,
                    price,
                    image,
                    quantity: 1
                });
            }
            
            // Save cart to localStorage
            saveCart();
            
            // Update cart display
            updateCartDisplay();
            
            // Show cart sidebar
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animation effect
            this.classList.add('added');
            setTimeout(() => {
                this.classList.remove('added');
            }, 1000);
        });
    });
    
    // Update cart display
    function updateCartDisplay() {
        if (!cartItems || !cartTotal || !cartCount) return;
        
        // Clear cart items
        cartItems.innerHTML = '';
        
        // Calculate total and count
        let total = 0;
        let count = 0;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            // Add each item to cart
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
                
                // Add to total and count
                total += item.price * item.quantity;
                count += item.quantity;
            });
            
            // Add event listeners to quantity buttons and remove buttons
            addCartItemEventListeners();
        }
        
        // Update total and count
        cartTotal.textContent = `€${total.toFixed(2)}`;
        cartCount.textContent = count;
    }
    
    // Add event listeners to cart item buttons
    function addCartItemEventListeners() {
        // Decrease quantity
        document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const itemIndex = cart.findIndex(item => item.id === id);
                
                if (itemIndex > -1) {
                    if (cart[itemIndex].quantity > 1) {
                        cart[itemIndex].quantity -= 1;
                    } else {
                        cart.splice(itemIndex, 1);
                    }
                    
                    saveCart();
                    updateCartDisplay();
                }
            });
        });
        
        // Increase quantity
        document.querySelectorAll('.quantity-btn.increase').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const itemIndex = cart.findIndex(item => item.id === id);
                
                if (itemIndex > -1) {
                    cart[itemIndex].quantity += 1;
                    saveCart();
                    updateCartDisplay();
                }
            });
        });
        
        // Quantity input change
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = this.getAttribute('data-id');
                const quantity = parseInt(this.value);
                const itemIndex = cart.findIndex(item => item.id === id);
                
                if (itemIndex > -1 && quantity > 0) {
                    cart[itemIndex].quantity = quantity;
                    saveCart();
                    updateCartDisplay();
                }
            });
        });
        
        // Remove item
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const itemIndex = cart.findIndex(item => item.id === id);
                
                if (itemIndex > -1) {
                    cart.splice(itemIndex, 1);
                    saveCart();
                    updateCartDisplay();
                }
            });
        });
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartItems', JSON.stringify(cart)); // For compatibility with view-cart.js
    }
    
    // Make updateCartDisplay function globally available
    window.updateCartDisplay = updateCartDisplay;
    
    // View Cart button
    const viewCartBtn = document.querySelector('.view-cart');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', function() {
            window.location.href = 'view-cart.html';
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert('Your cart is empty. Add some items before checkout.');
            }
        });
    }
});