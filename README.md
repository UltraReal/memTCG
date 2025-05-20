# MemeTCG - Pokémon Cards Webshop

This is a professional webshop for MemeTCG, a Pokémon cards seller/trader based in the Netherlands. The website is built using HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Shopping cart functionality with localStorage
- Product catalog with filtering and sorting options
- Checkout process with payment integration
- Dropdown menus for better navigation
- New Releases page with countdown timer
- Promotions page with tabs for different promotion types
- Sale Items page with advanced filtering
- Clearance page with stock indicators
- Bundle Deals page with category filtering
- Contact form
- About us page
- Newsletter subscription
- Enhanced animations and transitions

## File Structure

```
memtcg.nl/
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── cart.js
├── images/
│   ├── logo.svg
│   ├── hero-bg.svg
│   ├── payment-methods.svg
│   ├── product-placeholder.svg
│   ├── products/
│   ├── promotions/
│   ├── releases/
│   ├── upcoming/
│   ├── categories/
│   ├── team/
│   ├── testimonials/
│   ├── partners/
│   ├── payment/
│   └── about/
├── index.html
├── shop.html
├── checkout.html
├── contact.html
├── about.html
├── new-releases.html
├── promotions.html
├── sale-items.html
├── clearance.html
├── bundle-deals.html
└── README.md
```

## Setup Instructions

1. **Logo**: Replace the placeholder `images/logo.png` with your actual logo. The logo should be in blue and white colors as specified.

2. **Product Images**: Add product images to the `images/products/` directory. The recommended size is 500x500 pixels.

3. **Team and Testimonial Images**: Add team member and testimonial images to their respective directories.

4. **Payment Methods**: Add payment method logos to the `images/payment/` directory.

5. **Content**: Update the content in the HTML files to match your actual business information, including:
   - Contact details
   - About us information
   - Team members
   - Testimonials
   - Product details and prices

## Shopping Cart Functionality

The shopping cart functionality is implemented using JavaScript and localStorage. The main features include:

- Add products to cart
- Update product quantities
- Remove products from cart
- Calculate total price
- Persist cart data between sessions

## Customization

To customize the colors of the website, modify the CSS variables in the `css/style.css` file:

```css
:root {
    --primary-color: #0066cc; /* Blue from logo */
    --secondary-color: #004999; /* Darker blue for hover states */
    --accent-color: #ff9900; /* Orange accent for buttons and highlights */
    --light-color: #ffffff; /* White */
    /* Other color variables */
}
```

## Browser Compatibility

The website is compatible with the following browsers:

- Google Chrome (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)
- Opera (latest)

## Credits

- Font Awesome for icons
- Google Fonts for typography
- Images should be replaced with actual product images

## License

This website is created for MemeTCG and should only be used for their business purposes.