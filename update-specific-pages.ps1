# PowerShell script om specifieke HTML-bestanden bij te werken
# Dit script zorgt ervoor dat het hamburger menu op alle pagina's correct werkt

# Lijst van pagina's die bijgewerkt moeten worden
$pagesToUpdate = @(
    "new-releases.html",
    "promotions.html",
    "about.html",
    "contact.html"
)

foreach ($page in $pagesToUpdate) {
    Write-Host "Verwerken van $page..."
    
    # Bestandsinhoud lezen
    $content = Get-Content -Path $page -Raw
    
    # Viewport meta tag bijwerken
    $content = $content -replace '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    
    # CSS toevoegen
    $content = $content -replace '<link rel="stylesheet" href="css/style.css">', '<link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/mobile-new.css">
    <link rel="stylesheet" href="css/navbar-fix.css">'
    
    # JavaScript toevoegen
    $content = $content -replace '<script src="js/script.js" defer></script>', '<script src="js/script-new.js" defer></script>'
    
    # Navbar-fix JavaScript toevoegen
    $content = $content -replace '</head>', '    <script src="js/navbar-fix-final.js" defer></script>
</head>'
    
    # Zorg ervoor dat de body structuur correct is
    if (-not ($content -match '<div class="page-content">')) {
        $content = $content -replace '<body>', '<body>
    <div class="page-content">'
        $content = $content -replace '</footer>', '</footer>
    </div> <!-- End of page-content -->'
    }
    
    # Bijgewerkte inhoud terugschrijven naar het bestand
    Set-Content -Path $page -Value $content
    
    Write-Host "Bijgewerkt: $page"
}

Write-Host "Alle specifieke pagina's zijn bijgewerkt!"