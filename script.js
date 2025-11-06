console.log('Lets write JavaScript');

let currentSong = new Audio();
let songs = [];
let currFolder = "";
let play;
let previous;
let next;
let isShuffle = false;
let isRepeat = false;

// Convert seconds to MM:SS format
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// ✅ Fetch songs from folder
async function getSongs(folder) {
    currFolder = folder;
    console.log("Fetching folder:", folder);

    try {
        let a = await fetch(folder + "/");
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;

        let as = div.getElementsByTagName("a");
        songs = [];

        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                // ✅ Only keep filename (no folder prefix)
                let songName = element.href.split("/").pop();
                songName = decodeURIComponent(songName);
                songs.push(songName);
            }
        }

        console.log("✅ Songs found:", songs);

        // Populate list
        let songUL = document.querySelector(".songList ul");
        songUL.innerHTML = "";

        for (const song of songs) {
            songUL.innerHTML += `
                <li>
                    <img class="invert" width="34" src="songs/${currFolder.split("/").pop()}/cover.jpg" alt="">
                    <div class="info">
                        <div>${song.replace(".mp3", "")}</div>
                        <div>${currFolder.split("/").pop().replace(/_/g, " ")}</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="invert" src="image/play.svg" alt="">
                    </div>
                </li>`;
        }

        // Click handler
        Array.from(document.querySelectorAll(".songList li")).forEach(li => {
            li.addEventListener("click", () => {
                const songTitle = li.querySelector(".info div").innerText.trim();
                const match = songs.find(s => s.replace(".mp3", "") === songTitle);
                if (match) playMusic(match);
            });
        });

        return songs;
    } catch (err) {
        console.error("Failed to fetch songs:", err);
        alert("Failed to load songs from folder: " + folder);
        return [];
    }
}

// ✅ Highlight playing song
function highlightPlayingSong(track) {
    document.querySelectorAll(".songList li").forEach(li => {
        li.classList.remove("active");
        const songTitle = li.querySelector(".info div").innerText.trim();
        if (songTitle === track.replace(".mp3", "")) {
            li.classList.add("active");
        }
    });
}

// ✅ Play a song
const playMusic = (track, pause = false) => {
    // Prevent duplicate paths
    const srcPath = `${currFolder}/${track}`.replace(/\/{2,}/g, "/");
    currentSong.src = srcPath;
    console.log("🎵 Now playing:", currentSong.src);

    if (!pause) {
        currentSong.play()
            .then(() => {
                console.log("▶️ Playing:", track);
                play.src = "image/pause.svg";
            })
            .catch(err => {
                console.error("Playback failed:", err);
                alert("Failed to play song: " + err.message);
            });
    }

    // Update song info
    document.querySelector(".song-name").innerHTML = decodeURIComponent(track.replace(".mp3", ""));
    document.querySelector(".album-name").innerHTML = currFolder.split("/").pop().replace(/_/g, " ");
    document.querySelector(".song-cover").src = `songs/${currFolder.split("/").pop()}/cover.jpg`;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

    // Highlight playing song
    highlightPlayingSong(track);
};



// ✅ Display all album folders
async function displayAlbums() {
    console.log("Displaying albums...");
    let a = await fetch("songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";

    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.endsWith("/") && e.href !== "../" && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0];
            try {
                let res = await fetch(`songs/${folder}/info.json`);
                let data = await res.json();
                // Use direct cover path
                let coverSrc = `songs/${folder}/cover.jpg`;
                cardContainer.innerHTML += `
                    <div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                        <img src="${coverSrc}" alt="">
                        <h2>${data.title}</h2>
                        <p>${data.description}</p>
                    </div>`;
            } catch (err) {
                console.warn(`No info.json for folder: ${folder}`);
            }
        }
    }

    // Click to load playlist
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("Fetching Songs...");
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
}

// ✅ Main app logic
async function main() {
    // Get elements first
    play = document.getElementById("play");
    previous = document.getElementById("previous");
    next = document.getElementById("next");

    // Save last played song (localStorage)
    window.addEventListener("beforeunload", () => {
        localStorage.setItem("lastSong", currentSong.src);
        localStorage.setItem("lastFolder", currFolder);
        localStorage.setItem("lastTime", currentSong.currentTime);
    });

    // Load last played song on page load
    const lastFolder = localStorage.getItem("lastFolder");
    const lastSong = localStorage.getItem("lastSong");
    const lastTime = localStorage.getItem("lastTime");
    if (lastFolder && lastSong) {
        await getSongs(lastFolder);
        playMusic(lastSong.split("/").pop(), true);
        currentSong.currentTime = lastTime || 0;
    } else {
        // Load default folder
        await getSongs("songs/ncs");
        playMusic(songs[0], true);
    }

    // Display albums
    await displayAlbums();

    // Play/pause button
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "image/pause.svg";
        } else {
            currentSong.pause();
            play.src = "image/play.svg";
        }
    });

    // Update progress bar
    let lastUpdate = 0;
    currentSong.addEventListener("timeupdate", () => {
        const now = Date.now();
        if (now - lastUpdate > 500) {  // update every 0.5s
            lastUpdate = now;
            document.querySelector(".songtime").innerHTML =
                `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
            document.querySelector(".circle").style.left =
                (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }
    });

    // Seekbar click
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    // Hamburger and close
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Shuffle & Repeat buttons
    document.getElementById("shuffle").addEventListener("click", () => {
        isShuffle = !isShuffle;
        document.getElementById("shuffle").style.opacity = isShuffle ? "0.5" : "1";
    });

    document.getElementById("repeat").addEventListener("click", () => {
        isRepeat = !isRepeat;
        document.getElementById("repeat").style.opacity = isRepeat ? "0.5" : "1";
    });

    // Playlist queue navigation
    currentSong.addEventListener("ended", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if (isRepeat) {
            playMusic(songs[index]);
        } else if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            playMusic(songs[randomIndex]);
        } else {
            if (index + 1 < songs.length) playMusic(songs[index + 1]);
            else play.src = "image/play.svg";
        }
    });

    // Previous/Next
    previous.addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if (index > 0) playMusic(songs[index - 1]);
    });

    next.addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if (index + 1 < songs.length) playMusic(songs[index + 1]);
    });

    // Volume control
    document.querySelector(".range input").addEventListener("change", e => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src =
                document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg");
        }
    });

    // Mute toggle
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.1;
            document.querySelector(".range input").value = 10;
        }
    });
}

main();
