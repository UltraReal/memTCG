$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update SVG logo alt text
    $updatedContent = $content -replace '<img src="images/logo\.svg" alt="MemeTCG Logo">', '<img src="images/logo.svg" alt="memTCG Logo">'
    
    # Update PNG logo alt text
    $updatedContent = $updatedContent -replace '<img src="images/logo\.png" alt="MemeTCG Logo">', '<img src="images/logo.png" alt="memTCG Logo">'
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $updatedContent
    
    Write-Host "Updated $($file.Name)"
}

Write-Host "All files updated successfully!"