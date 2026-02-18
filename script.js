// Auto-generated file — 76 total song(s)
const songs = [
  "Cake By The Ocean.mp3",
  "Can I Be Him.mp3",
  "Can't Hold Us (feat. Ray Dalton).mp3",
  "Centuries.mp3",
  "Cheap Thrills (feat. Sean Paul).mp3",
  "Clarity.mp3",
  "Closer.mp3",
  "Cold (feat. Future).mp3",
  "Counting Stars.mp3",
  "Dance, Dance.mp3",
  "Dark Horse.mp3",
  "Die Young.mp3",
  "DJ Got Us Fallin' In Love (feat. Pitbull).mp3",
  "Don't Wanna Know.mp3",
  "Drowning (feat. Kodak Black).mp3",
  "Faded.mp3",
  "Gasoline.mp3",
  "Get Lucky (Radio Edit) [feat. Pharrell Williams and Nile Rodgers].mp3",
  "Gimme More.mp3",
  "Glad You Came.mp3",
  "God's Plan.mp3",
  "Happier.mp3",
  "Havana (feat. Young Thug).mp3",
  "Heathens.mp3",
  "Here.mp3",
  "Hey Brother.mp3",
  "Him & I (with Halsey).mp3",
  "Hotline Bling.mp3",
  "i hate u, i love u (feat. olivia o'brien).mp3",
  "I Knew You Were Trouble..mp3",
  "I Know What You Did Last Summer.mp3",
  "I Like Me Better.mp3",
  "I Need Your Love (feat. Ellie Goulding).mp3",
  "I Took A Pill In Ibiza - Seeb Remix.mp3",
  "Let Me Love You.mp3",
  "Look What You Made Me Do.mp3",
  "Love Yourself.mp3",
  "Me And My Broken Heart.mp3",
  "Monody - Radio Edit.mp3",
  "My House.mp3",
  "My Songs Know What You Did In The Dark (Light Em Up).mp3",
  "Natural.mp3",
  "NO.mp3",
  "On The Floor.mp3",
  "One Call Away.mp3",
  "One Last Time.mp3",
  "Pacify Her.mp3",
  "Pity Party.mp3",
  "Pompeii (But If You Close Your Eyes).mp3",
  "Pon de Replay.mp3",
  "Really Don't Care.mp3",
  "Rolex.mp3",
  "Say You Won't Let Go.mp3",
  "Scars To Your Beautiful.mp3",
  "Shape of You.mp3",
  "Shut Up And Drive.mp3",
  "Side To Side.mp3",
  "Something Just Like This.mp3",
  "Sorry.mp3",
  "Stay.mp3",
  "Stitches.mp3",
  "Stressed Out.mp3",
  "Teenage Dream.mp3",
  "That's What I Like.mp3",
  "The Middle.mp3",
  "The Phoenix.mp3",
  "There's Nothing Holdin' Me Back - Acoustic.mp3",
  "Thnks fr th Mmrs.mp3",
  "TiK ToK.mp3",
  "Victorious.mp3",
  "Wake Me Up.mp3",
  "We Don't Talk Anymore (feat. Selena Gomez) - DROELOE Remix.mp3",
  "Where Are Ü Now (with Justin Bieber).mp3",
  "Without Me.mp3",
  "Work from Home (feat. Ty Dolla $ign).mp3",
  "Wrecking Ball.mp3",
  "Yung Gravy, bbno$, Rich Brian - Cest La Vie (Official Lyric Video).mp3"
];

const songList = document.getElementById("song-list");
const audio = document.getElementById("audio");
const currentSong = document.getElementById("current-song");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const volumePercent = document.getElementById("volume-percent");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const playPauseBtn = document.getElementById("play-pause-btn");

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

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function playSong(index) {
  currentIndex = index;
  const filename = songs[index];
  const encoded = encodeURIComponent(filename);
  audio.src = `songs/${encoded}`;
  audio.play();
  currentSong.textContent = filename.replace(".mp3", "");
  if (shuffle) playedHistory.push(index);
}

function updateTimeDisplay() {
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration || 0);
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
  if (repeatMode === "playlist") {
    repeatMode = "once";
    repeatBtn.textContent = "Loop: Once";
  } else if (repeatMode === "once") {
    repeatMode = "forever";
    repeatBtn.textContent = "Loop: Infinite";
  } else {
    repeatMode = "playlist";
    repeatBtn.textContent = "Loop: Playlist";
  }
});

shuffleBtn.addEventListener("click", () => {
  shuffle = !shuffle;
  shuffleBtn.textContent = shuffle ? "Shuffle: On" : "Shuffle: Off";
  shuffleBtn.classList.toggle("active", shuffle);
  if (shuffle) playedHistory = [];
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
    updateTimeDisplay();
  }
});

audio.addEventListener("loadedmetadata", () => {
  updateTimeDisplay();
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
    updateTimeDisplay();
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
  volumePercent.textContent = `${volume.value}%`;
});

// Set initial volume
audio.volume = volume.value / 100;

audio.addEventListener("ended", () => {
  if (repeatMode === "once") {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === "forever") {
    audio.currentTime = 0;
    audio.play();
  } else {
    if (currentIndex < songs.length - 1) nextSong();
    else {
      audio.currentTime = 0;
      audio.pause();
      playPauseBtn.textContent = "Play";
    }
  }
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    if (audio.src === "") {
      // If no song is loaded, play the first one
      if (songs.length > 0) playSong(0);
    } else {
      audio.play();
    }
  } else {
    audio.pause();
  }
});

// Update button when audio pauses/plays
audio.addEventListener("play", () => {
  playPauseBtn.textContent = "Pause";
});

audio.addEventListener("pause", () => {
  playPauseBtn.textContent = "Play";
});
