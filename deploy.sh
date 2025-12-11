#!/bin/bash
# Quick Deployment Script for ArtConnect

echo "🚀 ArtConnect Deployment Helper"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "⚠️  Git repository not initialized!"
    echo "Run: git init"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 You have uncommitted changes. Commit them first:"
    echo ""
    git status -s
    echo ""
    read -p "Commit now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Commit message: " commit_msg
        git add .
        git commit -m "$commit_msg"
        git push origin main
    fi
fi

echo ""
echo "✅ Checklist before deployment:"
echo "================================"
echo ""

read -p "✓ Database cloud sudah setup? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup database dulu (Neon/Supabase/Railway)"
    exit 1
fi

read -p "✓ Schema & seed sudah dijalankan? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Jalankan schema.sql dan seed.sql"
    exit 1
fi

read -p "✓ Cloudinary credentials ready? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup Cloudinary dulu"
    exit 1
fi

echo ""
echo "🎯 Next Steps:"
echo "================================"
echo "1. Install Vercel CLI: npm install -g vercel"
echo "2. Deploy Backend:"
echo "   cd backend"
echo "   vercel"
echo ""
echo "3. Deploy Frontend:"
echo "   cd frontend"
echo "   vercel"
echo ""
echo "📚 Baca DEPLOYMENT_GUIDE.md untuk detail lengkap"
echo ""
