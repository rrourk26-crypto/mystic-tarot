# Mystic Tarot — Windows Desktop App (Electron)

This folder is now set up as an Electron app. A couple of quick notes first:

- **"APK" is the Android package format** — it won't run on Windows. For Windows you
  want an `.exe` installer, which is what this setup produces (via `electron-builder`,
  using the NSIS installer format). If you *also* want an Android version later, that's
  a separate, unrelated process (e.g. wrapping it with Capacitor) — just flag it and we
  can set that up too.
- Building a Windows installer works most reliably **on a Windows machine** (or at
  least needs `wine` if you try it from Linux/Mac). So the steps below assume you'll
  run them on your own Windows PC.

## What was added

- `main.js` — the Electron entry point, opens `index.html` in a desktop window.
- `package.json` — Electron + electron-builder config (already set up to build a
  Windows installer).
- `icon.png` — a square version of your app icon (generated from
  `mystic tarot apk.png`) used for the app/installer icon.

Nothing in your existing HTML/CSS/JS/images was changed — this just wraps it in a
native window.

## How to build the Windows installer

1. Install [Node.js](https://nodejs.org/) (LTS version) if you don't already have it.
2. Open a terminal/PowerShell in this folder (the one containing `package.json`).
3. Install dependencies:
   ```
   npm install
   ```
4. (Optional) Try it out first without building an installer:
   ```
   npm start
   ```
   This should open the app in its own window, just like it'll look once installed.
5. Build the Windows installer:
   ```
   npm run dist
   ```
6. When it finishes, look in the new `dist/` folder — you'll find something like
   `Mystic Tarot Setup 1.0.0.exe`. That's the installer you can share/run on any
   Windows PC.

## Changing the app name / version

Edit `name`, `productName` (under `build`), and `version` in `package.json` before
building if you want to rename it.

## If you'd rather not install anything locally

You can also build in the cloud with a free GitHub Actions workflow (push this folder
to a GitHub repo, run electron-builder on a `windows-latest` runner) — let me know if
you'd like that workflow file set up instead.
