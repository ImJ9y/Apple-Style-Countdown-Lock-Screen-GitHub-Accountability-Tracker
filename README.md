# Apple-Style Countdown Lock Screen & GitHub Accountability Tracker

I built an ultra-transparent Apple-style Countdown Lock Screen and GitHub Accountability Tracker to stay on top of major engineering deliverables and exam deadlines. Gemini helped me break the build into clear milestones: a draggable priority queue with a live countdown clock, a 52-week GitHub contribution heatmap that logs on-time vs. missed tasks, and sleep-proof timestamp persistence. I learned how to combine glassmorphic UI with real-time state sync.

<img width="2528" height="1696" alt="Gemini_Generated_Image_y8uhzy8uhzy8uhzy" src="https://github.com/user-attachments/assets/c6c4a8c1-88a0-4201-b781-5bb6fffc84fc" />

> *Tip: Upload a screenshot of your lock screen to your repository as `preview.png` or replace the path above with your image link.*

---

## ✨ Key Features

- **Apple Frosted-Glass Lock Screen UI:** Ultra-transparent macOS Sequoia & iOS 18 aesthetic with adjustable glass opacity (`3%`–`35%`), custom wallpaper uploads, and a pure-transparent overlay mode.
- **Live Hero Countdown & Draggable Priority Queue:** Automatically binds your `#1` priority deadline to a real-time `DD:HH:MM:SS` countdown clock. Reorder tasks directly on the lock screen via drag-and-drop or quick-rank promotion.
- **52-Week GitHub Accountability Heatmap:** Tracks daily task completions across a full-year contribution grid (`2023`–`2026`) using GitHub's color scale for on-time completions and amber/rose indicators for overdue or missed tasks.
- **Interactive Historical Task Inspector:** Click any past square on the heatmap to inspect the exact tasks completed on time, completed late, or missed on that day—with one-click restoration back to your active queue.
- **Sleep-Proof Persistence & Wake Lock:** Calculates countdowns against absolute ISO timestamps (`dueDate - Date.now()`) with automatic `visibilitychange` resyncing and Screen Wake Lock API (`navigator.wakeLock`) support so timers stay accurate even after your computer sleeps.
- **Cross-Platform Views:** Switch seamlessly between **Mac Lock**, **Windows Lock**, and **Phone Lock** layouts, or enter **Fullscreen Standby Mode**.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Tailwind CSS, Lucide React Icons
- **State & Storage:** LocalStorage with automatic sleep/wake state reconciliation and JSON Export/Import backup
- **Browser APIs:** HTML5 Drag and Drop API, Screen Wake Lock API, Fullscreen API, FileReader API

---

## 🚀 Getting Started (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Apple-Style-Countdown-Lock-Screen-GitHub-Accountability-Tracker.git
   cd Apple-Style-Countdown-Lock-Screen-GitHub-Accountability-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production / GitHub Pages:**
   ```bash
   npm run build
   ```

---

## 🖥️ How to Use as a Live Lock Screen / Wallpaper

1. **Mac (macOS):**
   - **Live Desktop Wallpaper:** Install [Plash](https://github.com/sindresorhus/Plash) (free on the Mac App Store) and add your deployed GitHub Pages URL, or open the app in Safari and select **File → Add to Dock** for a standalone window with **Keep Awake** enabled.
2. **Windows:**
   - **Live Wallpaper / Lock Overlay:** Install [Lively Wallpaper](https://www.rocksdanister.com/lively/) and paste your deployed GitHub Pages URL as a webpage wallpaper.
3. **iPhone / Android:**
   - Open your deployed GitHub Pages URL in Safari (iOS) or Chrome (Android), tap **Share → Add to Home Screen**, and switch the layout toggle to **Phone Lock**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
