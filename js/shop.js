// Shop Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const rarityCheckboxes = document.querySelectorAll('input[name="rarity"]');
    const typeCheckboxes = document.querySelectorAll('input[name="type"]');
    const priceMinInput = document.querySelector('.price-range input[placeholder="Min"]');
    const priceMaxInput = document.querySelector('.price-range input[placeholder="Max"]');
    const applyPriceButton = document.querySelector('.filter-button');
    const sortSelect = document.getElementById('sort');
    const viewOptions = document.querySelectorAll('.view-option');
    const productsGrid = document.querySelector('.products-grid');
    const resultsCount = document.querySelector('.results-count p');

    // Products data (in a real application, this would come from a database)
    let products = []; // Will be populated from the page or via AJAX
    let filteredProducts = []; // Products after filtering
    let originalProductOrder = []; // To maintain original order for sorting

    // Initialize
    initializeProducts();
    setupEventListeners();
    applyUrlParams();

    // Initialize products from the DOM
    function initializeProducts() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            const id = card.querySelector('.add-to-cart').getAttribute('data-id');
            const name = card.querySelector('.add-to-cart').getAttribute('data-name');
            const price = parseFloat(card.querySelector('.add-to-cart').getAttribute('data-price'));
            const image = card.querySelector('.add-to-cart').getAttribute('data-image');
            
            // Get rating count for popularity sorting
            const ratingSpan = card.querySelector('.product-rating span');
            const ratingCount = ratingSpan ? parseInt(ratingSpan.textContent.replace(/[()]/g, '')) : 0;
            
            const product = {
                id,
                name,
                price,
                image,
                category: card.getAttribute('data-category') || 'single-cards',
                rarity: card.getAttribute('data-rarity') || 'common',
                type: card.getAttribute('data-type') || 'normal',
                popularity: ratingCount, // Use rating count as popularity metric
                element: card,
                index: index // Store original index for "newest" sort
            };
            
            products.push(product);
        });
        
        // Store original order for sorting
        originalProductOrder = [...products];
        
        // Initialize filtered products
        filteredProducts = [...products];
    }

    // Set up event listeners
    function setupEventListeners() {
        // Category filters
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
        
        // Rarity filters
        rarityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
        
        // Type filters
        typeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
        
        // Price range filter
        if (applyPriceButton) {
            applyPriceButton.addEventListener('click', applyFilters);
        }
        
        // Sort options
        if (sortSelect) {
            sortSelect.addEventListener('change', applySort);
        }
        
        // View options (grid/list)
        viewOptions.forEach(option => {
            option.addEventListener('click', function() {
                viewOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                if (this.querySelector('.fa-th')) {
                    productsGrid.classList.remove('list-view');
                    productsGrid.classList.add('grid-view');
                } else {
                    productsGrid.classList.remove('grid-view');
                    productsGrid.classList.add('list-view');
                }
            });
        });
    }

    // Apply URL parameters on page load
    function applyUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Apply category from URL
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            categoryCheckboxes.forEach(checkbox => {
                if (checkbox.value === categoryParam) {
                    checkbox.checked = true;
                }
            });
        }
        
        // Apply other params if they exist
        const minPrice = urlParams.get('min_price');
        const maxPrice = urlParams.get('max_price');
        const rarity = urlParams.get('rarity');
        const type = urlParams.get('type');
        const sort = urlParams.get('sort');
        
        if (minPrice) priceMinInput.value = minPrice;
        if (maxPrice) priceMaxInput.value = maxPrice;
        
        if (rarity) {
            rarityCheckboxes.forEach(checkbox => {
                if (checkbox.value === rarity) {
                    checkbox.checked = true;
                }
            });
        }
        
        if (type) {
            typeCheckboxes.forEach(checkbox => {
                if (checkbox.value === type) {
                    checkbox.checked = true;
                }
            });
        }
        
        if (sort && sortSelect) {
            sortSelect.value = sort;
        }
        
        // Apply all filters
        applyFilters();
    }

    // Apply all filters
    function applyFilters() {
        // Get selected categories
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Get selected rarities
        const selectedRarities = Array.from(rarityCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Get selected types
        const selectedTypes = Array.from(typeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Get price range
        const minPrice = priceMinInput.value ? parseFloat(priceMinInput.value) : 0;
        const maxPrice = priceMaxInput.value ? parseFloat(priceMaxInput.value) : Infinity;
        
        // Filter products
        filteredProducts = products.filter(product => {
            // Category filter
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            
            // Rarity filter
            const rarityMatch = selectedRarities.length === 0 || selectedRarities.includes(product.rarity);
            
            // Type filter
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
            
            // Price filter
            const priceMatch = product.price >= minPrice && product.price <= maxPrice;
            
            return categoryMatch && rarityMatch && typeMatch && priceMatch;
        });
        
        // Apply current sort
        applySort();
        
        // Update URL with filters
        updateURL();
    }

    // Apply sorting
    function applySort() {
        if (!sortSelect) return;
        
        const sortValue = sortSelect.value;
        
        switch (sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // Sort by the original index in reverse (assuming newer products are added later)
                filteredProducts.sort((a, b) => b.index - a.index);
                break;
            case 'popularity':
                // Sort by popularity (rating count)
                filteredProducts.sort((a, b) => b.popularity - a.popularity);
                break;
            default:
                // Default to original order
                filteredProducts.sort((a, b) => a.index - b.index);
                break;
        }
        
        // Update display
        updateProductsDisplay();
        
        // Update URL with sort
        updateURL();
    }

    // Update products display
    function updateProductsDisplay() {
        // Hide all products
        products.forEach(product => {
            if (product.element) {
                product.element.style.display = 'none';
            }
        });
        
        // Show filtered products
        filteredProducts.forEach(product => {
            if (product.element) {
                product.element.style.display = '';
            }
        });
        
        // Update results count
        if (resultsCount) {
            resultsCount.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;
        }
    }

    // Update URL with current filters and sort
    function updateURL() {
        const urlParams = new URLSearchParams();
        
        // Add categories to URL
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        if (selectedCategories.length === 1) {
            urlParams.set('category', selectedCategories[0]);
        }
        
        // Add rarities to URL
        const selectedRarities = Array.from(rarityCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        if (selectedRarities.length === 1) {
            urlParams.set('rarity', selectedRarities[0]);
        }
        
        // Add types to URL
        const selectedTypes = Array.from(typeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        if (selectedTypes.length === 1) {
            urlParams.set('type', selectedTypes[0]);
        }
        
        // Add price range to URL
        if (priceMinInput.value) {
            urlParams.set('min_price', priceMinInput.value);
        }
        
        if (priceMaxInput.value) {
            urlParams.set('max_price', priceMaxInput.value);
        }
        
        // Add sort to URL
        if (sortSelect && sortSelect.value !== 'popularity') {
            urlParams.set('sort', sortSelect.value);
        }
        
        // Update URL without reloading the page
        const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }
});