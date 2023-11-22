import React from "react";

const Audio = (props: any) => {
	return (
		<audio controls controlsList="nodownload noplaybackrate">
			<source src={props.src} />
		</audio>
	);
};

export default Audio;
