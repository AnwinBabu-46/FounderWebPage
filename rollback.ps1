# Rollback Script for Vercel Deployment
# This script restores a previous deployment by checking out a backup branch

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Vercel Deployment Rollback Script  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is available
try {
    $gitVersion = git --version 2>&1 | Out-Null
} catch {
    Write-Host "✗ Git is not available. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Host "✗ Not in a Git repository. Please run this script from the repository root." -ForegroundColor Red
    exit 1
}

# Get current branch
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Cyan

# List available backup branches
Write-Host ""
Write-Host "Searching for backup branches..." -ForegroundColor Yellow
$backupBranches = git branch -a | Select-String "pre-vercel-update" | ForEach-Object { $_.Line.Trim() -replace '^\*\s+', '' -replace '^remotes/[^/]+/', '' } | Select-Object -Unique

if (-not $backupBranches) {
    Write-Host ""
    Write-Host "✗ No backup branches found (branches starting with 'pre-vercel-update')" -ForegroundColor Red
    Write-Host ""
    Write-Host "Available options:" -ForegroundColor Yellow
    Write-Host "  1. Manually checkout a specific branch:" -ForegroundColor White
    Write-Host "     git checkout <branch-name>" -ForegroundColor Gray
    Write-Host "     git push origin <branch-name> --force" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  2. Revert the last commit:" -ForegroundColor White
    Write-Host "     git revert HEAD" -ForegroundColor Gray
    Write-Host "     git push origin $currentBranch" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

# Display backup branches
Write-Host ""
Write-Host "Found backup branches:" -ForegroundColor Green
$branchList = @()
$index = 1
foreach ($branch in $backupBranches) {
    $branchInfo = git log -1 --format="%h - %s (%ar)" $branch 2>&1
    Write-Host "  [$index] $branch" -ForegroundColor Cyan
    Write-Host "      $branchInfo" -ForegroundColor Gray
    $branchList += $branch
    $index++
}

Write-Host ""
$selectedIndex = Read-Host "Select a backup branch to restore (1-$($branchList.Count)) or 'q' to quit"

if ($selectedIndex -eq "q" -or $selectedIndex -eq "Q") {
    Write-Host "Rollback cancelled." -ForegroundColor Yellow
    exit 0
}

try {
    $selectedBranch = $branchList[[int]$selectedIndex - 1]
} catch {
    Write-Host "✗ Invalid selection. Please run the script again and select a valid number." -ForegroundColor Red
    exit 1
}

if (-not $selectedBranch) {
    Write-Host "✗ Invalid selection. Please run the script again and select a valid number." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Selected branch: $selectedBranch" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠ WARNING: This will force push to $currentBranch and overwrite the current state!" -ForegroundColor Red
Write-Host "This action will trigger Vercel to redeploy the previous version." -ForegroundColor Yellow
Write-Host ""
$confirmation = Read-Host "Are you sure you want to proceed? Type 'yes' to confirm"

if ($confirmation -ne "yes") {
    Write-Host "Rollback cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "[1/3] Checking out backup branch..." -ForegroundColor Yellow
git checkout $selectedBranch
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to checkout backup branch. It may not exist locally." -ForegroundColor Red
    Write-Host "  Attempting to fetch from remote..." -ForegroundColor Yellow
    
    # Try to fetch the branch
    git fetch origin $selectedBranch 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        git checkout -b $selectedBranch "origin/$selectedBranch" 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "✗ Failed to checkout backup branch." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "✗ Backup branch not found locally or remotely." -ForegroundColor Red
        exit 1
    }
}
Write-Host "  ✓ Checked out backup branch: $selectedBranch" -ForegroundColor Green

Write-Host ""
Write-Host "[2/3] Switching to $currentBranch..." -ForegroundColor Yellow
git checkout $currentBranch
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to switch to $currentBranch" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Switched to $currentBranch" -ForegroundColor Green

Write-Host ""
Write-Host "[3/3] Force pushing to restore deployment..." -ForegroundColor Yellow
Write-Host "  This will overwrite $currentBranch with the backup branch state." -ForegroundColor Gray
git reset --hard $selectedBranch
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to reset branch." -ForegroundColor Red
    exit 1
}

git push origin $currentBranch --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to push to remote. Please check your Git credentials and network connection." -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Successfully force-pushed to origin/$currentBranch" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rollback completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The backup branch '$selectedBranch' has been restored to '$currentBranch'." -ForegroundColor Green
Write-Host "Vercel will automatically detect the push and redeploy the previous version." -ForegroundColor Cyan
Write-Host ""
Write-Host "Please verify:" -ForegroundColor Yellow
Write-Host "  [ ] Check Vercel dashboard for new deployment" -ForegroundColor White
Write-Host "  [ ] Verify the live site is working correctly" -ForegroundColor White
Write-Host "  [ ] Test critical functionality" -ForegroundColor White
Write-Host ""
