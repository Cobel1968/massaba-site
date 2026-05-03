# Complete AI Chat Integration Script
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           MASSABA CONSULTANCY - AI CHAT INTEGRATION         ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
# 1. Add CSS Animations
Write-Host "`n📝 STEP 1: Adding CSS Animations..." -ForegroundColor Yellow
$cssPath = "D:\massaba\consultancy-site\app\globals.css"
$cssAnimation = @"
/* AI Chat Animations */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce { animation: bounce 0.5s infinite; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.message-enter { animation: fadeIn 0.3s ease-out; }
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}
.chat-pulse { animation: pulse 2s infinite; }
"@
$currentCss = Get-Content $cssPath -Raw -ErrorAction SilentlyContinue
if ($currentCss -notmatch "animate-bounce") {
    Add-Content -Path $cssPath -Value $cssAnimation
    Write-Host "✅ CSS animations added to globals.css" -ForegroundColor Green
} else {
    Write-Host "⚠️ CSS animations already exist" -ForegroundColor Yellow
}
# 2. Update Layout
Write-Host "`n📝 STEP 2: Updating Layout..." -ForegroundColor Yellow
$layoutPath = "D:\massaba\consultancy-site\app\layout.tsx"
$layoutContent = Get-Content $layoutPath -Raw -ErrorAction SilentlyContinue
if ($layoutContent) {
    if ($layoutContent -notmatch "import AIChat from") {
        $layoutContent = $layoutContent -replace "(import.*from ['\"]next/font/google['\"];)", "`$1`nimport AIChat from '@/components/AIChat';"
        Write-Host "✅ Added AIChat import" -ForegroundColor Green
    }
    if ($layoutContent -notmatch "<AIChat\s*/>") {
        $layoutContent = $layoutContent -replace "(</body>)", "<AIChat />`n      `$1"
        Write-Host "✅ Added AIChat component" -ForegroundColor Green
    }
    $layoutContent | Out-File -FilePath $layoutPath -Encoding UTF8 -NoNewline
    Write-Host "✅ Layout file updated successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Could not read layout.tsx file" -ForegroundColor Red
}
# 3. Clear cache
Write-Host "`n📝 STEP 3: Clearing Next.js cache..." -ForegroundColor Yellow
$nextFolder = "D:\massaba\consultancy-site\.next"
if (Test-Path $nextFolder) {
    Remove-Item -Path $nextFolder -Recurse -Force
    Write-Host "✅ Cache cleared" -ForegroundColor Green
}
Write-Host "`n╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    INTEGRATION COMPLETE                      ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n🚀 Run: npm run dev" -ForegroundColor Cyan