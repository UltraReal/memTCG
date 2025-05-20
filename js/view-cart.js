// View Cart Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Load cart items
    loadCartItems();
    
    // Set up event listeners
    setupEventListeners();
});

// Load cart items from localStorage
function loadCartItems() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Get DOM elements
    const cartContainer = document.getElementById('cart-container');
    const emptyCart = document.getElementById('empty-cart');
    const cartWithItems = document.getElementById('cart-with-items');
    const cartItemsTable = document.getElementById('cart-items-table');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotalValue = document.getElementById('cart-total-value');
    
    // Check if cart is empty
    if (cartItems.length === 0) {
        emptyCart.style.display = 'block';
        cartWithItems.style.display = 'none';
        return;
    }
    
    // Show cart with items
    emptyCart.style.display = 'none';
    cartWithItems.style.display = 'block';
    
    // Clear existing items
    cartItemsTable.innerHTML = '';
    
    // Calculate totals
    let subtotal = 0;
    
    // Add each item to the table
    cartItems.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.name}" class="cart-product-image">
                    <div class="cart-product-name">
                        <a href="view-card.html?id=${item.id}">${item.name}</a>
                    </div>
                </div>
            </td>
            <td>€${item.price.toFixed(2)}</td>
            <td>
                <div class="cart-quantity">
                    <button class="cart-quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="cart-quantity-input" data-id="${item.id}">
                    <button class="cart-quantity-btn increase-quantity" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>€${itemSubtotal.toFixed(2)}</td>
            <td>
                <i class="fas fa-trash cart-remove" data-id="${item.id}"></i>
            </td>
        `;
        
        cartItemsTable.appendChild(row);
    });
    
    // Calculate tax (assuming 21% VAT)
    const tax = subtotal * 0.21;
    
    // Calculate total (subtotal + tax + shipping)
    const shipping = 4.99;
    const total = subtotal + tax + shipping;
    
    // Update summary values
    cartSubtotal.textContent = `€${subtotal.toFixed(2)}`;
    cartTax.textContent = `€${tax.toFixed(2)}`;
    cartTotalValue.textContent = `€${total.toFixed(2)}`;
}

// Set up event listeners
function setupEventListeners() {
    // Quantity increase/decrease
    document.addEventListener('click', function(event) {
        // Increase quantity
        if (event.target.classList.contains('increase-quantity')) {
            const id = event.target.getAttribute('data-id');
            updateQuantity(id, 1);
        }
        
        // Decrease quantity
        if (event.target.classList.contains('decrease-quantity')) {
            const id = event.target.getAttribute('data-id');
            updateQuantity(id, -1);
        }
        
        // Remove item
        if (event.target.classList.contains('cart-remove')) {
            const id = event.target.getAttribute('data-id');
            removeItem(id);
        }
    });
    
    // Quantity input change
    document.addEventListener('change', function(event) {
        if (event.target.classList.contains('cart-quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const quantity = parseInt(event.target.value);
            
            if (quantity > 0) {
                setQuantity(id, quantity);
            } else {
                event.target.value = 1;
                setQuantity(id, 1);
            }
        }
    });
}

// Update item quantity
function updateQuantity(id, change) {
    // Get cart items from both localStorage keys
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the item in cartItems
    const itemIndex = cartItems.findIndex(item => item.id === id);
    
    // Find the item in cart
    const cartItemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        // Update quantity in cartItems
        cartItems[itemIndex].quantity += change;
        
        // Ensure quantity is at least 1
        if (cartItems[itemIndex].quantity < 1) {
            cartItems[itemIndex].quantity = 1;
        }
        
        // Update quantity in cart as well
        if (cartItemIndex !== -1) {
            cart[cartItemIndex].quantity = cartItems[itemIndex].quantity;
        }
        
        // Save to both localStorage keys
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart display
        loadCartItems();
        
        // Update cart count in header
        updateCartSidebar();
    }
}

// Set item quantity
function setQuantity(id, quantity) {
    // Get cart items from both localStorage keys
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the item in cartItems
    const itemIndex = cartItems.findIndex(item => item.id === id);
    
    // Find the item in cart
    const cartItemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        // Update quantity in cartItems
        cartItems[itemIndex].quantity = quantity;
        
        // Update quantity in cart as well
        if (cartItemIndex !== -1) {
            cart[cartItemIndex].quantity = quantity;
        }
        
        // Save to both localStorage keys
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart display
        loadCartItems();
        
        // Update cart count in header
        updateCartSidebar();
    }
}

// Remove item from cart
function removeItem(id) {
    // Get cart items from both localStorage keys
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the item to remove from cartItems
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    
    // Filter out the item to remove from cart
    const updatedCart = cart.filter(item => item.id !== id);
    
    // Save to both localStorage keys
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart display
    loadCartItems();
    
    // Update cart count in header
    updateCartSidebar();
}

// Update cart sidebar
function updateCartSidebar() {
    // Get cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count in header
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = 0;
        cart.forEach(item => {
            count += item.quantity;
        });
        cartCount.textContent = count;
    }
    
    // Update cart sidebar if it exists
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartItems && cartTotal) {
        // Clear cart items
        cartItems.innerHTML = '';
        
        // Calculate total
        let total = 0;
        
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
                
                // Add to total
                total += item.price * item.quantity;
            });
        }
        
        // Update total
        cartTotal.textContent = `€${total.toFixed(2)}`;
    }
}