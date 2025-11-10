$exclude = @("venv", "scraping_imovel.zip")
$files = Get-ChildItem -Path . -Exclude $exclude
Compress-Archive -Path $files -DestinationPath "scraping_imovel.zip" -Force