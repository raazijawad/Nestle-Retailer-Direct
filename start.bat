@echo off
echo ============================================
echo  Starting Nestle Retailer Direct App
echo ============================================
echo.

echo Building frontend assets (please wait)...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo Starting Laravel server...
echo.
echo ============================================
echo  Server is running!
echo  Open browser: http://localhost:8000
echo  Press Ctrl+C to stop the server
echo ============================================
echo.

call php artisan serve
