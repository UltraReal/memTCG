$htmlFiles = Get-ChildItem -Path "c:/Users/Marcel/Desktop/devsnexus/websites/memtcg.nl" -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update newsletter form
    $oldNewsletterPattern = '<form class="newsletter-form">\s*<input type="email" placeholder="Your email address" required>\s*<button type="submit" class="btn">Subscribe</button>\s*</form>'
    $newNewsletterForm = '<form id="newsletter-form" class="newsletter-form">
                    <input type="email" id="newsletter-email" placeholder="Your email address" required>
                    <button type="submit" class="btn">Subscribe</button>
                </form>
                <div id="newsletter-message" style="margin-top: 15px; display: none; text-align: center;"></div>'
    
    $content = $content -replace $oldNewsletterPattern, $newNewsletterForm
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $content
    
    Write-Host "Updated newsletter form in $($file.Name)"
}

Write-Host "Newsletter form update completed for all HTML files."