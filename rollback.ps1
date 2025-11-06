# Rollback Script for Vercel Deployment
# This script restores the previous deployment from a backup branch

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Success { Write-Host $args -ForegroundColor Green }
function Write-Error { Write-Host $args -ForegroundColor Red }
function Write-Info { Write-Host $args -ForegroundColor Cyan }
function Write-Warning { Write-Host $args -ForegroundColor Yellow }

Write-Info "=== Rollback Script ==="

# Check if Git is available
try {
    git --version | Out-Null
} catch {
    Write-Error "Git is not installed or not in PATH"
    exit 1
}

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Error "Not in a Git repository. Please run this script from the repository root."
    exit 1
}

# Get current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Info "Current branch: $currentBranch"

# Find backup branches
Write-Info "`nSearching for backup branches..."
$backupBranches = git branch --list "pre-vercel-update*" | ForEach-Object { $_.Trim() -replace '^\* ', '' }

if (-not $backupBranches) {
    Write-Error "No backup branches found (pre-vercel-update*). Cannot rollback."
    exit 1
}

# Display available backup branches
Write-Info "`nAvailable backup branches:"
$index = 1
$backupBranches | ForEach-Object {
    $commitDate = git log -1 --format="%cd" --date=short $_
    Write-Host "  [$index] $_ (last commit: $commitDate)"
    $index++
}

# Prompt for branch selection
Write-Info ""
$selectedIndex = Read-Host "Select backup branch to restore (1-$($backupBranches.Count))"

if (-not ($selectedIndex -match '^\d+$') -or [int]$selectedIndex -lt 1 -or [int]$selectedIndex -gt $backupBranches.Count) {
    Write-Error "Invalid selection"
    exit 1
}

$selectedBackupBranch = $backupBranches[[int]$selectedIndex - 1]
Write-Info "Selected backup branch: $selectedBackupBranch"

# Safety confirmation
Write-Warning "`nWARNING: This will force push '$selectedBackupBranch' to '$currentBranch'"
Write-Warning "This will overwrite the current branch and trigger a new Vercel deployment."
Write-Info ""
$confirm = Read-Host "Are you sure you want to proceed? (yes/no)"

if ($confirm -ne "yes" -and $confirm -ne "y") {
    Write-Info "Rollback cancelled."
    exit 0
}

# Checkout backup branch
Write-Info "`n=== Restoring Backup Branch ==="
Write-Info "Checking out backup branch: $selectedBackupBranch"
git checkout $selectedBackupBranch
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to checkout backup branch"
    exit 1
}

# Force push to main branch
Write-Info "Force pushing to $currentBranch..."
git push origin $selectedBackupBranch:$currentBranch --force
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to push backup branch"
    Write-Info "You are currently on the backup branch. To manually restore:"
    Write-Host "  git push origin $selectedBackupBranch:$currentBranch --force" -ForegroundColor Yellow
    exit 1
}

Write-Success "Successfully pushed backup branch to $currentBranch"

# Return to original branch
Write-Info "Returning to $currentBranch..."
git checkout $currentBranch
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Could not return to $currentBranch. You are currently on $selectedBackupBranch"
}

Write-Success "`n=== Rollback Complete ==="
Write-Info "Vercel will automatically deploy the previous version when it detects the push."
Write-Info "Monitor the Vercel dashboard to confirm the rollback deployment."