# PowerShell script om alle overige HTML-bestanden bij te werken
# Dit script zorgt ervoor dat het hamburger menu op alle pagina's correct werkt

# Lijst van pagina's die al bijgewerkt zijn
$updatedPages = @(
    "index.html",
    "shop.html",
    "view-card.html",
    "new-releases.html",
    "promotions.html",
    "about.html",
    "contact.html"
)

# Alle HTML-bestanden ophalen
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" | Where-Object { $updatedPages -notcontains $_.Name }

foreach ($file in $htmlFiles) {
    Write-Host "Verwerken van $($file.Name)..."
    
    # Bestandsinhoud lezen
    $content = Get-Content -Path $file.FullName -Raw
    
    # Viewport meta tag bijwerken
    $content = $content -replace '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    
    # CSS toevoegen
    if (-not ($content -match "navbar-fix.css")) {
        $content = $content -replace '<link rel="stylesheet" href="css/style.css">', '<link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/mobile-new.css">
    <link rel="stylesheet" href="css/navbar-fix.css">'
    }
    
    # JavaScript bijwerken
    $content = $content -replace '<script src="js/script.js" defer></script>', '<script src="js/script-new.js" defer></script>'
    
    # Verwijder oude scripts
    $content = $content -replace '<script src="js/simple-mobile-menu.js" defer></script>', ''
    $content = $content -replace '<script src="js/mobile-menu.js" defer></script>', ''
    
    # Navbar-fix JavaScript toevoegen
    if (-not ($content -match "navbar-fix-final.js")) {
        $content = $content -replace '</head>', '    <script src="js/navbar-fix-final.js" defer></script>
</head>'
    }
    
    # Verwijder inline scripts voor mobiele menu's
    $content = $content -replace '(?s)<!-- Direct fix for mobile menu -->.*?</script>', ''
    
    # Zorg ervoor dat de body structuur correct is
    if (-not ($content -match '<div class="page-content">')) {
        $content = $content -replace '<body>', '<body>
    <div class="page-content">'
        $content = $content -replace '</footer>', '</footer>
    </div> <!-- End of page-content -->'
    }
    
    # Bijgewerkte inhoud terugschrijven naar het bestand
    Set-Content -Path $file.FullName -Value $content
    
    Write-Host "Bijgewerkt: $($file.Name)"
}

Write-Host "Alle overige pagina's zijn bijgewerkt!"