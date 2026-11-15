@echo off
echo.
echo ========================================
echo Images that need WebP conversion
echo ========================================
echo.
dir /b /s public\assets\*.png public\assets\*.jpg public\assets\*.jpeg public\assets\*.jfif
echo.
echo Total:
dir /b /s public\assets\*.png public\assets\*.jpg public\assets\*.jpeg public\assets\*.jfif | find /c /v ""
echo.
echo ========================================
echo Convert these using:
echo 1. CloudConvert: https://cloudconvert.com
echo 2. Or use online tool: https://convertio.co
echo ========================================
pause
