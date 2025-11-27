# Node.js Installation Steps

## Step 1: Download Node.js

1. Open this link in your browser: **https://nodejs.org/**
2. Click the green button that says **"Download Node.js (LTS)"** 
   - This will download the recommended version (v20.x or v22.x)
3. Wait for the download to complete

## Step 2: Install Node.js

1. Find the downloaded file (usually in your Downloads folder)
   - File name: `node-v20.XX.X-x64.msi` (or similar)
2. **Double-click** the installer file
3. Click **Next** through the installation wizard
4. **Accept** the license agreement
5. Keep the default installation location
6. **Important:** Make sure "Add to PATH" is checked ✅
7. Click **Install**
8. Wait for installation to complete (2-3 minutes)
9. Click **Finish**

## Step 3: Verify Installation

1. **Close all PowerShell/Command Prompt windows**
2. Open a **NEW** PowerShell window
3. Type these commands:

```powershell
node --version
npm --version
```

You should see:
```
v20.11.0 (or similar)
10.2.4 (or similar)
```

## Step 4: Install Frontend Packages

Once Node.js is installed, run these commands:

```powershell
cd C:\Users\Suhas\Downloads\DATAAA\webapp\frontend
npm install
```

This will take 2-3 minutes to download all packages.

## Step 5: Start the Frontend

```powershell
npm run dev
```

The React frontend will start on: **http://localhost:3000**

---

## Quick Summary

1. Go to https://nodejs.org/ 
2. Download LTS version
3. Install it
4. Restart PowerShell
5. Run `npm install` in frontend folder
6. Run `npm run dev`
7. Visit http://localhost:3000

---

**After you install Node.js, come back here and I'll help you start the frontend!** 🚀
