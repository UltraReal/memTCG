# PowerShell script om alle HTML-bestanden bij te werken met de nieuwe navbar fix

# Alle HTML-bestanden ophalen
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Verwerken van $($file.Name)..."
    
    # Bestandsinhoud lezen
    $content = Get-Content -Path $file.FullName -Raw
    
    # Viewport meta tag bijwerken
    $content = $content -replace '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    
    # CSS toevoegen als het nog niet bestaat
    if (-not ($content -match "navbar-fix.css")) {
        $content = $content -replace '<link rel="stylesheet" href="css/mobile-new.css">', '<link rel="stylesheet" href="css/mobile-new.css">
    <link rel="stylesheet" href="css/navbar-fix.css">'
    }
    
    # JavaScript toevoegen als het nog niet bestaat
    if (-not ($content -match "navbar-fix.js")) {
        $content = $content -replace '</head>', '    <script src="js/navbar-fix.js" defer></script>
</head>'
    }
    
    # Verwijder oude scripts
    $content = $content -replace '<script src="js/simple-mobile-menu.js" defer></script>', ''
    $content = $content -replace '<script src="js/mobile-menu.js" defer></script>', ''
    
    # Verwijder inline scripts voor mobiele menu's
    $content = $content -replace '(?s)<!-- Direct fix for mobile menu -->.*?</script>', ''
    
    # Bijgewerkte inhoud terugschrijven naar het bestand
    Set-Content -Path $file.FullName -Value $content
    
    Write-Host "Bijgewerkt: $($file.Name)"
}

Write-Host "Alle bestanden zijn bijgewerkt!"