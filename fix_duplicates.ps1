$htmlFiles = Get-ChildItem -Path "c:/Users/Marcel/Desktop/devsnexus/websites/memtcg.nl" -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if the file contains duplicated KvK and BTW entries
    if ($content -match '<li><i class="fas fa-building"></i> KvK: 68566719</li>\s*<li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>\s*<li><i class="fas fa-building"></i> KvK: 68566719</li>\s*<li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>') {
        # Fix the duplication
        $fixedContent = $content -replace '<li><i class="fas fa-building"></i> KvK: 68566719</li>\s*<li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>\s*<li><i class="fas fa-building"></i> KvK: 68566719</li>\s*<li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>', '<li><i class="fas fa-building"></i> KvK: 68566719</li>
                        <li><i class="fas fa-receipt"></i> BTW: NL002102782B26</li>'
        
        # Save the fixed content
        Set-Content -Path $file.FullName -Value $fixedContent
        
        Write-Host "Fixed duplication in $($file.Name)"
    }
}

Write-Host "Duplication fix completed."