$htmlFiles = Get-ChildItem -Path "c:/Users/Marcel/Desktop/devsnexus/websites/memtcg.nl" -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Fix duplicated KvK and BTW entries
    $duplicatedPattern = '<li><i class="fas fa-building"></i> KvK: 68566719</li>\s*<li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>\s*<li><i class="fas fa-building"></i> KvK: 68566719</li>\s*<li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>'
    $correctEntries = '<li><i class="fas fa-building"></i> KvK: 68566719</li>
                        <li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>'
    
    $content = $content -replace $duplicatedPattern, $correctEntries
    
    # Update contact information for files that haven't been updated yet
    $oldContactPattern = '(?s)<div class="footer-column">\s*<h3>Contact Us</h3>\s*<ul class="contact-info">\s*<li><i class="fas fa-map-marker-alt"></i>.*?</li>\s*<li><i class="fas fa-phone"></i>.*?</li>\s*<li><i class="fas fa-envelope"></i>.*?</li>'
    $newContactInfo = '<div class="footer-column">
                    <h3>Contact Us</h3>
                    <ul class="contact-info">
                        <li><i class="fas fa-map-marker-alt"></i> Noorderlicht 112, 1622 ZW Hoorn</li>
                        <li><i class="fas fa-phone"></i> +31 62871 77 83</li>
                        <li><i class="fas fa-envelope"></i> info@memtcg.nl</li>
                        <li><i class="fas fa-building"></i> KvK: 68566719</li>
                        <li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>'
    
    $content = $content -replace $oldContactPattern, $newContactInfo
    
    # Update copyright
    $oldCopyrightPattern = '(?s)<div class="footer-bottom">\s*<p>&copy;.*?</p>\s*</div>'
    $newCopyright = '<div class="footer-bottom">
                <p>&copy; 2025 memTCG. All rights reserved.</p>
            </div>'
    
    $content = $content -replace $oldCopyrightPattern, $newCopyright
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $content
    
    Write-Host "Updated footer in $($file.Name)"
}

Write-Host "Footer update completed for all HTML files."