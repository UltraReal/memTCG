# PowerShell script to update all HTML files
# This script adds the simple-mobile-menu.js script to all HTML files and updates the viewport meta tag

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..."
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update viewport meta tag
    $content = $content -replace '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    
    # Add simple-mobile-menu.js if not already included
    if (-not ($content -match "simple-mobile-menu.js")) {
        $content = $content -replace '</head>', '    <script src="js/simple-mobile-menu.js" defer></script>
</head>'
    }
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $content
    
    Write-Host "Updated $($file.Name)"
}

Write-Host "All files processed"