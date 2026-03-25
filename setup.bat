@echo off
echo ============================================
echo  Nestle Retailer Direct - Setup Script
echo ============================================
echo.

REM Check if running in correct directory
if not exist "composer.json" (
    echo ERROR: Please run this script from the project folder!
    echo.
    pause
    exit /b 1
)

echo [1/6] Checking PHP installation...
php --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: PHP is not installed or not in PATH!
    echo Please install XAMPP or PHP first.
    pause
    exit /b 1
)
echo PHP found!
echo.

echo [2/6] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [3/6] Installing PHP dependencies (this may take a few minutes)...
call composer install --no-interaction --quiet
if errorlevel 1 (
    echo ERROR: Composer install failed!
    pause
    exit /b 1
)
echo Done!
echo.

echo [4/6] Installing Node.js dependencies (this may take a few minutes)...
call npm install --silent
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo Done!
echo.

echo [5/6] Setting up environment file...
if not exist ".env" (
    copy .env.example .env >nul
    echo Environment file created!
) else (
    echo Environment file already exists!
)
echo.

echo [6/6] Generating application key...
call php artisan key:generate --ansi
echo.

echo ============================================
echo  Setup Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Run: npm run build
echo 2. Run: php artisan serve
echo 3. Open browser: http://localhost:8000
echo.
echo OR just run the 'start.bat' file to launch the app!
echo.
pause
