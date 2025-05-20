// View Card Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get card ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');
    
    if (cardId) {
        // In a real application, you would fetch card details from a database
        // For this demo, we'll use the data attributes on the add-to-cart button
        loadCardDetails(cardId);
    }
    
    // Set up event listeners
    setupEventListeners();
});

// Load card details based on ID
function loadCardDetails(cardId) {
    // In a real application, this would be an API call
    // For this demo, we'll use the data already on the page
    
    // This is just a placeholder - in a real app, you'd fetch this data
    const cardData = {
        1: {
            name: "Charizard VMAX",
            price: 59.99,
            image: "images/products/charizard-vmax.jpg",
            images: [
                "images/products/charizard-vmax.jpg",
                "images/products/charizard-vmax-back.jpg",
                "images/products/charizard-vmax-alt.jpg"
            ],
            description: "The Charizard VMAX is a powerful Fire-type Pokémon card from the Sword & Shield series. This card features stunning artwork and is highly sought after by collectors.",
            longDescription: "The Charizard VMAX is a powerful Fire-type Pokémon card from the Sword & Shield series. This card features stunning artwork and is highly sought after by collectors. With its impressive attack power and VMAX evolution mechanic, it's a valuable addition to any competitive deck or collection.<br><br>This card is part of the Darkness Ablaze expansion and features the VMAX evolution mechanic, which allows Charizard to reach its Gigantamax form. The card's artwork showcases Charizard in its imposing Gigantamax form, with flames erupting from its body.<br><br>As a VMAX Pokémon, this card offers increased HP and powerful attacks, making it a formidable opponent in battle. The card's rarity and popularity among fans make it a valuable collector's item as well.",
            rarity: "Ultra Rare",
            type: "Fire",
            set: "Darkness Ablaze",
            cardNumber: "020/189",
            releaseDate: "August 14, 2020",
            stock: 12,
            hp: 330,
            stage: "VMAX Evolution",
            evolvesFrom: "Charizard V",
            retreatCost: "3 Energy",
            attacks: [
                {
                    name: "G-Max Wildfire",
                    damage: "300",
                    effect: "Discard 3 Energy from this Pokémon."
                }
            ],
            reviews: [
                {
                    author: "John D.",
                    date: "May 15, 2023",
                    rating: 5,
                    content: "Excellent card in perfect condition! Shipping was fast and the card was well protected. Very happy with my purchase."
                },
                {
                    author: "Sarah M.",
                    date: "April 22, 2023",
                    rating: 4,
                    content: "Card arrived in great condition. The corners were perfect and the centering was good. Would definitely buy from this seller again."
                },
                {
                    author: "Mike T.",
                    date: "March 10, 2023",
                    rating: 4.5,
                    content: "Great addition to my collection. The card looks even better in person than in the photos. Very satisfied with this purchase."
                }
            ],
            relatedCards: [13, 14, 15, 16]
        },
        2: {
            name: "Pikachu VMAX",
            price: 49.99,
            image: "images/products/pikachu-vmax.jpg",
            images: [
                "images/products/pikachu-vmax.jpg",
                "images/products/pikachu-vmax-back.jpg",
                "images/products/pikachu-vmax-alt.jpg"
            ],
            description: "The Pikachu VMAX is an Electric-type Pokémon card featuring the iconic mascot of the Pokémon franchise in its Gigantamax form.",
            longDescription: "The Pikachu VMAX is an Electric-type Pokémon card featuring the iconic mascot of the Pokémon franchise in its Gigantamax form. This card is from the Vivid Voltage expansion and is one of the most sought-after cards in the set.<br><br>The artwork depicts Pikachu in its massive Gigantamax form, towering over the battlefield with electricity crackling around it. The holographic pattern adds depth and dimension to the illustration, making it a visually stunning card.<br><br>With its high HP and powerful attacks, Pikachu VMAX is not only a collector's item but also a viable option for competitive play. The card's popularity and limited availability have made it a valuable addition to any Pokémon TCG collection.",
            rarity: "Ultra Rare",
            type: "Electric",
            set: "Vivid Voltage",
            cardNumber: "044/185",
            releaseDate: "November 13, 2020",
            stock: 8,
            hp: 310,
            stage: "VMAX Evolution",
            evolvesFrom: "Pikachu V",
            retreatCost: "2 Energy",
            attacks: [
                {
                    name: "G-Max Volt Tackle",
                    damage: "220",
                    effect: "This attack does 30 damage to each of your opponent's Benched Pokémon."
                }
            ],
            reviews: [
                {
                    author: "Emily R.",
                    date: "June 2, 2023",
                    rating: 5,
                    content: "Pikachu VMAX is such an amazing card! The artwork is incredible and it's a powerful addition to my electric deck."
                },
                {
                    author: "David K.",
                    date: "May 18, 2023",
                    rating: 5,
                    content: "One of my favorite cards in my collection. The holographic effect is beautiful and the card came in perfect condition."
                }
            ],
            relatedCards: [7, 8, 9, 10]
        },
        3: {
            name: "Mewtwo GX",
            price: 39.99,
            image: "images/products/mewtwo-gx.jpg",
            images: [
                "images/products/mewtwo-gx.jpg",
                "images/products/mewtwo-gx-back.jpg",
                "images/products/mewtwo-gx-alt.jpg"
            ],
            description: "Mewtwo GX is a powerful Psychic-type Pokémon card with devastating attacks and a game-changing GX move.",
            longDescription: "Mewtwo GX is a powerful Psychic-type Pokémon card with devastating attacks and a game-changing GX move. From the Shining Legends expansion, this card features the genetically engineered Pokémon in a dynamic pose, showcasing its psychic powers.<br><br>The card's GX attack, 'Super Absorption GX', can turn the tide of battle by allowing you to take an extra Prize card when you knock out an opponent's Pokémon. This powerful effect, combined with Mewtwo's high HP and strong attacks, makes it a formidable addition to any deck.<br><br>The full-art illustration and holographic treatment make this card visually stunning, while its competitive viability ensures it remains a sought-after card for both collectors and players.",
            rarity: "Rare",
            type: "Psychic",
            set: "Shining Legends",
            cardNumber: "39/73",
            releaseDate: "October 6, 2017",
            stock: 5,
            hp: 190,
            stage: "Basic",
            evolvesFrom: "None",
            retreatCost: "2 Energy",
            attacks: [
                {
                    name: "Psystrike",
                    damage: "150",
                    effect: "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
                },
                {
                    name: "Super Absorption GX",
                    damage: "100",
                    effect: "When you knock out your opponent's Pokémon with this attack, take 1 extra Prize card. (You can use this GX attack only once during your game.)"
                }
            ],
            reviews: [
                {
                    author: "Alex T.",
                    date: "April 5, 2023",
                    rating: 4,
                    content: "Mewtwo GX is a great card for any Psychic deck. The GX attack has won me several games."
                },
                {
                    author: "Jessica L.",
                    date: "March 22, 2023",
                    rating: 5,
                    content: "Beautiful artwork and a powerful card. One of my favorites from the Shining Legends set."
                }
            ],
            relatedCards: [11, 12, 17, 18]
        },
        4: {
            name: "Eevee VMAX",
            price: 29.99,
            image: "images/products/eevee-vmax.jpg",
            images: [
                "images/products/eevee-vmax.jpg",
                "images/products/eevee-vmax-back.jpg",
                "images/products/eevee-vmax-alt.jpg"
            ],
            description: "The Eevee VMAX showcases the beloved Evolution Pokémon in its Gigantamax form with enhanced HP and powerful attacks.",
            longDescription: "The Eevee VMAX showcases the beloved Evolution Pokémon in its Gigantamax form with enhanced HP and powerful attacks. This card from the Champion's Path expansion features Eevee in its massive Gigantamax form, with its fluffy fur and adorable features magnified to an impressive scale.<br><br>As a VMAX Pokémon, this card has significantly higher HP than its basic form, making it more resilient in battle. Its attack, 'Max Cuddle', not only deals damage but also has a chance to put the opponent's Pokémon to sleep, potentially giving you a strategic advantage.<br><br>The card's popularity stems from both Eevee's status as a fan-favorite Pokémon and the card's competitive viability. Its versatility in various deck types makes it a valuable addition to any collection.",
            rarity: "Rare",
            type: "Normal",
            set: "Champion's Path",
            cardNumber: "026/073",
            releaseDate: "September 25, 2020",
            stock: 15,
            hp: 310,
            stage: "VMAX Evolution",
            evolvesFrom: "Eevee V",
            retreatCost: "2 Energy",
            attacks: [
                {
                    name: "Max Cuddle",
                    damage: "170",
                    effect: "Flip a coin. If heads, your opponent's Active Pokémon is now Asleep."
                }
            ],
            reviews: [
                {
                    author: "Ryan M.",
                    date: "May 30, 2023",
                    rating: 5,
                    content: "Eevee VMAX is such a cute card! The Gigantamax form is adorable and it's surprisingly effective in battle."
                },
                {
                    author: "Sophia K.",
                    date: "April 15, 2023",
                    rating: 4,
                    content: "Great addition to my Eevee collection. The artwork is beautiful and the card came in perfect condition."
                }
            ],
            relatedCards: [19, 20, 21, 22]
        },
        5: {
            name: "Blastoise VMAX",
            price: 44.99,
            image: "images/products/blastoise-vmax.jpg",
            images: [
                "images/products/blastoise-vmax.jpg",
                "images/products/blastoise-vmax-back.jpg",
                "images/products/blastoise-vmax-alt.jpg"
            ],
            description: "Blastoise VMAX is a Water-type Pokémon card featuring the final evolution of Squirtle in its Gigantamax form.",
            longDescription: "Blastoise VMAX is a Water-type Pokémon card featuring the final evolution of Squirtle in its Gigantamax form. From the Champion's Path expansion, this card showcases Blastoise with enhanced cannons and a massive shell, ready to unleash powerful water attacks.<br><br>The card's main attack, 'G-Max Bombard', deals significant damage and can potentially disrupt your opponent's strategy by discarding their Energy cards. With its high HP and powerful attacks, Blastoise VMAX is both a formidable competitor in battle and a visually impressive addition to any collection.<br><br>The holographic treatment and dynamic artwork make this card stand out, capturing the essence of Blastoise's Gigantamax form in all its glory. As one of the original starter Pokémon, Blastoise remains a fan favorite, making this VMAX version particularly sought after.",
            rarity: "Ultra Rare",
            type: "Water",
            set: "Champion's Path",
            cardNumber: "054/189",
            releaseDate: "February 19, 2021",
            stock: 7,
            hp: 330,
            stage: "VMAX Evolution",
            evolvesFrom: "Blastoise V",
            retreatCost: "3 Energy",
            attacks: [
                {
                    name: "G-Max Bombard",
                    damage: "280",
                    effect: "Discard an Energy from your opponent's Active Pokémon."
                }
            ],
            reviews: [
                {
                    author: "Michael B.",
                    date: "June 10, 2023",
                    rating: 5,
                    content: "Blastoise has always been my favorite starter, and this VMAX version is amazing! Great artwork and powerful in battle."
                },
                {
                    author: "Laura S.",
                    date: "May 5, 2023",
                    rating: 4,
                    content: "Beautiful card with great attack power. A must-have for any Water-type deck."
                }
            ],
            relatedCards: [23, 24, 25, 26]
        },
        6: {
            name: "Venusaur VMAX",
            price: 42.99,
            image: "images/products/venusaur-vmax.jpg",
            images: [
                "images/products/venusaur-vmax.jpg",
                "images/products/venusaur-vmax-back.jpg",
                "images/products/venusaur-vmax-alt.jpg"
            ],
            description: "Venusaur VMAX is a Grass-type Pokémon card featuring the final evolution of Bulbasaur in its Gigantamax form.",
            longDescription: "Venusaur VMAX is a Grass-type Pokémon card featuring the final evolution of Bulbasaur in its Gigantamax form. This card from the Champion's Path expansion showcases Venusaur with an enormous flower on its back, ready to unleash powerful Grass-type attacks.<br><br>The card's main attack, 'G-Max Vine Lash', not only deals significant damage but also places damage counters on your opponent's Benched Pokémon, allowing you to set up future knockouts. With its high HP and strategic attack, Venusaur VMAX is a valuable addition to any Grass-type deck.<br><br>The holographic treatment and dynamic artwork capture the essence of Venusaur's Gigantamax form, making it a visually stunning card. As one of the original starter Pokémon, Venusaur has a special place in many fans' hearts, making this VMAX version particularly desirable.",
            rarity: "Ultra Rare",
            type: "Grass",
            set: "Champion's Path",
            cardNumber: "017/189",
            releaseDate: "February 19, 2021",
            stock: 9,
            hp: 330,
            stage: "VMAX Evolution",
            evolvesFrom: "Venusaur V",
            retreatCost: "3 Energy",
            attacks: [
                {
                    name: "G-Max Vine Lash",
                    damage: "220",
                    effect: "This attack also does 40 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
                }
            ],
            reviews: [
                {
                    author: "Daniel R.",
                    date: "May 28, 2023",
                    rating: 5,
                    content: "Venusaur VMAX is an excellent card for any Grass deck. The spread damage from G-Max Vine Lash is incredibly useful."
                },
                {
                    author: "Amanda P.",
                    date: "April 12, 2023",
                    rating: 4.5,
                    content: "Beautiful artwork and a powerful card. One of my favorites from the Champion's Path set."
                }
            ],
            relatedCards: [27, 28, 29, 30]
        }
        // Add more cards as needed
    };
    
    // Get the card data
    const card = cardData[cardId];
    
    if (card) {
        // Update page elements with card data
        document.getElementById('card-name').textContent = card.name;
        document.getElementById('card-title').textContent = card.name;
        document.getElementById('card-price').textContent = `€${card.price.toFixed(2)}`;
        document.getElementById('main-card-image').src = card.image;
        document.getElementById('main-card-image').alt = card.name;
        
        // Update card description
        const cardDescription = document.querySelector('.card-description p');
        if (cardDescription) {
            cardDescription.textContent = card.description;
        }
        
        // Update card metadata
        const cardMetaItems = document.querySelectorAll('.card-meta-item');
        if (cardMetaItems.length > 0) {
            // Card Number
            cardMetaItems[0].querySelector('.card-meta-value').textContent = card.cardNumber;
            // Rarity
            cardMetaItems[1].querySelector('.card-meta-value').textContent = card.rarity;
            // Type
            cardMetaItems[2].querySelector('.card-meta-value').textContent = card.type;
            // Set
            cardMetaItems[3].querySelector('.card-meta-value').textContent = card.set;
            // Release Date
            cardMetaItems[4].querySelector('.card-meta-value').textContent = card.releaseDate;
        }
        
        // Update card availability
        const cardAvailability = document.querySelector('.card-availability');
        if (cardAvailability) {
            if (card.stock > 10) {
                cardAvailability.textContent = `In Stock (${card.stock} available)`;
                cardAvailability.className = 'card-availability';
            } else if (card.stock > 0) {
                cardAvailability.textContent = `Low Stock (${card.stock} available)`;
                cardAvailability.className = 'card-availability low-stock';
            } else {
                cardAvailability.textContent = 'Out of Stock';
                cardAvailability.className = 'card-availability out-of-stock';
            }
        }
        
        // Update thumbnails
        const thumbnailContainer = document.querySelector('.card-thumbnails');
        if (thumbnailContainer && card.images && card.images.length > 0) {
            thumbnailContainer.innerHTML = '';
            
            card.images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image;
                thumbnail.alt = `${card.name} ${index === 0 ? 'Front' : index === 1 ? 'Back' : 'Alternative'}`;
                thumbnail.className = index === 0 ? 'card-thumbnail active' : 'card-thumbnail';
                thumbnail.onclick = function() { changeImage(this, image); };
                
                thumbnailContainer.appendChild(thumbnail);
            });
        }
        
        // Update tab contents
        // Description tab
        const descriptionTab = document.getElementById('description');
        if (descriptionTab && card.longDescription) {
            descriptionTab.innerHTML = card.longDescription;
        }
        
        // Details tab
        const detailsTab = document.getElementById('details');
        if (detailsTab) {
            let detailsHTML = `
                <h3>Card Specifications</h3>
                <ul>
                    <li><strong>Card Name:</strong> ${card.name}</li>
                    <li><strong>Card Number:</strong> ${card.cardNumber}</li>
                    <li><strong>Rarity:</strong> ${card.rarity}</li>
                    <li><strong>Card Type:</strong> ${card.type}</li>
                    <li><strong>HP:</strong> ${card.hp}</li>
                    <li><strong>Stage:</strong> ${card.stage}</li>
                    <li><strong>Evolves From:</strong> ${card.evolvesFrom}</li>
                    <li><strong>Retreat Cost:</strong> ${card.retreatCost}</li>
                </ul>
            `;
            
            if (card.attacks && card.attacks.length > 0) {
                detailsHTML += `<h3>Attacks</h3><ul>`;
                
                card.attacks.forEach(attack => {
                    detailsHTML += `<li><strong>${attack.name}:</strong> ${attack.damage} damage. ${attack.effect}</li>`;
                });
                
                detailsHTML += `</ul>`;
            }
            
            detailsHTML += `
                <h3>Card Condition</h3>
                <p>All our single cards are guaranteed to be in Near Mint (NM) condition unless otherwise stated. Cards are sleeved and shipped in protective packaging to ensure they arrive in the same condition.</p>
            `;
            
            detailsTab.innerHTML = detailsHTML;
        }
        
        // Reviews tab
        const reviewsTab = document.getElementById('reviews');
        if (reviewsTab && card.reviews && card.reviews.length > 0) {
            let reviewsHTML = `<h3>Customer Reviews</h3>`;
            
            card.reviews.forEach(review => {
                reviewsHTML += `
                    <div class="review">
                        <div class="review-header">
                            <div class="review-rating">
                `;
                
                // Add stars based on rating
                for (let i = 1; i <= 5; i++) {
                    if (i <= review.rating) {
                        reviewsHTML += `<i class="fas fa-star"></i>`;
                    } else if (i - 0.5 <= review.rating) {
                        reviewsHTML += `<i class="fas fa-star-half-alt"></i>`;
                    } else {
                        reviewsHTML += `<i class="far fa-star"></i>`;
                    }
                }
                
                reviewsHTML += `
                            </div>
                            <div class="review-author">${review.author} - ${review.date}</div>
                        </div>
                        <div class="review-content">
                            <p>${review.content}</p>
                        </div>
                    </div>
                `;
            });
            
            reviewsTab.innerHTML = reviewsHTML;
            
            // Update reviews count in tab button
            const reviewsTabBtn = document.querySelector('.tab-btn[onclick="openTab(event, \'reviews\')"]');
            if (reviewsTabBtn) {
                reviewsTabBtn.textContent = `Reviews (${card.reviews.length})`;
            }
        }
        
        // Update add to cart button
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        addToCartBtn.setAttribute('data-id', cardId);
        addToCartBtn.setAttribute('data-name', card.name);
        addToCartBtn.setAttribute('data-price', card.price);
        addToCartBtn.setAttribute('data-image', card.image);
        
        // Update page title
        document.title = `${card.name} - MemTCG`;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');
            const quantity = parseInt(document.getElementById('quantity-input').value);
            
            // Add to cart
            addToCart(id, name, price, image, quantity);
        });
    }
}

// Change main image when thumbnail is clicked
function changeImage(thumbnail, imageSrc) {
    // Update main image
    document.getElementById('main-card-image').src = imageSrc;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.card-thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    thumbnail.classList.add('active');
}

// Quantity increment/decrement
function incrementQuantity() {
    const input = document.getElementById('quantity-input');
    input.value = parseInt(input.value) + 1;
}

function decrementQuantity() {
    const input = document.getElementById('quantity-input');
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}

// Tab functionality
function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show the selected tab content and add active class to the button
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Add to cart function
function addToCart(id, name, price, image, quantity = 1) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex > -1) {
        // Item exists, increase quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id,
            name,
            price,
            image,
            quantity
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartItems', JSON.stringify(cart)); // For compatibility with view-cart.js
    
    // Show success message
    alert(`${name} has been added to your cart!`);
    
    // Update cart count in header if updateCartDisplay function exists
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    } else {
        // Refresh the page to update the cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let count = 0;
            cart.forEach(item => {
                count += item.quantity;
            });
            cartCount.textContent = count;
        }
    }
}