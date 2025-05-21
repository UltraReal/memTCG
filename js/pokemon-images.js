// Pokemon Images Fetcher
// This script fetches Pokemon card images and replaces the existing images

document.addEventListener('DOMContentLoaded', function() {
    // Pokemon name extraction and normalization
    function extractPokemonName(fullProductName) {
        // Remove card type suffixes like VMAX, GX, etc.
        let pokemonName = fullProductName
            .replace(/\s+V(MAX|STAR|UNION)?$/i, '')
            .replace(/\s+GX$/i, '')
            .replace(/\s+EX$/i, '')
            .replace(/\s+Tag\s+Team$/i, '')
            .trim();
        
        // Handle special cases
        if (pokemonName.includes('&')) {
            // For cards like "Pikachu & Zekrom", just take the first Pokemon
            pokemonName = pokemonName.split('&')[0].trim();
        }
        
        return pokemonName.toLowerCase();
    }
    
    // Function to fetch Pokemon image from PokeAPI
    async function fetchPokemonImage(pokemonName) {
        try {
            // Normalize the name for the API
            const normalizedName = pokemonName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            
            // Try to fetch from PokeAPI
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${normalizedName}`);
            
            if (!response.ok) {
                throw new Error(`Pokemon not found: ${pokemonName}`);
            }
            
            const data = await response.json();
            
            // Get the official artwork (high quality)
            const officialArtwork = data.sprites.other['official-artwork'].front_default;
            
            // Fallback to other sprites if official artwork is not available
            const dreamWorld = data.sprites.other.dream_world.front_default;
            const homeSprite = data.sprites.other.home.front_default;
            const defaultSprite = data.sprites.front_default;
            
            // Return the best available image
            return officialArtwork || dreamWorld || homeSprite || defaultSprite;
        } catch (error) {
            console.warn(`Error fetching Pokemon image for ${pokemonName}:`, error);
            
            // Try the Pokemon TCG API as a fallback
            try {
                const tcgResponse = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:"${pokemonName}"&pageSize=10`);
                const tcgData = await tcgResponse.json();
                
                if (tcgData.data && tcgData.data.length > 0) {
                    // Get a random card from the results
                    const randomIndex = Math.floor(Math.random() * Math.min(5, tcgData.data.length));
                    return tcgData.data[randomIndex].images.large || tcgData.data[randomIndex].images.small;
                }
            } catch (tcgError) {
                console.error(`Error fetching from Pokemon TCG API for ${pokemonName}:`, tcgError);
            }
            
            // If all else fails, try a fallback image service
            return `https://img.pokemondb.net/artwork/large/${pokemonName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        }
    }
    
    // Function to replace product images with fetched images
    async function replaceProductImages() {
        // Get all product cards
        const productCards = document.querySelectorAll('.product-card');
        let replacedCount = 0;
        
        // Process each product card
        for (const card of productCards) {
            // Get the product name
            const productNameElement = card.querySelector('.product-info h3 a');
            if (!productNameElement) continue;
            
            const fullProductName = productNameElement.textContent.trim();
            
            // Only process Pokemon cards (skip accessories, etc.)
            if (card.getAttribute('data-category') === 'single-cards') {
                // Extract the Pokemon name from the product name
                const pokemonName = extractPokemonName(fullProductName);
                
                // Get the image element
                const imgElement = card.querySelector('.product-image img');
                if (!imgElement) continue;
                
                // Store the original image URL as a fallback
                const originalImageUrl = imgElement.src;
                
                try {
                    // Show loading state
                    imgElement.classList.add('loading');
                    
                    // Fetch a new image
                    const newImageUrl = await fetchPokemonImage(pokemonName);
                    
                    if (newImageUrl) {
                        // Create a new image to test if it loads correctly
                        const testImg = new Image();
                        
                        testImg.onload = function() {
                            // If the image loads successfully, replace the src
                            imgElement.classList.remove('loading');
                            imgElement.src = newImageUrl;
                            imgElement.classList.add('new-image');
                            
                            // Remove the animation class after it completes
                            setTimeout(() => {
                                imgElement.classList.remove('new-image');
                            }, 500);
                            
                            // Also update the data-image attribute on the add-to-cart button
                            const addToCartButton = card.querySelector('.add-to-cart');
                            if (addToCartButton) {
                                addToCartButton.setAttribute('data-image', newImageUrl);
                            }
                            
                            replacedCount++;
                        };
                        
                        testImg.onerror = function() {
                            console.warn(`Failed to load image for ${pokemonName}, using original image`);
                            imgElement.classList.remove('loading');
                        };
                        
                        testImg.src = newImageUrl;
                    } else {
                        imgElement.classList.remove('loading');
                    }
                } catch (error) {
                    console.error(`Error processing ${pokemonName}:`, error);
                    imgElement.classList.remove('loading');
                }
            }
        }
        
        return replacedCount;
    }
    
    // Add a button to manually trigger image replacement
    function addReplaceImagesButton() {
        const shopHeader = document.querySelector('.shop-header');
        if (!shopHeader) return null;
        
        const button = document.createElement('button');
        button.className = 'btn replace-images-btn';
        button.textContent = 'Vervang Pokémon afbeeldingen';
        button.style.marginLeft = '10px';
        button.style.backgroundColor = '#ff6b6b';
        button.style.color = 'white';
        
        button.addEventListener('click', async function() {
            this.textContent = 'Bezig met vervangen...';
            this.disabled = true;
            
            try {
                const replacedCount = await replaceProductImages();
                this.textContent = `${replacedCount} afbeeldingen vervangen`;
                setTimeout(() => {
                    this.textContent = 'Vervang Pokémon afbeeldingen';
                    this.disabled = false;
                }, 3000);
            } catch (error) {
                console.error('Error replacing images:', error);
                this.textContent = 'Fout bij vervangen';
                this.disabled = false;
            }
        });
        
        // Add the button to the shop header
        const viewOptions = shopHeader.querySelector('.view-options');
        if (viewOptions) {
            viewOptions.parentNode.insertBefore(button, viewOptions);
        } else {
            shopHeader.appendChild(button);
        }
        
        return button;
    }
    
    // Add styles for the button and loading animation
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .replace-images-btn {
                transition: all 0.3s ease;
            }
            .replace-images-btn:hover {
                background-color: #ff5252 !important;
            }
            .replace-images-btn:disabled {
                background-color: #cccccc !important;
                cursor: not-allowed;
            }
            
            /* Loading animation for images */
            @keyframes pulse {
                0% { opacity: 0.6; }
                50% { opacity: 0.3; }
                100% { opacity: 0.6; }
            }
            
            .product-image img.loading {
                animation: pulse 1.5s infinite;
            }
            
            /* Fade in animation for new images */
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .product-image img.new-image {
                animation: fadeIn 0.5s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Function to add auto-replace checkbox
    function addAutoReplaceOption() {
        const shopHeader = document.querySelector('.shop-header');
        if (!shopHeader) return;
        
        const container = document.createElement('div');
        container.className = 'auto-replace-container';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginLeft = '10px';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'auto-replace-images';
        checkbox.style.marginRight = '5px';
        
        // Check if the user has previously enabled auto-replace
        const autoReplaceEnabled = localStorage.getItem('autoReplaceImages') === 'true';
        checkbox.checked = autoReplaceEnabled;
        
        const label = document.createElement('label');
        label.htmlFor = 'auto-replace-images';
        label.textContent = 'Automatisch vervangen';
        label.style.marginBottom = '0';
        label.style.cursor = 'pointer';
        
        container.appendChild(checkbox);
        container.appendChild(label);
        
        // Add the container to the shop header
        const viewOptions = shopHeader.querySelector('.view-options');
        if (viewOptions) {
            viewOptions.parentNode.insertBefore(container, viewOptions);
        } else {
            shopHeader.appendChild(container);
        }
        
        // Save preference when changed
        checkbox.addEventListener('change', function() {
            localStorage.setItem('autoReplaceImages', this.checked);
            
            // If enabled, replace images immediately
            if (this.checked) {
                replaceProductImages();
            }
        });
        
        return checkbox;
    }
    
    // Initialize
    addStyles();
    const replaceButton = addReplaceImagesButton();
    const autoReplaceCheckbox = addAutoReplaceOption();
    
    // Auto-replace images if the option is enabled
    if (autoReplaceCheckbox && autoReplaceCheckbox.checked) {
        // Wait a short time for the page to fully load
        setTimeout(() => {
            replaceProductImages();
        }, 500);
    }
});