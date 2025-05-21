# PowerShell script om alle HTML-bestanden bij te werken met de definitieve navbar fix

# Alle HTML-bestanden ophalen
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Verwerken van $($file.Name)..."
    
    # Bestandsinhoud lezen
    $content = Get-Content -Path $file.FullName -Raw
    
    # JavaScript bijwerken
    $content = $content -replace '<script src="js/navbar-fix.js" defer></script>', '<script src="js/navbar-fix-final.js" defer></script>'
    
    # Bijgewerkte inhoud terugschrijven naar het bestand
    Set-Content -Path $file.FullName -Value $content
    
    Write-Host "Bijgewerkt: $($file.Name)"
}

Write-Host "Alle bestanden zijn bijgewerkt!"