# Automated Vercel Deployment Script
# This script automates the deployment process with safety checks and validation

param(
    [string]$CommitMessage = "Automated deployment to Vercel",
    [switch]$SkipBackup = $false
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Automated Vercel Deployment Script  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Pre-flight Checks
Write-Host "[1/6] Running pre-flight checks..." -ForegroundColor Yellow

# Check if Git is available
try {
    $gitVersion = git --version 2>&1
    Write-Host "  ✓ Git is available: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Git is not available. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Host "  ✗ Not in a Git repository. Please run this script from the repository root." -ForegroundColor Red
    exit 1
}

# Check Git status
Write-Host "  Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "  ⚠ Warning: Uncommitted changes detected:" -ForegroundColor Yellow
    Write-Host $gitStatus
    $response = Read-Host "  Continue anyway? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "  Deployment cancelled." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "  ✓ Working tree is clean" -ForegroundColor Green
}

# Check current branch
$currentBranch = git branch --show-current
Write-Host "  Current branch: $currentBranch" -ForegroundColor Cyan

# Warn if not on main branch
if ($currentBranch -ne "main" -and $currentBranch -ne "master") {
    Write-Host "  ⚠ Warning: Not on main/master branch. Deployment typically happens from main." -ForegroundColor Yellow
    $response = Read-Host "  Continue anyway? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "  Deployment cancelled." -ForegroundColor Red
        exit 1
    }
}

# Check if remote is configured
$remoteUrl = git remote get-url origin 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ No remote 'origin' configured. Please configure a remote repository." -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Remote origin: $remoteUrl" -ForegroundColor Green

Write-Host ""
Write-Host "[2/6] Creating backup branch..." -ForegroundColor Yellow

# Create backup branch
if (-not $SkipBackup) {
    $backupBranch = "pre-vercel-update-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Write-Host "  Creating backup branch: $backupBranch" -ForegroundColor Cyan
    
    git branch $backupBranch 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Backup branch created: $backupBranch" -ForegroundColor Green
        Write-Host "  Note: You can restore this branch using rollback.ps1 if needed." -ForegroundColor Gray
    } else {
        Write-Host "  ⚠ Warning: Could not create backup branch (may already exist)" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠ Skipping backup branch creation (--SkipBackup flag used)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[3/6] Running build validation..." -ForegroundColor Yellow

# Check if Node.js is available
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  ✓ Node.js is available: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js is not available. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version 2>&1
    Write-Host "  ✓ npm is available: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ npm is not available. Please install npm first." -ForegroundColor Red
    exit 1
}

# Run lint
Write-Host "  Running lint check..." -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ Lint check failed. Please fix linting errors before deploying." -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Lint check passed" -ForegroundColor Green

# Run build
Write-Host "  Running build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ Build failed. Please fix build errors before deploying." -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Build successful" -ForegroundColor Green

Write-Host ""
Write-Host "[4/6] Staging and committing changes..." -ForegroundColor Yellow

# Stage all changes
git add .
$stagedChanges = git diff --cached --name-only
if ($stagedChanges) {
    Write-Host "  Staging changes..." -ForegroundColor Cyan
    Write-Host "  Files to be committed:" -ForegroundColor Gray
    $stagedChanges | ForEach-Object { Write-Host "    - $_" -ForegroundColor Gray }
    
    # Commit changes
    Write-Host "  Committing with message: '$CommitMessage'" -ForegroundColor Cyan
    git commit -m $CommitMessage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  ✗ Commit failed." -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ Changes committed successfully" -ForegroundColor Green
} else {
    Write-Host "  ℹ No changes to commit (working tree is clean)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "[5/6] Pushing to GitHub..." -ForegroundColor Yellow

# Push to origin
Write-Host "  Pushing to origin/$currentBranch..." -ForegroundColor Cyan
git push origin $currentBranch
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ Push failed. Please check your Git credentials and network connection." -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Successfully pushed to GitHub" -ForegroundColor Green
Write-Host "  Vercel will automatically detect the push and start deployment." -ForegroundColor Cyan

Write-Host ""
Write-Host "[6/6] Deployment initiated!" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  POST-DEPLOYMENT VERIFICATION CHECKLIST" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please verify the following after deployment:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  [ ] Check Vercel dashboard for deployment status" -ForegroundColor White
Write-Host "  [ ] Verify the live site loads correctly" -ForegroundColor White
Write-Host "  [ ] Test all main pages and navigation" -ForegroundColor White
Write-Host "  [ ] Verify responsive design on mobile/tablet" -ForegroundColor White
Write-Host "  [ ] Check blog posts are loading correctly" -ForegroundColor White
Write-Host "  [ ] Test contact form functionality" -ForegroundColor White
Write-Host "  [ ] Verify all images and assets load" -ForegroundColor White
Write-Host "  [ ] Check browser console for errors" -ForegroundColor White
Write-Host ""
Write-Host "If issues are detected:" -ForegroundColor Yellow
if (-not $SkipBackup) {
    Write-Host "  Run: .\rollback.ps1" -ForegroundColor Cyan
    Write-Host "  This will restore the backup branch: $backupBranch" -ForegroundColor Gray
} else {
    Write-Host "  Note: No backup branch was created (--SkipBackup was used)" -ForegroundColor Yellow
    Write-Host "  You may need to manually revert changes or create a fix commit." -ForegroundColor Yellow
}
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deployment script completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
