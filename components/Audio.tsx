import React, { useEffect } from "react";

const Audio = (props: any) => {
  const id = "audioPlayer-1";

  const logic = () => {
    const audio = document.getElementById(id) as HTMLAudioElement;
    const playPauseBtn = document.getElementById("playPauseBtn");

    let isPlaying = false;

    function togglePlayPause() {
      if (!audio || !playPauseBtn) return;

      if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = "Play";
      } else {
        audio.play();
        playPauseBtn.textContent = "Pause";
      }
      isPlaying = !isPlaying;
    }

    if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayPause);
  };

	useEffect(() => {
		logic()
	}, [])
  
	return (
    <>
      <audio controls controlsList="nodownload noplaybackrate" id={id}>
        <source src={props.src} />
      </audio>
      <button
        id="playPauseBtn"
      >
        Play/Pause
      </button>
      <script
        dangerouslySetInnerHTML={{
          __html: `
						const audio = document.getElementById("${id}");
						const playPauseBtn = document.getElementById("playPauseBtn");
				
						let isPlaying = false;
				
						function togglePlayPause() {
							if (!audio || !playPauseBtn) return;
				
							if (isPlaying) {
								audio.pause();
								playPauseBtn.textContent = "Play";
							} else {
								audio.play();
								playPauseBtn.textContent = "Pause";
							}
							isPlaying = !isPlaying;
						}
				
						if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayPause);
					`,
        }}
      />
    </>
  );
};

export default Audio;
