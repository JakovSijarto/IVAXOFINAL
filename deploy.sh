#!/bin/bash

echo "🚀 Ivaxo Deployment Script"
echo "=========================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git not initialized. Run 'git init' first."
    exit 1
fi

# Check for uncommitted changes
if [[ `git status --porcelain` ]]; then
    echo "📝 Committing changes..."
    git add .
    read -p "Enter commit message: " commit_msg
    git commit -m "$commit_msg"
fi

# Check if remote exists
if ! git remote | grep -q origin; then
    echo ""
    echo "📌 No remote repository found."
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " repo_url
    git remote add origin "$repo_url"
fi

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://app.netlify.com/"
echo "2. Click 'Add new site' → 'Import an existing project'"
echo "3. Connect your GitHub repository"
echo "4. Add environment variables (see DEPLOYMENT_GUIDE.md)"
echo "5. Deploy!"
echo ""
echo "Happy deploying! 🎉"
