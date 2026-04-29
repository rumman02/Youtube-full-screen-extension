# YouTube Theater Fullscreen Extension

Automatically expands YouTube theater mode to fill the entire screen. Hides the header when scrolled to the top. Skips YouTube Shorts.

---

## Chrome Setup

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **"Load unpacked"**
5. Select the root folder of this repository (the one containing `manifest.json`)
6. The extension is now active on YouTube

To update after code changes: click the refresh icon on the extension card in `chrome://extensions`.

---

## Firefox Setup

### Temporary (for testing)

1. Download or clone this repository
2. Open Firefox and go to `about:debugging`
3. Click **"This Firefox"** in the left sidebar
4. Click **"Load Temporary Add-on..."**
5. Navigate to the `firefox/` folder and select `manifest.json`
6. The extension is now active — it stays loaded until Firefox restarts

### Permanent (via zip)

1. Download `firefox-extension.zip` from this repository
2. Open Firefox and go to `about:addons`
3. Click the gear icon ⚙ → **"Install Add-on From File..."**
4. Select `firefox-extension.zip`

> **Note:** Firefox may warn that the extension is unsigned. To allow unsigned extensions, go to `about:config`, search for `xpinstall.signatures.required`, and set it to `false`. This only works in Firefox Developer Edition or Nightly.

---

## How It Works

- Detects when YouTube theater mode is active and expands the player to full viewport height
- Hides the top navigation bar when scrolled to the top of the page
- Restores everything when theater mode is turned off or you navigate away from a video
