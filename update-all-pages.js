/**
 * Update All Pages
 * This script adds the simple-mobile-menu.js script to all HTML files
 */
const fs = require('fs');
const path = require('path');

// Directory to search
const directory = __dirname;

// Get all HTML files
const htmlFiles = fs.readdirSync(directory)
    .filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files`);

// Process each file
htmlFiles.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the script is already included
    if (!content.includes('simple-mobile-menu.js')) {
        // Find the closing head tag
        const headCloseIndex = content.indexOf('</head>');
        
        if (headCloseIndex !== -1) {
            // Script tag to insert
            const scriptTag = '    <script src="js/simple-mobile-menu.js" defer></script>\n';
            
            // Insert the script tag before the closing head tag
            content = content.slice(0, headCloseIndex) + scriptTag + content.slice(headCloseIndex);
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`Could not find </head> in ${file}`);
        }
    } else {
        console.log(`Script already included in ${file}`);
    }
});

console.log('All files processed');