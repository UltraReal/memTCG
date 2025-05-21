/**
 * Pagination functionality for the shop page
 * This script handles the pagination of products
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pagination script loaded');
    
    // Constants
    const PRODUCTS_PER_PAGE = 12;
    
    // Elements
    const productGrid = document.querySelector('.product-grid');
    const paginationContainer = document.querySelector('.pagination');
    const allProducts = Array.from(document.querySelectorAll('.product-card'));
    
    // Variables
    let currentPage = 1;
    let filteredProducts = [...allProducts];
    let totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    
    // Initialize pagination
    function initPagination() {
        console.log(`Initializing pagination with ${filteredProducts.length} products`);
        
        // Calculate total pages
        totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
        
        // Update pagination UI
        updatePaginationUI();
        
        // Show products for current page
        showProductsForPage(currentPage);
    }
    
    // Update pagination UI
    function updatePaginationUI() {
        if (!paginationContainer) return;
        
        // Clear pagination container
        paginationContainer.innerHTML = '';
        
        // Add previous button
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.innerHTML = '<i class="fas fa-angle-left"></i>';
        prevButton.classList.toggle('disabled', currentPage === 1);
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
        paginationContainer.appendChild(prevButton);
        
        // Determine which page numbers to show
        let startPage, endPage;
        
        if (totalPages <= 5) {
            // Less than 5 pages, show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // More than 5 pages, calculate range
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }
        
        // Add first page and ellipsis if needed
        if (startPage > 1) {
            const firstPageLink = document.createElement('a');
            firstPageLink.href = '#';
            firstPageLink.textContent = '1';
            firstPageLink.addEventListener('click', function(e) {
                e.preventDefault();
                goToPage(1);
            });
            paginationContainer.appendChild(firstPageLink);
            
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                paginationContainer.appendChild(ellipsis);
            }
        }
        
        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.classList.toggle('active', i === currentPage);
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                goToPage(i);
            });
            paginationContainer.appendChild(pageLink);
        }
        
        // Add last page and ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                paginationContainer.appendChild(ellipsis);
            }
            
            const lastPageLink = document.createElement('a');
            lastPageLink.href = '#';
            lastPageLink.textContent = totalPages;
            lastPageLink.addEventListener('click', function(e) {
                e.preventDefault();
                goToPage(totalPages);
            });
            paginationContainer.appendChild(lastPageLink);
        }
        
        // Add next button
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.innerHTML = '<i class="fas fa-angle-right"></i>';
        nextButton.classList.toggle('disabled', currentPage === totalPages);
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
        paginationContainer.appendChild(nextButton);
        
        // Show/hide pagination based on number of pages
        paginationContainer.style.display = totalPages > 1 ? 'flex' : 'none';
        
        // Update URL with current page
        updateUrlWithPage(currentPage);
    }
    
    // Show products for the specified page
    function showProductsForPage(page) {
        if (!productGrid) return;
        
        // Calculate start and end indices
        const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
        const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length);
        
        console.log(`Showing products ${startIndex + 1} to ${endIndex} of ${filteredProducts.length}`);
        
        // Hide all products
        allProducts.forEach(product => {
            product.style.display = 'none';
        });
        
        // Show products for current page
        for (let i = startIndex; i < endIndex; i++) {
            if (filteredProducts[i]) {
                filteredProducts[i].style.display = 'flex';
            }
        }
        
        // Scroll to top of product section
        const shopSection = document.querySelector('.shop-section');
        if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Go to specified page
    function goToPage(page) {
        currentPage = page;
        updatePaginationUI();
        showProductsForPage(currentPage);
    }
    
    // Filter products based on current filters
    function filterProducts() {
        // Get filter values
        const categoryFilter = document.getElementById('category-filter')?.value || 'all';
        const rarityFilter = document.getElementById('rarity-filter')?.value || 'all';
        const typeFilter = document.getElementById('type-filter')?.value || 'all';
        const minPrice = parseFloat(document.getElementById('min-price')?.value || 0);
        const maxPrice = parseFloat(document.getElementById('max-price')?.value || 1000);
        const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';
        
        console.log(`Filtering products: category=${categoryFilter}, rarity=${rarityFilter}, type=${typeFilter}, price=${minPrice}-${maxPrice}, search="${searchQuery}"`);
        
        // Filter products
        filteredProducts = allProducts.filter(product => {
            // Get product data
            const category = product.dataset.category;
            const rarity = product.dataset.rarity;
            const type = product.dataset.type;
            const priceText = product.querySelector('.product-price')?.textContent || '€0';
            const price = parseFloat(priceText.replace('€', ''));
            const name = product.querySelector('h3')?.textContent.toLowerCase() || '';
            
            // Apply filters
            const matchesCategory = categoryFilter === 'all' || category === categoryFilter;
            const matchesRarity = rarityFilter === 'all' || rarity === rarityFilter;
            const matchesType = typeFilter === 'all' || type === typeFilter;
            const matchesPrice = price >= minPrice && price <= maxPrice;
            const matchesSearch = searchQuery === '' || name.includes(searchQuery);
            
            return matchesCategory && matchesRarity && matchesType && matchesPrice && matchesSearch;
        });
        
        // Reset to first page
        currentPage = 1;
        
        // Update pagination
        initPagination();
    }
    
    // Add event listeners to filter controls
    function setupFilterListeners() {
        const filterControls = [
            document.getElementById('category-filter'),
            document.getElementById('rarity-filter'),
            document.getElementById('type-filter'),
            document.getElementById('min-price'),
            document.getElementById('max-price'),
            document.getElementById('search-input')
        ];
        
        filterControls.forEach(control => {
            if (control) {
                control.addEventListener('change', filterProducts);
                if (control.id === 'search-input') {
                    control.addEventListener('keyup', filterProducts);
                }
            }
        });
        
        // Sort control
        const sortControl = document.getElementById('sort-products');
        if (sortControl) {
            sortControl.addEventListener('change', function() {
                sortProducts(this.value);
            });
        }
    }
    
    // Sort products
    function sortProducts(sortBy) {
        console.log(`Sorting products by: ${sortBy}`);
        
        filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.product-price')?.textContent.replace('€', '') || 0);
            const priceB = parseFloat(b.querySelector('.product-price')?.textContent.replace('€', '') || 0);
            const nameA = a.querySelector('h3')?.textContent.toLowerCase() || '';
            const nameB = b.querySelector('h3')?.textContent.toLowerCase() || '';
            
            switch (sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                default:
                    return 0;
            }
        });
        
        // Update pagination
        showProductsForPage(currentPage);
    }
    
    // Initialize
    setupFilterListeners();
    initPagination();
    
    // Check for URL parameters
    function handleUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Category parameter
        const category = urlParams.get('category');
        if (category) {
            const categoryFilter = document.getElementById('category-filter');
            if (categoryFilter && categoryFilter.querySelector(`option[value="${category}"]`)) {
                categoryFilter.value = category;
                filterProducts();
            }
        }
        
        // Page parameter
        const page = parseInt(urlParams.get('page')) || 1;
        if (page > 1 && page <= totalPages) {
            goToPage(page);
        }
    }
    
    // Handle URL parameters
    handleUrlParams();
    
    // Update URL with current page
    function updateUrlWithPage(page) {
        // Get current URL and parameters
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        
        // Update or add page parameter
        if (page > 1) {
            params.set('page', page);
        } else {
            params.delete('page');
        }
        
        // Update URL without reloading the page
        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.replaceState({}, '', newUrl);
    }
});