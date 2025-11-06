# 🎵 Spotify Clone

A **web-based music player** that replicates the look and feel of **Spotify**, allowing users to browse albums, play songs, and enjoy full playback control — all using **HTML, CSS, and JavaScript**.

---

## 🚀 Features

- 🎧 **Album Browsing** – Explore music albums with covers and descriptions.  
- ▶️ **Song Playback** – Play, pause, next, and previous controls.  
- 🔁 **Playback Options** – Shuffle, repeat, volume control, and seek bar.  
- 🎵 **Music Library** – Organized folders with album info and songs.  
- 💾 **Local Storage Support** – Remembers your last played song and position.  
- 💻 **Responsive UI** – Designed with a clean, Spotify-like look for desktop browsers.  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **HTML5** | Page structure |
| **CSS3** | Styling and layout (style.css, utility.css) |
| **JavaScript (ES6)** | Playback logic and interactivity |
| **Python HTTP Server** | Local server for fetching files |

---

## ⚙️ Getting Started

Follow these steps to run the project locally:

### 📦 Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)
- [Python](https://www.python.org/downloads/) installed on your system

### 🧩 Installation
1. Clone or download this repository:
   ```bash
   git clone https://github.com/CARLOX62/Spotify-Clone
   ```
2. Navigate to the project folder:
   ```bash
   cd spotify-clone
   ```
3. Run a local HTTP server:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

---

## 📂 Folder Structure

```
Spotify Clone/
├── index.html          # Main HTML file
├── style.css           # Main stylesheet
├── utility.css         # Utility styles
├── script.js           # JavaScript for playback & UI
├── README.md           # Project documentation
├── favicon.ico         # Favicon icon
├── image/              # Icons and images
│   ├── close.svg
│   ├── hamburger.svg
│   ├── home.svg
│   ├── logo.svg
│   ├── music.svg
│   ├── mute.svg
│   ├── nextsong.svg
│   ├── pause.svg
│   ├── play.svg
│   ├── playlist.svg
│   ├── prevsong.svg
│   ├── repeat.svg
│   ├── search.svg
│   ├── shuffle.svg
│   └── volume.svg
└── songs/              # Music albums and tracks
    ├── cs/
    │   ├── cover.jpg
    │   ├── info.json
    │   └── *.mp3 files
    ├── Diljit/
    ├── Karan Aujla/
    ├── ncs/
    └── Various moods (Love, Chill, Angry, Funky, Uplifting)
```

---

## 🎶 Adding New Music

You can easily add new albums or songs:

1. Create a new folder inside `/songs/`.
2. Add your `.mp3` files to that folder.
3. Include a `cover.jpg` image.
4. Add an `info.json` file with album metadata:
   ```json
   {
     "title": "Album Name",
     "description": "Description of the album"
   }
   ```

---

## 💡 Notes

- The app uses **fetch()** to load files, so a **local server** is required (it won’t work with `file://`).
- Make sure your MP3 files are browser-compatible.
- This is a **frontend-only** project — no database or backend is used.

---

## 🧠 Learning Objectives

This project helps you understand:
- DOM manipulation and event handling in JavaScript  
- Fetch API and asynchronous operations  
- Media playback using HTML `<audio>` element  
- Responsive UI design with CSS  

---

## 🪪 License

This project is intended for **educational purposes**.  
Feel free to **use, modify, and enhance** it for your own projects.

---

## 🌟 Show Your Support

If you like this project, please ⭐ it on GitHub and share it with others!  
Made with ❤️ by **[Aniket Kumar](https://github.com/CARLOX62)**.

---

### 🎧 Preview
<img width="1920" height="1080" alt="Screenshot (304)" src="https://github.com/user-attachments/assets/9ea0cc41-daba-4b06-bbdf-82e60923cf1a" />
<img width="1920" height="1080" alt="Screenshot (305)" src="https://github.com/user-attachments/assets/91f7f3a6-4ffd-48af-8561-93ddd61a664f" />

