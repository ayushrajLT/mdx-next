const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");

let isPlaying = false;

function togglePlayPause() {
	if (isPlaying) {
		audio.pause();
		playPauseBtn.textContent = "Play";
	} else {
		audio.play();
		playPauseBtn.textContent = "Pause";
	}
	isPlaying = !isPlaying;
}

playPauseBtn.addEventListener("click", togglePlayPause);
