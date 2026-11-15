# Simple batch conversion script
# This lists all images that need conversion
# You can use an online tool like https://www.freeconvert.com/png-to-webp or https://convertio.co/png-webp/

Get-ChildItem -Path "public/assets" -Recurse -Include *.png,*.jpg,*.jpeg,*.jfif | ForEach-Object {
    $webpPath = $_.FullName -replace '\.(png|jpg|jpeg|jfif)$', '.webp'
    Write-Host "Convert: $($_.FullName) -> $webpPath"
}

Write-Host "`n`nTotal images to convert: $(Get-ChildItem -Path 'public/assets' -Recurse -Include *.png,*.jpg,*.jpeg,*.jfif | Measure-Object | Select-Object -ExpandProperty Count)"
Write-Host "`nUse CloudConvert or similar tool to batch convert these images to WebP format."
Write-Host "Or install cwebp from Google: https://developers.google.com/speed/webp/download"
