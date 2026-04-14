# Deployment Script for Massaba Consulting
# Run this after making changes

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DEPLOYING CHANGES TO PRODUCTION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "Changes detected, committing..." -ForegroundColor Yellow
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Update: Add UNIRANKS 2026 video banner - $timestamp"
    
    # Push to GitHub
    git push origin main
    
    Write-Host "✓ Changes pushed to GitHub" -ForegroundColor Green
    Write-Host "✓ Vercel will automatically deploy in 2-3 minutes" -ForegroundColor Green
} else {
    Write-Host "No changes to deploy" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Production URL: https://massaba.app" -ForegroundColor Cyan
Write-Host "Vercel Dashboard: https://vercel.com/abel-coulibalys-projects/massaba-consulting" -ForegroundColor Cyan