# ==============================================================================
# Niagara Renovation Company – Node.js Install & Build Script
# Run this script in PowerShell as Administrator:
#   Right-click PowerShell → Run as Administrator
#   Then run: cd "C:\Users\denze\Documents\niagara-renovation"; .\install-and-build.ps1
# ==============================================================================

$ErrorActionPreference = "Stop"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " Niagara Renovation Company – Setup & Build Script" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# ── Step 1: Check for Node.js ──────────────────────────────────────────────────
Write-Host "`n[1/5] Checking for Node.js..." -ForegroundColor Yellow

$nodeInstalled = $false
try {
    $nodeVersion = & node --version 2>&1
    if ($nodeVersion -match "v\d+") {
        Write-Host "  Node.js found: $nodeVersion" -ForegroundColor Green
        $nodeInstalled = $true
    }
} catch {
    Write-Host "  Node.js not found." -ForegroundColor Red
}

# ── Step 2: Install Node.js if missing ────────────────────────────────────────
if (-not $nodeInstalled) {
    Write-Host "`n[2/5] Downloading and installing Node.js LTS..." -ForegroundColor Yellow

    $nodeUrl = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
    $installerPath = "$env:TEMP\node-installer.msi"

    Write-Host "  Downloading from: $nodeUrl" -ForegroundColor Gray
    Invoke-WebRequest -Uri $nodeUrl -OutFile $installerPath -UseBasicParsing

    Write-Host "  Installing Node.js (this may take a minute)..." -ForegroundColor Gray
    $installArgs = "/i `"$installerPath`" /quiet /norestart ADDLOCAL=ALL"
    Start-Process msiexec.exe -ArgumentList $installArgs -Wait -Verb RunAs

    # Refresh PATH
    $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("PATH", "User")

    Write-Host "  Node.js installed successfully!" -ForegroundColor Green

    # Verify
    $nodeVersion = & node --version
    Write-Host "  Installed version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "[2/5] Node.js already installed – skipping." -ForegroundColor Green
}

# ── Step 3: Set working directory ─────────────────────────────────────────────
$projectDir = "C:\Users\denze\Documents\niagara-renovation"
Write-Host "`n[3/5] Changing to project directory: $projectDir" -ForegroundColor Yellow
Set-Location $projectDir

# ── Step 4: Install npm dependencies ──────────────────────────────────────────
Write-Host "`n[4/5] Installing npm dependencies..." -ForegroundColor Yellow
Write-Host "  This will take 1-3 minutes on first run." -ForegroundColor Gray
& npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ERROR: npm install failed. See output above." -ForegroundColor Red
    exit 1
}
Write-Host "  Dependencies installed successfully!" -ForegroundColor Green

# ── Step 5: Build the site ────────────────────────────────────────────────────
Write-Host "`n[5/5] Building the static site (npm run build)..." -ForegroundColor Yellow
Write-Host "  This generates the 'out/' folder with all static HTML files." -ForegroundColor Gray
Write-Host "  Expect ~120 pages to be generated — may take 2-5 minutes." -ForegroundColor Gray
& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ERROR: Build failed. See output above." -ForegroundColor Red
    exit 1
}

Write-Host "`n======================================================" -ForegroundColor Green
Write-Host " BUILD COMPLETE!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""
Write-Host " Your static site is in: C:\Users\denze\Documents\niagara-renovation\out\" -ForegroundColor White
Write-Host ""
Write-Host " Next steps:" -ForegroundColor Cyan
Write-Host "  1. Upload ALL contents of the 'out\' folder to GoDaddy public_html" -ForegroundColor White
Write-Host "  2. Make sure .htaccess is uploaded (enable 'Show Hidden Files' in cPanel)" -ForegroundColor White
Write-Host "  3. Update YOUR_FORM_ID in LeadForm.tsx and ExitIntentPopup.tsx with your Formspree ID" -ForegroundColor White
Write-Host "  4. See README.md for full deployment instructions" -ForegroundColor White
Write-Host ""
Write-Host " To run local dev server: npm run dev  (visit http://localhost:3000)" -ForegroundColor Gray
