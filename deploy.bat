@echo off
REM Quick Deployment Script for ArtConnect (Windows)

echo.
echo 🚀 ArtConnect Deployment Helper
echo ================================
echo.

REM Check if git is initialized
if not exist ".git\" (
    echo ⚠️  Git repository not initialized!
    echo Run: git init
    exit /b 1
)

echo ✅ Checklist before deployment:
echo ================================
echo.

set /p db_ready="✓ Database cloud sudah setup? (y/n): "
if /i not "%db_ready%"=="y" (
    echo ❌ Setup database dulu (Neon/Supabase/Railway)
    exit /b 1
)

set /p schema_ready="✓ Schema & seed sudah dijalankan? (y/n): "
if /i not "%schema_ready%"=="y" (
    echo ❌ Jalankan schema.sql dan seed.sql
    exit /b 1
)

set /p cloudinary_ready="✓ Cloudinary credentials ready? (y/n): "
if /i not "%cloudinary_ready%"=="y" (
    echo ❌ Setup Cloudinary dulu
    exit /b 1
)

echo.
echo 🎯 Next Steps:
echo ================================
echo 1. Install Vercel CLI: npm install -g vercel
echo 2. Deploy Backend:
echo    cd backend
echo    vercel
echo.
echo 3. Deploy Frontend:
echo    cd frontend
echo    vercel
echo.
echo 📚 Baca DEPLOYMENT_GUIDE.md untuk detail lengkap
echo.
pause
