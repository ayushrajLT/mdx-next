import { nanoid } from "nanoid";
import React, { useEffect } from "react";

type Props = {
	src: string;
	text: string;
};

const Audio = ({ src, text }: Props) => {
	const id = nanoid();
	const playPauseBtnId = "playPauseBtn" + id;

	const logic = () => {
		const audio = document.getElementById(id) as HTMLAudioElement;
		const playPauseBtn = document.getElementById(playPauseBtnId);

		const playIcon = `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="12" cy="12.251" r="12" fill="#1E293B"/>
		<path d="M9.99365 9.10821C9.77041 8.97593 9.48804 9.13682 9.48804 9.39631V15.6627C9.48804 15.9222 9.77041 16.0831 9.99365 15.9508L15.2809 12.8176C15.4998 12.6879 15.4998 12.3711 15.2809 12.2414L9.99365 9.10821Z" fill="white" stroke="white" stroke-width="0.837209" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		`;
		const pauseIcon = `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="12" cy="12.251" r="12" fill="#1E293B"/>
		<path d="M9.48804 15.4502V9.60832C9.48804 9.42337 9.63797 9.27344 9.82292 9.27344H11.0136C11.1986 9.27344 11.3485 9.42337 11.3485 9.60832V15.4502C11.3485 15.6351 11.1986 15.7851 11.0136 15.7851H9.82292C9.63797 15.7851 9.48804 15.6351 9.48804 15.4502Z" fill="white" stroke="white" stroke-width="0.837209"/>
		<path d="M13.209 15.4502V9.60832C13.209 9.42337 13.3589 9.27344 13.5439 9.27344H14.7346C14.9195 9.27344 15.0694 9.42337 15.0694 9.60832V15.4502C15.0694 15.6351 14.9195 15.7851 14.7346 15.7851H13.5439C13.3589 15.7851 13.209 15.6351 13.209 15.4502Z" fill="white" stroke="white" stroke-width="0.837209"/>
		</svg>
		`;

		let isPlaying = false;

		function togglePlayPause() {
			if (!audio || !playPauseBtn) return;

			if (isPlaying) {
				audio.pause();
				playPauseBtn.innerHTML = playIcon;
			} else {
				audio.play();
				playPauseBtn.innerHTML = pauseIcon;
			}
			isPlaying = !isPlaying;
		}

		if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayPause);
	};

	useEffect(() => {
		logic();
	}, []);

	return (
		<>
			<audio
				style={{ width: 0, height: 0, opacity: 0, position: "absolute" }}
				controls
				controlsList="nodownload noplaybackrate"
				id={id}
			>
				<source src={src} />
			</audio>
			<div
				style={{
					width: "100%",
					padding: 16,
					borderRadius: "0.5em",
					border: "1px solid #E2E8F0",
					display: "flex",
					marginBottom: "1em",
					gap: 16,
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<span>{text}</span>
				<button id={playPauseBtnId} style={{ height: 32, width: 32 }}>
					<svg
						width="24"
						height="25"
						viewBox="0 0 24 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="12" cy="12.251" r="12" fill="#1E293B" />
						<path
							d="M9.99365 9.10821C9.77041 8.97593 9.48804 9.13682 9.48804 9.39631V15.6627C9.48804 15.9222 9.77041 16.0831 9.99365 15.9508L15.2809 12.8176C15.4998 12.6879 15.4998 12.3711 15.2809 12.2414L9.99365 9.10821Z"
							fill="white"
							stroke="white"
							stroke-width="0.837209"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>

			<script
				dangerouslySetInnerHTML={{
					__html: `
						const audio = document.getElementById("${id}");
						const playPauseBtn = document.getElementById(${playPauseBtnId});
				
						const playIcon = <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12" cy="12.251" r="12" fill="#1E293B"/>
						<path d="M9.99365 9.10821C9.77041 8.97593 9.48804 9.13682 9.48804 9.39631V15.6627C9.48804 15.9222 9.77041 16.0831 9.99365 15.9508L15.2809 12.8176C15.4998 12.6879 15.4998 12.3711 15.2809 12.2414L9.99365 9.10821Z" fill="white" stroke="white" stroke-width="0.837209" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>;

						const pauseIcon = <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12" cy="12.251" r="12" fill="#1E293B"/>
						<path d="M9.48804 15.4502V9.60832C9.48804 9.42337 9.63797 9.27344 9.82292 9.27344H11.0136C11.1986 9.27344 11.3485 9.42337 11.3485 9.60832V15.4502C11.3485 15.6351 11.1986 15.7851 11.0136 15.7851H9.82292C9.63797 15.7851 9.48804 15.6351 9.48804 15.4502Z" fill="white" stroke="white" stroke-width="0.837209"/>
						<path d="M13.209 15.4502V9.60832C13.209 9.42337 13.3589 9.27344 13.5439 9.27344H14.7346C14.9195 9.27344 15.0694 9.42337 15.0694 9.60832V15.4502C15.0694 15.6351 14.9195 15.7851 14.7346 15.7851H13.5439C13.3589 15.7851 13.209 15.6351 13.209 15.4502Z" fill="white" stroke="white" stroke-width="0.837209"/>
						</svg>;
						let isPlaying = false;
				
						function togglePlayPause() {
							if (!audio || !playPauseBtn) return;
				
							if (isPlaying) {
								audio.pause();
								playPauseBtn.innerHTML = playIcon;
							} else {
								audio.play();
								playPauseBtn.innerHTML = pauseIcon;
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
