import os

# --- CONFIG ---
SONG_DIR = "songs"
OUTPUT_FILE = "script.js-output.txt"
# ----------------

# --- JavaScript Player Template ---
TEMPLATE = """// Auto-generated file — {count} total song(s)
const songs = [
{songs_list}
];

const songList = document.getElementById("song-list");
const audio = document.getElementById("audio");
const currentSong = document.getElementById("current-song");
const progress = document.getElementById("progress");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");

let currentIndex = -1;
let shuffle = false;
let repeatMode = "playlist"; // can be "once", "playlist", "forever"
let playedHistory = [];

// --- Populate list ---
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.replace(".mp3", "");
  li.addEventListener("click", () => playSong(index));
  songList.appendChild(li);
});

function playSong(index) {
  currentIndex = index;
  const filename = songs[index];
  const encoded = encodeURIComponent(filename);
  audio.src = `songs/${encoded}`;
  audio.play();
  currentSong.textContent = filename.replace(".mp3", "");
  if (shuffle) playedHistory.push(index);
}

function nextSong() {
  if (shuffle) {
    const nextIndex = Math.floor(Math.random() * songs.length);
    playSong(nextIndex);
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
  }
}

function prevSong() {
  if (shuffle && playedHistory.length > 1) {
    playedHistory.pop();
    const prevIndex = playedHistory.pop();
    if (prevIndex !== undefined) playSong(prevIndex);
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
  }
}

repeatBtn.addEventListener("click", () => {
  if (repeatMode === "playlist") repeatMode = "once";
  else if (repeatMode === "once") repeatMode = "forever";
  else repeatMode = "playlist";

  repeatBtn.textContent =
    repeatMode === "playlist" ? "🔁" : repeatMode === "once" ? "🔂" : "∞";
});

shuffleBtn.addEventListener("click", () => {
  shuffle = !shuffle;
  shuffleBtn.style.background = shuffle ? "#1db95488" : "#1db954";
  if (shuffle) playedHistory = [];
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", () => {
  if (repeatMode === "once") {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === "forever") {
    nextSong();
  } else {
    if (currentIndex < songs.length - 1) nextSong();
    else {
      audio.currentTime = 0;
      audio.pause();
    }
  }
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
"""

# --- Build song list from folder ---
if not os.path.exists(SONG_DIR):
    print(f"❌ Error: Folder '{SONG_DIR}' not found.")
    exit(1)

songs = [f for f in os.listdir(SONG_DIR) if f.lower().endswith(".mp3")]
songs.sort(key=str.lower)

if not songs:
    print(f"⚠️ No .mp3 files found in '{SONG_DIR}'.")
else:
    print(f"🎵 Found {len(songs)} songs in '{SONG_DIR}'.")

# Format for JS
songs_list = ",\n".join(f'  "{s}"' for s in songs)

# Combine with template
output_js = TEMPLATE.format(count=len(songs), songs_list=songs_list)

# Write output
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(output_js)

print(f"\n✅ Wrote {OUTPUT_FILE} with {len(songs)} song(s).")
if songs:
    print("\n🎶 Songs included:")
    for s in songs:
        print(f"  - {s}")
