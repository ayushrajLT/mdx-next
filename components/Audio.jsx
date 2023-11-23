import React, { useRef } from "react";

function AudioPlayer(props) {
	return (
		<div>
			<audio id="audioPlayer" controls controlsList="nodownload noplaybackrate">
				<source src={props.src} />
			</audio>
			<button id="playPauseBtn">Play/Pause</button>
			<script
				dangerouslySetInnerHTML={{
					__html: `const audio = document.getElementById("audioPlayer");
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
playPauseBtn.addEventListener("click", togglePlayPause);`,
				}}
			/>
		</div>
	);
}

export default AudioPlayer;
