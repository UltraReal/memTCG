$htmlFiles = Get-ChildItem -Path "c:/Users/Marcel/Desktop/devsnexus/websites/memtcg.nl" -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove extra blank lines at the end of the file
    $cleanedContent = $content -replace "(?s)</html>\s+$", "</html>"
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $cleanedContent
    
    Write-Host "Cleaned up $($file.Name)"
}

Write-Host "Cleanup completed for all HTML files."