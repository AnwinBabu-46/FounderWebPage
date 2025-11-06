# Automated Vercel Deployment Script
# This script automates the deployment workflow with safety checks and validation

param(
    [string]$CommitMessage = "Deploy to Vercel",
    [switch]$SkipBuild = $false
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Success { Write-Host $args -ForegroundColor Green }
function Write-Error { Write-Host $args -ForegroundColor Red }
function Write-Info { Write-Host $args -ForegroundColor Cyan }
function Write-Warning { Write-Host $args -ForegroundColor Yellow }

# Pre-flight Checks
Write-Info "=== Pre-flight Checks ==="

# Check if Git is available
try {
    $gitVersion = git --version
    Write-Success "Git is available: $gitVersion"
} catch {
    Write-Error "Git is not installed or not in PATH"
    exit 1
}

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Error "Not in a Git repository. Please run this script from the repository root."
    exit 1
}

# Check current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Info "Current branch: $currentBranch"

# Verify working tree is clean
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "Working tree is not clean. Staging changes..."
    git add .
} else {
    Write-Success "Working tree is clean"
}

# Check if we're up to date with remote
Write-Info "Checking remote status..."
git fetch origin --quiet
$localCommit = git rev-parse HEAD
$remoteCommit = git rev-parse "origin/$currentBranch" 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Warning "Branch '$currentBranch' does not exist on remote. Will push as new branch."
} elseif ($localCommit -ne $remoteCommit) {
    Write-Warning "Local branch is not up to date with remote. Consider pulling first."
    $response = Read-Host "Continue anyway? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Info "Deployment cancelled."
        exit 0
    }
} else {
    Write-Success "Branch is up to date with remote"
}

# Create Backup Branch
Write-Info "`n=== Creating Backup Branch ==="
$backupBranch = "pre-vercel-update"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupBranchWithTimestamp = "$backupBranch-$timestamp"

# Check if backup branch already exists
if (git rev-parse --verify "$backupBranch" 2>$null) {
    Write-Warning "Backup branch '$backupBranch' already exists. Creating timestamped backup: $backupBranchWithTimestamp"
    $backupBranch = $backupBranchWithTimestamp
}

# Create and checkout backup branch
git branch "$backupBranch" 2>$null
Write-Success "Created backup branch: $backupBranch"

# Return to original branch
git checkout $currentBranch | Out-Null

# Build and Lint Validation
if (-not $SkipBuild) {
    Write-Info "`n=== Build and Lint Validation ==="
    
    # Check if Node.js is available
    try {
        $nodeVersion = node --version
        Write-Success "Node.js is available: $nodeVersion"
    } catch {
        Write-Error "Node.js is not installed or not in PATH"
        exit 1
    }
    
    # Check if npm is available
    try {
        $npmVersion = npm --version
        Write-Success "npm is available: v$npmVersion"
    } catch {
        Write-Error "npm is not installed or not in PATH"
        exit 1
    }
    
    # Run lint
    Write-Info "Running lint checks..."
    npm run lint
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Lint checks failed. Please fix the issues before deploying."
        Write-Info "To skip lint checks, use: .\deploy.ps1 -SkipBuild"
        exit 1
    }
    Write-Success "Lint checks passed"
    
    # Run build
    Write-Info "Running build..."
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed. Please fix the issues before deploying."
        exit 1
    }
    Write-Success "Build completed successfully"
} else {
    Write-Warning "Skipping build and lint validation (--SkipBuild flag used)"
}

# Commit Changes
Write-Info "`n=== Committing Changes ==="
$hasChanges = git diff --cached --quiet
if (-not $hasChanges) {
    Write-Info "No changes to commit"
} else {
    Write-Info "Committing changes with message: $CommitMessage"
    git commit -m $CommitMessage
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Commit failed"
        exit 1
    }
    Write-Success "Changes committed"
}

# Push to GitHub
Write-Info "`n=== Pushing to GitHub ==="
Write-Info "Pushing branch '$currentBranch' to origin..."
git push origin $currentBranch
if ($LASTEXITCODE -ne 0) {
    Write-Error "Push to GitHub failed"
    Write-Info "Backup branch '$backupBranch' is available for rollback"
    exit 1
}
Write-Success "Pushed to GitHub successfully"

# Post-Deployment Verification
Write-Info "`n=== Post-Deployment Verification ==="
Write-Success "Deployment initiated successfully!"
Write-Info "`nVerification Checklist:"
Write-Info "  [ ] Check Vercel dashboard for deployment status"
Write-Info "  [ ] Verify the build completed without errors"
Write-Info "  [ ] Test the deployed site functionality"
Write-Info "  [ ] Check all pages load correctly"
Write-Info "  [ ] Verify all links and forms work"
Write-Info "  [ ] Test responsive design on different devices"
Write-Info "  [ ] Check for console errors in browser"
Write-Info "  [ ] Verify environment variables are set correctly"

# Rollback Information
Write-Info "`n=== Rollback Information ==="
Write-Info "If you need to rollback, use the following command:"
Write-Host "  .\rollback.ps1" -ForegroundColor Yellow
Write-Info "Or manually:"
Write-Host "  git checkout $backupBranch" -ForegroundColor Yellow
Write-Host "  git push origin $backupBranch:$currentBranch --force" -ForegroundColor Yellow
Write-Info "`nBackup branch: $backupBranch"

Write-Success "`n=== Deployment Complete ==="
Write-Info "Vercel will automatically deploy when it detects the push to GitHub."